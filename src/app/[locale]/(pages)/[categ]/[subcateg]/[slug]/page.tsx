import { getBlogSubcategoriesByCategory } from '@/cache/blog';
import BlogPost from '@/components/pages/blog/BlogPost';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import BlogPostCrumb from '@/components/ui/breadcrumbs/custom/BlogPostCrumb';
import { LANGUAGES, i18ns } from '@/config/i18n';
import ROUTES_ROOTS from '@/config/routes';
import { getServerSideI18n } from '@/i18n/server';
import {
  getAllBlogCategories,
  getAllBlogPostsByCategoryAndSubcategoryUnstrict,
  getBlogPostSlug,
  getBlogPostUnstrict,
  isValidBlogCategory,
  isValidBlogCategoryAndSubcategoryPair,
  redirectToBlogCategoryAndSubcategoryPairPageUnstrict,
  redirectToBlogCategoryPage
} from '@/lib/blog';
import { getPageTitle } from '@/lib/str';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import type { BlogCategory, BlogPostPageProps, BlogStaticParams, BlogSubcategoryFromUnknownCategory, PostBase } from '@/types/Blog';
import { setStaticParamsLocale } from 'next-international/server';
import { redirect } from 'next/navigation';

// {ToDo} Move this logic in the layout?
export async function generateMetadata({ params }: BlogPostPageProps) {
  const category = params[BlogTaxonomy.CATEGORY];
  const subcategory = params[BlogTaxonomy.SUBCATEGORY];
  const validCombination = isValidBlogCategoryAndSubcategoryPair(category, subcategory);

  const slug = params[BlogTaxonomy.SLUG];
  const lang = params[i18nTaxonomy.LANG_FLAG];
  const post = validCombination ? getBlogPostUnstrict({ category, subcategory }, slug, lang) : undefined;
  if (!post && validCombination) {
    redirectToBlogCategoryAndSubcategoryPairPageUnstrict(category, subcategory);
  } else if (!post && isValidBlogCategory(category)) {
    redirectToBlogCategoryPage(category);
  } else if (!post) {
    redirect(ROUTES_ROOTS.WEBSITE + category);
  }

  const globalT = await getServerSideI18n();
  const currentPost = post as PostBase;
  const title = getPageTitle(globalT(`${i18ns.vocab}.brand-short`), currentPost.title);
  const { metadescription: description } = post as PostBase;
  return { title, description };
}

// {ToDo} Move this logic in the top-level page, using the `allDocuments` generated variable, (loaded on server-side only!)
export async function generateStaticParams() {
  function generateBlogStaticParams(): BlogStaticParams[] {
    const indexedParams = new Set<string>();
    const blogStaticParams: BlogStaticParams[] = [];
    const blogCategories = getAllBlogCategories();

    blogCategories.forEach((categ) => {
      const category = categ as BlogCategory;
      const curSubcategs = getBlogSubcategoriesByCategory(category);

      curSubcategs.forEach((subcateg) => {
        const subcategory = subcateg as BlogSubcategoryFromUnknownCategory;
        const relatedPosts = getAllBlogPostsByCategoryAndSubcategoryUnstrict({ category, subcategory });

        relatedPosts.forEach((post) => {
          LANGUAGES.forEach((language) => {
            const slug = getBlogPostSlug(post);

            const blogPostExists = getBlogPostUnstrict({ category, subcategory }, slug, language);
            if (!blogPostExists) return;

            const staticParamsIndexKey = `${categ}-${subcategory}-${slug}-${language}`;
            if (indexedParams.has(staticParamsIndexKey)) return;

            indexedParams.add(staticParamsIndexKey);
            const entity: BlogStaticParams = {
              [i18nTaxonomy.LANG_FLAG]: language,
              [BlogTaxonomy.CATEGORY]: category,
              [BlogTaxonomy.SUBCATEGORY]: subcategory,
              [BlogTaxonomy.SLUG]: slug
            };
            blogStaticParams.push(entity);
          });
        });
      });
    });
    return blogStaticParams as BlogStaticParams[];
  }

  const blogStaticParamsEntities = generateBlogStaticParams();
  const staticParams = blogStaticParamsEntities.map((entity) => ({ ...entity }));

  return staticParams;
}

export default function Page({ params }: BlogPostPageProps) {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  setStaticParamsLocale(lng);

  return (
    <div className="mx-4 flex flex-col items-center lg:mx-24">
      <Breadcrumbs
        customCrumbs={[
          {
            depth: 3,
            jsx: <BlogPostCrumb />
          }
        ]}
        className="mx-8 w-full py-4 lg:mx-auto lg:max-w-[750px]"
      />
      <BlogPost params={params} />
    </div>
  );
}
