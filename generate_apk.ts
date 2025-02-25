import { exec } from "https://deno.land/x/exec/mod.ts";

const outputFileName = "web_app_converter.apk";
const command = `apktool b input-folder -o ${outputFileName}`;

try {
  await exec(command);
  console.log(`APK Generated: ${outputFileName}`);
} catch (error) {
  console.error("Error generating APK:", error);
}
