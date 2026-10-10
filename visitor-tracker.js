(function () {
  const cfg = window.VEHIKAL_VISITOR_CONFIG;
  if (!cfg || !cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY ||
      cfg.SUPABASE_URL.includes("PASTE_") || cfg.SUPABASE_ANON_KEY.includes("PASTE_")) return;
  if (location.pathname === "/admin.html" || sessionStorage.getItem("vehikal_admin_session") === "1") return;
  // Load Supabase JS only if it is not already present.
  function start() {
    if (!window.supabase || !window.supabase.createClient) return;
    const client = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    const ua = navigator.userAgent || "";
    const bot = /bot|crawler|spider|slurp|facebookexternalhit|preview/i.test(ua);
    // A per-tab session guard avoids duplicate inserts from simple reloads.
    const key = "vehikal_visit_logged_" + location.pathname;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    client.from("visitor_logs").insert({
      domain: "vehikal.com",
      visitor_type: bot ? "bot" : "human",
      page_path: location.pathname + location.search,
      referrer: document.referrer || null,
      user_agent: ua,
      timestamp: new Date().toISOString()
    }).then(function (result) {
      if (result.error) console.warn("Visitor tracking could not be saved.");
    }).catch(function () {});
  }
  if (window.supabase && window.supabase.createClient) start();
  else {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    s.onload = start;
    s.onerror = function () {};
    document.head.appendChild(s);
  }
})();
