export const TESTING_BLOG_CATEGORY_FAKE_LANGUAGES = ['drafts', 'posts'] as const;

export const TESTING_BLOG_FAKE_SUBCATEGORY = 'fake-subcategory' as const;

export type TFakeLanguage = (typeof TESTING_BLOG_CATEGORY_FAKE_LANGUAGES)[number];
