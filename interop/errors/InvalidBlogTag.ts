import type { Limit, Score } from '@rtm/shared-types/Numbers';

import { EMPTY_BULLET, TAB_SIZE } from '../lib/misc/contentlayerCornerCases';
import damerauLevenshtein from '../lib/misc/damerauLevenshtein';
import { blogTagOptions } from '../lib/builders/unifiedImport';

export const DAMERAU_LEVENSHTEIN_THRESHOLD = 4;

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const tabulation = EMPTY_BULLET + ' '.repeat(TAB_SIZE - 1);
const doesNotExist = "doesn't exist";
const doNotExist = "don't exist";
const didYouMean = 'did you mean';
const noSuggestionFound = 'No suggestion found';

type Tag = string;
type InvalidTag = string;
type ValidTagSuggestion = Tag;
type ScoresMap = Record<InvalidTag, Record<ValidTagSuggestion, Score>>;

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

function mergeScoresMaps(scoresMap1: ScoresMap, scoresMap2: ScoresMap, invalidBlogTags: InvalidTag[]): ScoresMap {
  const mergedScoresMap: ScoresMap = {};

  for (const invalidTag of invalidBlogTags) {
    const values1 = scoresMap1[invalidTag];
    const values2 = scoresMap2[invalidTag];

    if (values1 !== undefined) {
      if (!mergedScoresMap[invalidTag]) mergedScoresMap[invalidTag] = {};
      Object.assign(mergedScoresMap[invalidTag], values1);
    }

    if (values2 !== undefined) {
      if (!mergedScoresMap[invalidTag]) mergedScoresMap[invalidTag] = {};
      Object.assign(mergedScoresMap[invalidTag], values2);
    }
  }

  return mergedScoresMap;
}

function buildDamerauMap(invalidBlogTags: InvalidTag[], __BLOG_TAGS_OPTIONS: readonly Tag[], __DAMERAU_THRESHOLD: Limit) {
  const damerauMap = {} as ScoresMap;

  for (const invalidTag of invalidBlogTags) {
    for (const blogTag of __BLOG_TAGS_OPTIONS) {
      const stringsLengthDiff = Math.abs(invalidTag.length - blogTag.length);
      if (stringsLengthDiff > __DAMERAU_THRESHOLD) continue;

      const score = damerauLevenshtein(invalidTag, blogTag);
      if (score > __DAMERAU_THRESHOLD) continue;

      if (!damerauMap[invalidTag]) damerauMap[invalidTag] = {};
      damerauMap[invalidTag][blogTag] = score;
    }
  }

  return damerauMap;
}

function buildStartingWithMap(invalidBlogTags: InvalidTag[], __BLOG_TAGS_OPTIONS: readonly Tag[]) {
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

function buildHint(invalidBlogTags: InvalidTag[], __BLOG_TAGS_OPTIONS: readonly Tag[], __DAMERAU_THRESHOLD: Limit) {
  const damerauMap = onlyBestScoresMap(buildDamerauMap(invalidBlogTags, __BLOG_TAGS_OPTIONS, __DAMERAU_THRESHOLD));
  const startingWithMap = buildStartingWithMap(invalidBlogTags, __BLOG_TAGS_OPTIONS);
  const scoresMap = mergeScoresMaps(damerauMap, startingWithMap, invalidBlogTags);

  const invalidTagsNotInScoresMap: InvalidTag[] = invalidBlogTags.filter((tag) => !(tag in scoresMap));
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
  constructor(
    invalidBlogTags: InvalidTag[],
    __BLOG_TAGS_OPTIONS: readonly Tag[] = blogTagOptions,
    __DAMERAU_THRESHOLD: Limit = DAMERAU_LEVENSHTEIN_THRESHOLD
  ) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const tag = invalidBlogTags.length === 1 ? 'tag' : 'tags';
    const message = `Invalid blog ${tag} detected!` + '\n' + buildHint(invalidBlogTags, __BLOG_TAGS_OPTIONS, __DAMERAU_THRESHOLD);
    super(message);
    this.name = 'InvalidBlogTagError';
  }
}

export default InvalidBlogTag;
