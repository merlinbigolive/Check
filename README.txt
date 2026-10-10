VEHIKAL.COM VISITOR TRACKER — SETUP

Files:
- admin.html: password-protected dashboard (Supabase Auth email/password)
- visitor-config.js: add your Supabase project URL and publishable/anon key
- visitor-tracker.js: add this script to Vehikal.com's public page to log visits
- supabase-setup.sql: database table, security policies, and secure reset function

IMPORTANT SECURITY NOTES
1. This uses Supabase Auth, not a password embedded in the webpage.
2. Create an admin user in Supabase Dashboard > Authentication > Users.
3. Never put a service_role/secret key in these files.
4. Before enabling the tracker, review the SQL and run it in the correct Supabase project.
5. The tracker uses approximate country/city fields only if you later connect a trusted geolocation source. This starter records visit time, visitor type, page, referrer, and user agent; it does not pretend to know a visitor's exact location.

SETUP
1. Open visitor-config.js and set SUPABASE_URL and SUPABASE_ANON_KEY.
2. In Supabase SQL Editor, run supabase-setup.sql.
3. In Supabase Authentication, create your admin email/password.
4. Upload admin.html, visitor-config.js and visitor-tracker.js to the same public site directory.
5. Add this before </body> on Vehikal.com's public page:
   <script src="/visitor-config.js"></script>
   <script src="/visitor-tracker.js"></script>
6. Visit https://vehikal.com/admin.html and sign in with the Supabase admin user.

If your existing visitor_logs table has a different schema or policies, reconcile the SQL before running it; don't blindly replace existing production data.
