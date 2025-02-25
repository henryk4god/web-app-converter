import { serve } from "https://deno.land/std@0.218.2/http/server.ts";
import { generateAPK } from "./generate_apk.ts";

console.log("✅ Server is running...");

serve(async (req) => {
    const url = new URL(req.url, "http://localhost");
    const { pathname } = url;

    // Handle favicon request to prevent "Route Not Found" errors
    if (req.method === "GET" && pathname === "/favicon.ico") {
        return new Response(null, { status: 204 }); // No Content
    }

    // Default homepage route (GET /)
    if (req.method === "GET" && pathname === "/") {
        return new Response(
            `<html>
                <head>
                    <title>Web App Converter</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
                        h1 { color: #007BFF; }
                    </style>
                </head>
                <body>
                    <h1>Welcome to Web App Converter</h1>
                    <p>Use the API by sending a POST request to <strong>/convert</strong> with a JSON body.</p>
                </body>
            </html>`,
            { headers: { "Content-Type": "text/html" } }
        );
    }

    // Convert Route (POST /convert)
    if (req.method === "POST" && pathname === "/convert") {
        try {
            const body = await req.json();
            if (!body.url) {
                return new Response("❌ Invalid request: URL is required", { status: 400 });
            }

            console.log(`🔄 Generating APK for: ${body.url}`);
            const apkPath = await generateAPK(body.url);
            return new Response(
                JSON.stringify({ message: "✅ APK Generated", path: apkPath }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        } catch (error) {
            console.error("❌ Server Error:", error);
            return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
        }
    }

    // Handle unknown routes
    console.log(`🚨 Route Not Found: ${req.method} ${pathname}`);
    return new Response("❌ Not Found", { status: 404 });
});
