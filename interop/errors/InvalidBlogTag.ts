import damerauLevenshtein from '../lib/misc/damerauLevenshtein';
import { blogTagOptions } from '../lib/builders/unifiedImport';

const DAMERAU_LEVENSHTEIN_THRESHOLD = 4;
const TAB_SIZE = 2;

const tabulation = ' '.repeat(TAB_SIZE);
const doesNotExist = "doesn't exist";
const doNotExist = "don't exist";
const didYouMean = 'did you mean';
const noSuggestionFound = 'No suggestion found';

// {ToDo} Write tests

type ScoresMap = Record<string, Record<string, number>>;

function onlyBestScoresMap(scoresMap: ScoresMap): ScoresMap {
  const res: ScoresMap = {};

  for (const [key, values] of Object.entries(scoresMap)) {
    const bestScore = Math.min(...Object.values(values));
    const tagsWithBestScore = Object.keys(values).filter((tag) => values[tag] === bestScore);
    res[key] = {};

    for (const tag of tagsWithBestScore) res[key][tag] = bestScore;
  }

  return res;
}

function mergeScoresMaps(scoresMap1: ScoresMap, scoresMap2: ScoresMap): ScoresMap {
  const mergedScoresMap: ScoresMap = {};

  for (const key of Object.keys(scoresMap1)) {
    const values1 = scoresMap1[key];
    const values2 = scoresMap2[key];

    if (values2) {
      mergedScoresMap[key] = Object.keys(values1).length >= Object.keys(values2).length ? values1 : values2;
    } else {
      mergedScoresMap[key] = values1;
    }
  }

  for (const key of Object.keys(scoresMap2)) {
    if (!mergedScoresMap[key]) mergedScoresMap[key] = scoresMap2[key];
  }

  return mergedScoresMap;
}

function buildDamerauMap(invalidBlogTags: string[], __BLOG_TAGS_OPTIONS: readonly string[]) {
  const damerauMap = {} as ScoresMap;

  for (const invalidTag of invalidBlogTags) {
    for (const blogTag of __BLOG_TAGS_OPTIONS) {
      const score = damerauLevenshtein(invalidTag, blogTag, DAMERAU_LEVENSHTEIN_THRESHOLD);
      if (score > DAMERAU_LEVENSHTEIN_THRESHOLD) continue;

      if (!damerauMap[invalidTag]) damerauMap[invalidTag] = {};
      damerauMap[invalidTag][blogTag] = score;
    }
  }

  return damerauMap;
}

function buildStartingWithMap(invalidBlogTags: string[], __BLOG_TAGS_OPTIONS: readonly string[]) {
  const startingWithMap = {} as ScoresMap;

  for (const invalidTag of invalidBlogTags) {
    for (const blogTag of __BLOG_TAGS_OPTIONS) {
      const startsWith = blogTag.startsWith(invalidTag);
      if (!startsWith) continue;

      const score = Math.abs(blogTag.length - invalidTag.length);

      if (!startingWithMap[invalidTag]) startingWithMap[invalidTag] = {};
      startingWithMap[invalidTag][blogTag] = score;
    }
  }

  return startingWithMap;
}

function buildFeedback(scoresMap: ScoresMap): string {
  const feedbacks = [];

  for (const key of Object.keys(scoresMap)) {
    const suggestions = scoresMap[key];
    const keyDoesNotExist = tabulation + `“${key}” ${doesNotExist}`;

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (Object.keys(suggestions).length === 0) {
      feedbacks.push(keyDoesNotExist + '.');
      continue;
    }

    const sortedSuggestions = Object.entries(suggestions)
      .sort(([, score1], [, score2]) => score1 - score2)
      .map(([suggestion]) => suggestion);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (sortedSuggestions.length > 1) {
      feedbacks.push(`${keyDoesNotExist}, ${didYouMean}: “${sortedSuggestions.join('”, or “')}”?`);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      feedbacks.push(`${keyDoesNotExist}, ${didYouMean}: “${sortedSuggestions[0]}”?`);
    }
  }

  const errorMessage = feedbacks.join('\n');
  return errorMessage;
}

function buildHint(invalidBlogTags: string[], __BLOG_TAGS_OPTIONS: readonly string[]) {
  const damerauMap = onlyBestScoresMap(buildDamerauMap(invalidBlogTags, __BLOG_TAGS_OPTIONS));
  const startingWithMap = onlyBestScoresMap(buildStartingWithMap(invalidBlogTags, __BLOG_TAGS_OPTIONS));
  const scoresMap = mergeScoresMaps(damerauMap, startingWithMap);

  const invalidTagsNotInScoresMap = invalidBlogTags.filter((tag) => !(tag in scoresMap));
  let invalidTagsNotInScoresMapFeedback = '';

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (invalidTagsNotInScoresMap.length === 1) {
    invalidTagsNotInScoresMapFeedback = tabulation + `“${invalidTagsNotInScoresMap}” ${doesNotExist}. ${noSuggestionFound}.`;
  }
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  else if (invalidTagsNotInScoresMap.length > 1) {
    invalidTagsNotInScoresMapFeedback = tabulation + `[“${invalidTagsNotInScoresMap.join('”, “')}”] ${doNotExist}. ${noSuggestionFound}.`;
  }

  const scoresMapFeedback = buildFeedback(scoresMap);
  if (invalidTagsNotInScoresMapFeedback) {
    if (scoresMapFeedback) return [scoresMapFeedback, invalidTagsNotInScoresMapFeedback].join('\n');
    return invalidTagsNotInScoresMapFeedback;
  }
  return scoresMapFeedback;
}

class InvalidBlogTag extends Error {
  constructor(invalidBlogTags: string[], __BLOG_TAGS_OPTIONS: readonly string[] = blogTagOptions) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const tag = invalidBlogTags.length === 1 ? 'tag' : 'tags';
    const message = `Invalid blog ${tag} detected!` + '\n' + buildHint(invalidBlogTags, __BLOG_TAGS_OPTIONS);
    super(message);
    this.name = 'InvalidBlogTagError';
  }
}

export default InvalidBlogTag;
