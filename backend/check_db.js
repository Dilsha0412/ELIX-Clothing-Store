const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const products = await Product.find().limit(5);
    products.forEach(p => {
        console.log(`Product: ${p.name}`);
        p.images.forEach(img => console.log(`  Image URL: ${img.url}`));
    });
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
