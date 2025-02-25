import { serve } from "https://deno.land/std@0.218.2/http/server.ts";
import { generateAPK } from "./generate_apk.ts"; 

console.log("✅ Server is running...");

serve(async (req) => {
    const { pathname } = new URL(req.url);

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

    console.log(`🚨 Route Not Found: ${req.method} ${pathname}`);
    return new Response("❌ Not Found", { status: 404 });
});
