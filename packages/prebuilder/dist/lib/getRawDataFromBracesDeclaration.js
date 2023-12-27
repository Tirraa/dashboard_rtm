"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRawDataFromBracesDeclaration(fileContent, startIndex = 0) {
    if (startIndex < 0)
        return null;
    let openBracesDepth = 0;
    let rawDataEndIndex = -1;
    let rawDataStartIndex = -1;
    for (let i = startIndex; i < fileContent.length; i++) {
        const currentChar = fileContent[i];
        if (currentChar === '{') {
            if (openBracesDepth === 0)
                rawDataStartIndex = i + 1;
            openBracesDepth += 1;
        }
        else if (currentChar === '}') {
            openBracesDepth -= 1;
            if (openBracesDepth === 0) {
                rawDataEndIndex = i;
                break;
            }
        }
    }
    if (rawDataEndIndex === -1)
        return null;
    const extractedContent = fileContent.substring(rawDataStartIndex, rawDataEndIndex);
    return extractedContent;
}
exports.default = getRawDataFromBracesDeclaration;
