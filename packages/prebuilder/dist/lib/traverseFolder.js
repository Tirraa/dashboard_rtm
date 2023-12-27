"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/vitest-dev/vitest/discussions/2484
const path = require('path');
const fs = require('fs');
function traverseFolder(rootFolder) {
    const filesCollection = [];
    function traverse(currentFolder, currentDeepPath = currentFolder) {
        const currentFolderFiles = fs.readdirSync(currentFolder);
        for (const currentFilename of currentFolderFiles) {
            const filepath = path.join(currentFolder, currentFilename);
            const stat = fs.statSync(filepath);
            if (stat.isDirectory()) {
                traverse(filepath, path.join(currentDeepPath, currentFilename));
                continue;
            }
            const filename = path.basename(currentFilename, path.extname(currentFilename));
            const fileDirectory = currentDeepPath;
            filesCollection.push({ fileDirectory, filename });
        }
    }
    traverse(rootFolder);
    return filesCollection;
}
exports.default = traverseFolder;
