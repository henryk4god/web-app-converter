import { exec } from "https://deno.land/x/exec/mod.ts";

export async function generateAPK(url: string): Promise<string> {
    const outputFileName = "web_app_converter.apk";
    const inputFolder = "input-folder"; // Make sure this folder exists!

    const command = `apktool b ${inputFolder} -o ${outputFileName}`;

    try {
        const { stdout, stderr } = await exec(command);
        console.log(stdout);
        if (stderr) console.error("APKTool Error:", stderr);

        console.log(`✅ APK Generated: ${outputFileName}`);
        return outputFileName;
    } catch (error) {
        console.error("❌ Error generating APK:", error);
        throw new Error("APK Generation Failed");
    }
}
