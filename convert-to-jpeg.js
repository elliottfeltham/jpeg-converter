const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Input and output folder paths
const inputFolder = './input-images';
const outputFolder = './output-images';

if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
}

// Function to optimize images and convert to JPEG
const convertToJpeg = async () => {
    try {
        const files = fs.readdirSync(inputFolder);

        for (const file of files) {
            const inputFilePath = path.join(inputFolder, file);
            const outputFilePath = path.join(outputFolder, `${path.parse(file).name}.jpeg`);

            // Process image files (including HEIC and HEIF)
            await sharp(inputFilePath)
                .resize({ width: 1920, withoutEnlargement: true }) // Resize to max width of 1920px
                .jpeg({
                    quality: 80, // Adjust quality (1-100)
                    progressive: true, // Enable progressive JPEG
                    mozjpeg: true // Use MozJPEG for better compression (if supported)
                })
                .toFile(outputFilePath);

            console.log(`Optimized and converted: ${file} -> ${outputFilePath}`);
        }

        console.log('All images have been optimized and converted to JPEG format.');
    } catch (error) {
        console.error('Error during conversion:', error);
    }
};

// Run the converter
convertToJpeg();
