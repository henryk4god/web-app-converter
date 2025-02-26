import { serve } from "https://deno.land/std@0.218.2/http/server.ts";
import { generateAPK } from "./generate_apk.ts";

console.log("✅ Server is running...");

// 🌍 Global CORS Headers
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

serve(async (req) => {
    const url = new URL(req.url, "http://localhost");
    const { pathname } = url;

    // ✅ Handle OPTIONS Preflight Request
    if (req.method === "OPTIONS") {
        console.log("✅ Handling OPTIONS request");
        return new Response(null, { status: 204, headers: corsHeaders });
    }

    // ✅ Homepage Route
    if (req.method === "GET" && pathname === "/") {
        return new Response("<h1>Web App Converter API</h1>", {
            headers: { "Content-Type": "text/html", ...corsHeaders },
        });
    }

    // ✅ Convert Route (POST /convert)
    if (req.method === "POST" && pathname === "/convert") {
        try {
            const body = await req.json();
            if (!body.url) {
                return new Response(JSON.stringify({ error: "URL is required" }), {
                    status: 400,
                    headers: { "Content-Type": "application/json", ...corsHeaders },
                });
            }

            console.log(`🔄 Generating APK for: ${body.url}`);
            const apkPath = await generateAPK(body.url);

            return new Response(
                JSON.stringify({ message: "✅ APK Generated", path: apkPath }),
                { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
            );
        } catch (error) {
            console.error("❌ Server Error:", error);
            return new Response(
                JSON.stringify({ error: "Internal Server Error", details: error.message }),
                { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
            );
        }
    }

    // ❌ Handle 404 - Route Not Found
    return new Response(JSON.stringify({ error: "Route Not Found" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders },
    });
});
