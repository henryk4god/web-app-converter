import { serve } from "https://deno.land/std@0.218.2/http/server.ts";
import { generateAPK } from "./generate_apk.ts";

console.log("✅ Server is running...");

serve(async (req) => {
    const url = new URL(req.url, "http://localhost");
    const { pathname } = url;

    // ✅ Handle CORS Preflight Request
    if (req.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    }

    // ✅ Handle Homepage (GET /)
    if (req.method === "GET" && pathname === "/") {
        return new Response(
            `<html><body><h1>Web App Converter API</h1></body></html>`,
            { headers: { "Content-Type": "text/html" } }
        );
    }

    // ✅ Handle APK Generation (POST /convert)
    if (req.method === "POST" && pathname === "/convert") {
        try {
            const body = await req.json();
            if (!body.url) {
                return new Response(JSON.stringify({ error: "URL is required" }), {
                    status: 400,
                    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
                });
            }

            console.log(`🔄 Generating APK for: ${body.url}`);
            const apkPath = await generateAPK(body.url);
            
            return new Response(JSON.stringify({ message: "✅ APK Generated", path: apkPath }), {
                status: 200,
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            });
        } catch (error) {
            console.error("❌ Server Error:", error);
            return new Response(
                JSON.stringify({ error: "Internal Server Error", details: error.message }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
                }
            );
        }
    }

    // ❌ Return 404 for Unknown Routes
    return new Response(JSON.stringify({ error: "Route Not Found" }), {
        status: 404,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
});
