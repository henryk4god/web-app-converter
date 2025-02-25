import { exec } from "https://deno.land/x/exec/mod.ts";

export async function generateAPK(websiteUrl: string): Promise<string> {
    const outputFileName = "web_app_converter.apk";
    const command = `apktool b input-folder -o ${outputFileName}`;

    try {
        const { status, stdout, stderr } = await exec(command);

        if (status.success) {
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
