const fs = require('fs');
const path = require('path');

// Folder paths
const inputFolder = './input-images';
const outputFolder = './output-images';

// Function to delete all files in a folder
const clearFolder = (folderPath) => {
    try {
        const files = fs.readdirSync(folderPath);

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            if (fs.statSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
                console.log(`Deleted: ${filePath}`);
            }
        }

        console.log(`All files in '${folderPath}' have been deleted.`);
    } catch (error) {
        console.error(`Error clearing folder '${folderPath}':`, error.message);
    }
};

// Clear the input and output folders
clearFolder(inputFolder);
clearFolder(outputFolder);
