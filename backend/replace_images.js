const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const frontendAssetsDir = path.join(__dirname, '..', 'frontend', 'src', 'assets');
const frontendPublicDir = path.join(__dirname, '..', 'frontend', 'public');

// Connect to DB
mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log("Connected to MongoDB.");

    // List all files in assets
    const files = fs.readdirSync(frontendAssetsDir);
    
    // Filter out non-product images
    const excluded = [
        'login.webp', 'register.webp', 'rabbit-hero.webp', 
        'react.svg', 'react (1).svg', 'images.jpg', 'images (1).jpg', 'featured.webp'
    ];
    
    const validImages = files.filter(f => !excluded.includes(f) && (f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.webp') || f.endsWith('.avif') || f.endsWith('.png')));
    
    console.log(`Found ${validImages.length} valid product images.`);

    // Copy to public
    for (let file of validImages) {
        fs.copyFileSync(path.join(frontendAssetsDir, file), path.join(frontendPublicDir, file));
    }
    console.log("Copied images to frontend/public.");

    // Update DB
    const products = await Product.find();
    let imgIndex = 0;
    
    for (let p of products) {
        // Assign 1 or 2 images randomly or sequentially
        const img1 = validImages[imgIndex % validImages.length];
        const img2 = validImages[(imgIndex + 1) % validImages.length];
        
        p.images = [
            { url: `/${img1}`, altText: p.name },
            { url: `/${img2}`, altText: p.name + " alternate" }
        ];
        
        await p.save();
        imgIndex += 2;
    }
    
    console.log(`Updated ${products.length} products with local images.`);
    process.exit(0);

}).catch(err => {
    console.error(err);
    process.exit(1);
});
