(function () {
  const config = window.VEHIKAL_VISITOR_CONFIG;

  if (!config || !window.supabase) {
    console.error("Vehikal tracker: Supabase config/library missing.");
    return;
  }

  const domain = location.hostname
    .replace(/^www\./i, "")
    .toLowerCase();

  if (domain !== "vehikal.com") return;

  // Ek browser tab session mein refresh par duplicate count nahi.
  const visitKey = "vehikal_visit_recorded";
  if (sessionStorage.getItem(visitKey)) return;

  const client = window.supabase.createClient(
    config.SUPABASE_URL,
    config.SUPABASE_ANON_KEY
  );

  const ua = navigator.userAgent || "";
  const isBot =
    /bot|crawler|spider|slurp|headless|facebookexternalhit/i.test(ua);

  async function recordVisit() {
    const { error } = await client.from("visitor_logs").insert({
      domain: "vehikal.com",
      visitor_type: isBot ? "bot" : "human",
      user_agent: ua.slice(0, 1000),
      referrer: document.referrer || null,
      page_path: location.pathname,
      timestamp: new Date().toISOString()
    });

    if (error) {
      console.error("Vehikal visitor recording failed:", error.message);
      return;
    }

    sessionStorage.setItem(visitKey, "1");
    console.log("Vehikal visitor recorded successfully.");
  }

  recordVisit().catch(console.error);
})();
