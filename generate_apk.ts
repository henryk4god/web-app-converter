import { Command } from "https://deno.land/x/command/mod.ts";

export async function generateAPK(websiteUrl: string): Promise<string> {
    const outputFileName = "web_app_converter.apk";
    const command = new Command()
        .args(["apktool", "b", "input-folder", "-o", outputFileName])
        .output();

    try {
        const { code, stdout, stderr } = await command.execute();
        if (code === 0) {
            console.log(`✅ APK Generated: ${outputFileName}`);
            return outputFileName;
        } else {
            console.error("❌ Error generating APK:", stderr);
            throw new Error("APK generation failed");
        }
    } catch (error) {
        console.error("❌ Error generating APK:", error);
        throw new Error("APK generation failed");
    }
}