import { Command } from "https://deno.land/x/command/mod.ts";

export async function generateAPK(websiteUrl: string): Promise<string> {
    const outputFileName = "web_app_converter.apk";
    console.log(`🔄 Starting APK generation for: ${websiteUrl}`);

    const command = new Command()
        .args(["apktool", "b", "input-folder", "-o", outputFileName])
        .output();

    try {
        const { code, stdout, stderr } = await command.execute();
        
        console.log("📜 STDOUT:", stdout);
        console.log("🚨 STDERR:", stderr);

        if (code === 0) {
            console.log(`✅ APK Generated Successfully: ${outputFileName}`);
            return outputFileName;
        } else {
            throw new Error(`❌ APK Generation Failed: ${stderr}`);
        }
    } catch (error) {
        console.error("❌ Critical Error:", error);
        throw new Error("APK generation failed");
    }
}
