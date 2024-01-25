export const TESTING_BLOG_CATEGORY_FAKE_LANGUAGES = ['drafts', 'posts'] as const;
export const TESTING_LP_FAKE_LANGUAGES = ['default_language', 'en'] as const;

export const TESTING_BLOG_FAKE_SUBCATEGORY = 'fake-subcategory' as const;

export type TBlogFakeLanguage = (typeof TESTING_BLOG_CATEGORY_FAKE_LANGUAGES)[number];
export type TLpFakeLanguage = (typeof TESTING_LP_FAKE_LANGUAGES)[number];
