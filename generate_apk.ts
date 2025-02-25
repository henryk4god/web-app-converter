export async function generateAPK(websiteUrl: string): Promise<string> {
    const outputFileName = "web_app_converter.apk";
    console.log(`🔄 Starting APK generation for: ${websiteUrl}`);

    const command = new Deno.Command("apktool", {
        args: ["b", "input-folder", "-o", outputFileName],
        stdout: "piped",
        stderr: "piped",
    });

    try {
        const process = command.spawn();
        const { code, stdout, stderr } = await process.output();

        const stdoutText = new TextDecoder().decode(stdout);
        const stderrText = new TextDecoder().decode(stderr);

        console.log("📜 STDOUT:", stdoutText);
        console.log("🚨 STDERR:", stderrText);

        if (code === 0) {
            console.log(`✅ APK Generated Successfully: ${outputFileName}`);
            return outputFileName;
        } else {
            throw new Error(`❌ APK Generation Failed: ${stderrText}`);
        }
    } catch (error) {
        console.error("❌ Critical Error:", error);
        throw new Error("APK generation failed");
    }
}
