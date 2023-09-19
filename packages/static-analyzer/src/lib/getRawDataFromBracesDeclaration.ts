export function getRawDataFromBracesDeclaration(fileContent: string, startIndex: number): string | null {
  if (startIndex < 0) return null;

  let openBracesDepth = 0;
  let endIndex = -1;

  for (let i = startIndex; fileContent[i]; i++) {
    if (fileContent[i] === '{') {
      if (openBracesDepth === 0) startIndex = i + 1;
      openBracesDepth += 1;
    } else if (fileContent[i] === '}') {
      openBracesDepth -= 1;
      if (openBracesDepth === 0) {
        endIndex = i;
        break;
      }
    }
  }

  if (endIndex === -1) return null;

  const extractedContent = fileContent.substring(startIndex, endIndex);
  return extractedContent;
}

export default getRawDataFromBracesDeclaration;
