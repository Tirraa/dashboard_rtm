import type { Index } from '@rtm/shared-types/Numbers';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export default function getRawDataFromBracesDeclaration(fileContent: string, startIndex: Index = 0): string | null {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (startIndex < 0) return null;

  let openBracesDepth = 0;
  let rawDataEndIndex = -1;
  let rawDataStartIndex = -1;

  for (let i = startIndex; i < fileContent.length; i++) {
    const currentChar = fileContent[i];

    if (currentChar === '{') {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (openBracesDepth === 0) rawDataStartIndex = i + 1;
      ++openBracesDepth;
    } else if (currentChar === '}') {
      --openBracesDepth;
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (openBracesDepth === 0) {
        rawDataEndIndex = i;
        break;
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (rawDataEndIndex === -1) return null;

  const extractedContent = fileContent.substring(rawDataStartIndex, rawDataEndIndex);
  return extractedContent;
}
