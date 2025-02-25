import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const PORT = 8000;

serve(async (req) => {
  const url = new URL(req.url);
  if (url.pathname === "/convert") {
    return new Response(
      JSON.stringify({ message: "Conversion process started..." }),
      { headers: { "Content-Type": "application/json" } },
    );
  }
  return new Response("Web App Converter API", { status: 200 });
}, { port: PORT });

console.log(`Server running on http://localhost:${PORT}`);
