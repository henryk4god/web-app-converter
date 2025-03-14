const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS
app.use(cors());

// ✅ Middleware for JSON & Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ File Upload Setup
const upload = multer({ dest: 'uploads/' });

app.post('/api/convert', upload.single('icon'), (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ message: "Invalid URL." });
    }

    // ✅ Handle the App Conversion Logic
    const filePath = req.file ? req.file.path : null;
    console.log(`Processing URL: ${url}`);
    
    // ✅ Simulate APK Generation
    setTimeout(() => {
        res.json({
            message: "Your APK is ready!",
            download_url: "https://mofoluwakeedgar.com/apkdownload"
        });
    }, 3000);
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
