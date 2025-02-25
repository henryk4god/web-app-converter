import { serve } from "https://deno.land/std@0.218.2/http/server.ts";
import { generateAPK } from "./generate_apk.ts"; // Ensure this file exists

serve(async (req) => {
    if (req.method === "POST" && req.url === "/convert") {
        try {
            const { url } = await req.json();
            if (!url) return new Response("Invalid request", { status: 400 });

            // Generate APK
            const apkPath = await generateAPK(url);

            return new Response(JSON.stringify({ message: "APK Generated", path: apkPath }), { status: 200 });
        } catch (error) {
            return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
        }
    }

    return new Response("Not Found", { status: 404 }); // Default for other routes
});
