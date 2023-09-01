import { getBlogSubCategoriesByCategory } from '@/app/proxies/blog';
import BlogPost from '@/components/blog/BlogPost';
import { languages } from '@/i18n/settings';
import { getAllCategories, getAllPostsByCategoryAndSubCategory, getBlogCategoryFromPathname, getBlogPostSlug, getPost } from '@/lib/blog';
import { getPathnameWithoutI18nPart } from '@/lib/i18n';
import getServerSidePathnameWorkaround from '@/lib/misc/getServerSidePathname';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogCategory, BlogPostPageProps, BlogStaticParams, BlogSubCategory } from '@/types/Blog';
import { notFound } from 'next/navigation';

export function generateMetadata({ params }: BlogPostPageProps) {
  const category: BlogCategory = getBlogCategoryFromPathname(getPathnameWithoutI18nPart(getServerSidePathnameWorkaround())) as BlogCategory;
  const subCategory = params[BlogTaxonomy.subCategory] as BlogSubCategory<typeof category>;
  const slug = params[BlogTaxonomy.slug];
  const lang = params[i18nTaxonomy.langFlag];
  const post = getPost({ category, subCategory }, slug, lang);
  if (!post) notFound();

  return { title: post.title, description: post.metadescription };
}

export async function generateStaticParams() {
  function generateBlogStaticParams(): BlogStaticParams[] {
    const existingParams = new Set<string>();
    const blogStaticParams: Partial<BlogStaticParams>[] = [];
    const blogCategories = getAllCategories();

    blogCategories.forEach((categ) => {
      const category = categ as BlogCategory;
      const curSubCategs = getBlogSubCategoriesByCategory(categ);

      curSubCategs.forEach((subCateg) => {
        const subCategory = subCateg as BlogSubCategory<typeof category>;
        const relatedPosts = getAllPostsByCategoryAndSubCategory({ category, subCategory });

        relatedPosts.forEach((post) => {
          const slug = getBlogPostSlug(post);
          const staticParamsKey = `${categ}-${subCategory}-${slug}`;

          if (existingParams.has(staticParamsKey)) return;

          existingParams.add(staticParamsKey);
          const entity: BlogStaticParams = {
            [BlogTaxonomy.category]: category,
            [BlogTaxonomy.subCategory]: subCategory,
            [BlogTaxonomy.slug]: slug
          };
          blogStaticParams.push(entity);
        });
      });
    });
    return blogStaticParams as BlogStaticParams[];
  }

  const blogStaticParamsEntities = generateBlogStaticParams();
  const staticParams = languages.flatMap((locale) =>
    blogStaticParamsEntities.map((entity) => ({
      [i18nTaxonomy.langFlag]: locale,
      ...entity
    }))
  );

  return staticParams;
}

export default function Page({ params }: BlogPostPageProps) {
  return <BlogPost {...{ params }} />;
}
