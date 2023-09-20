export function getRawDataFromBracesDeclaration(fileContent: string, startIndex: number): string | null {
  if (startIndex < 0) return null;

  let openBracesDepth = 0;
  let rawDataEndIndex = -1;
  let rawDataStartIndex = -1;

  for (let i = startIndex; fileContent[i]; i++) {
    if (fileContent[i] === '{') {
      if (openBracesDepth === 0) rawDataStartIndex = i + 1;
      openBracesDepth += 1;
    } else if (fileContent[i] === '}') {
      openBracesDepth -= 1;
      if (openBracesDepth === 0) {
        rawDataEndIndex = i;
        break;
      }
    }
  }

  if (rawDataEndIndex === -1) return null;

  const extractedContent = fileContent.substring(rawDataStartIndex, rawDataEndIndex);
  return extractedContent;
}

export default getRawDataFromBracesDeclaration;
