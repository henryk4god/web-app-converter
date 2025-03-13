const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const url = process.argv[2];
const iconPath = process.argv[3] || "";

if (!url) {
    console.error("No URL provided");
    process.exit(1);
}

console.log("Starting APK generation...");

// Set up React Native project directory
const projectDir = path.join(__dirname, "AppBuilder");
if (!fs.existsSync(projectDir)) {
    exec(`npx react-native init AppBuilder --version 0.72.0`, (error) => {
        if (error) {
            console.error(`Error initializing React Native: ${error.message}`);
            return;
        }
        buildAPK();
    });
} else {
    buildAPK();
}

function buildAPK() {
    let mainActivityPath = path.join(projectDir, "android", "app", "src", "main", "java", "com", "appbuilder", "MainActivity.java");
    fs.writeFileSync(mainActivityPath, generateMainActivity(url));

    if (iconPath) {
        fs.copyFileSync(iconPath, path.join(projectDir, "android", "app", "src", "main", "res", "mipmap-hdpi", "ic_launcher.png"));
    }

    exec(`cd ${projectDir} && ./gradlew assembleRelease`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error building APK: ${stderr}`);
            return;
        }
        console.log("APK built successfully!");
        console.log(stdout);
    });
}

function generateMainActivity(url) {
    return `
        package com.appbuilder;

        import android.os.Bundle;
        import android.webkit.WebView;
        import android.webkit.WebViewClient;
        import androidx.appcompat.app.AppCompatActivity;

        public class MainActivity extends AppCompatActivity {
            @Override
            protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
                WebView webView = new WebView(this);
                webView.getSettings().setJavaScriptEnabled(true);
                webView.setWebViewClient(new WebViewClient());
                webView.loadUrl("${url}");
                setContentView(webView);
            }
        }
    `;
}