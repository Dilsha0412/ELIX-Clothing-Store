const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const Product = require('./models/Product');

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log("Connected to MongoDB. Starting migration...");
    
    const products = await Product.find();
    let updatedCount = 0;

    for (let p of products) {
        let changed = false;
        
        for (let i = 0; i < p.images.length; i++) {
            let imgUrl = p.images[i].url;
            
            // Skip if already a cloudinary URL
            if (imgUrl.includes('res.cloudinary.com')) {
                continue;
            }

            let uploadSource = imgUrl;

            // If it's a local path
            if (imgUrl.startsWith('/products/')) {
                const localFilePath = path.join(__dirname, '..', 'frontend', 'public', imgUrl);
                if (fs.existsSync(localFilePath)) {
                    uploadSource = localFilePath;
                } else {
                    console.log(`File not found locally: ${localFilePath}`);
                    continue; // Skip if file doesn't exist
                }
            } else if (imgUrl.startsWith('/')) {
                const localFilePath = path.join(__dirname, '..', 'frontend', 'public', imgUrl);
                if (fs.existsSync(localFilePath)) {
                    uploadSource = localFilePath;
                } else {
                    console.log(`File not found locally: ${localFilePath}`);
                    continue;
                }
            }
            
            try {
                console.log(`Uploading ${uploadSource} to Cloudinary...`);
                const result = await cloudinary.uploader.upload(uploadSource, { folder: "products" });
                p.images[i].url = result.secure_url;
                changed = true;
                console.log(`Success: ${result.secure_url}`);
            } catch (err) {
                console.error(`Error uploading ${uploadSource}:`, err.message);
            }
        }
        
        if (changed) {
            await p.save();
            updatedCount++;
        }
    }

    console.log(`Migration complete! Updated ${updatedCount} products.`);
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
