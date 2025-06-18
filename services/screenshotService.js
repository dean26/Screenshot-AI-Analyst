const fs = require('fs').promises;
const path = require('path');

/**
 * Reads a directory and extracts information about screenshot sets.
 * Assumes a structure like: {date_timestamp}/{website_name}/{type}.png
 * * @param {string} rootDirPath The root path where the timestamped directories are located.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of screenshot sets.
 */
async function processScreenshotsDirectory(rootDirPath) {
    const screenshotSets = [];

    try {
        const timestampDirs = await fs.readdir(rootDirPath, { withFileTypes: true });

        for (const timestampDir of timestampDirs) {
            if (timestampDir.isDirectory()) {
                const timestampDirPath = path.join(rootDirPath, timestampDir.name);
                const websiteDirs = await fs.readdir(timestampDirPath, { withFileTypes: true });

                for (const websiteDir of websiteDirs) {
                    if (websiteDir.isDirectory()) {
                        const websiteDirPath = path.join(timestampDirPath, websiteDir.name);
                        const files = await fs.readdir(websiteDirPath);

                        const screenshotSet = {
                            timestamp: timestampDir.name,
                            website: websiteDir.name,
                            screenshots: {
                                homepage: null,
                                category: null,
                                product: null,
                            }
                        };

                        for (const file of files) {
                            const fileNameLower = file.toLowerCase();
                            if (fileNameLower.endsWith('.png')) {
                                const fullPath = path.join(websiteDirPath, file);
                                if (fileNameLower.includes('homepage.png')) {
                                    screenshotSet.screenshots.homepage = fullPath;
                                } else if (fileNameLower.includes('category.png')) {
                                    screenshotSet.screenshots.category = fullPath;
                                } else if (fileNameLower.includes('product.png')) {
                                    screenshotSet.screenshots.product = fullPath;
                                }
                            }
                        }
 
                        if (screenshotSet.screenshots.homepage || screenshotSet.screenshots.category || screenshotSet.screenshots.product) {
                            screenshotSets.push(screenshotSet);
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error(`Error processing directory ${rootDirPath}:`, error);
        throw new Error(`Failed to read screenshot directory: ${error.message}`);
    }

    return screenshotSets;
}

module.exports = {
    processScreenshotsDirectory
};