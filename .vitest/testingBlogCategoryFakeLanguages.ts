export const TESTING_BLOG_CATEGORY_FAKE_LANGUAGES = ['drafts', 'posts'] as const;
export default TESTING_BLOG_CATEGORY_FAKE_LANGUAGES;

export type TFakeLanguage = (typeof TESTING_BLOG_CATEGORY_FAKE_LANGUAGES)[number];
