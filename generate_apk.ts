export async function generateAPK(websiteUrl: string): Promise<string> {
    const outputFileName = "web_app_converter.apk";
    console.log(`🔄 Starting APK generation for: ${websiteUrl}`);

    try {
        const process = Deno.run({
            cmd: ["apktool", "b", "input-folder", "-o", outputFileName],
            stdout: "piped",
            stderr: "piped",
        });

        const { code } = await process.status();
        const rawOutput = await process.output();
        const rawError = await process.stderrOutput();

        const stdout = new TextDecoder().decode(rawOutput);
        const stderr = new TextDecoder().decode(rawError);

        console.log("📜 STDOUT:", stdout);
        console.log("🚨 STDERR:", stderr);

        process.close();

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
