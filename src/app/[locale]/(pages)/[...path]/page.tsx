import type { PageProps } from '@/types/Page';

import { isValidLanguageFlag, INDEX_TOKEN } from '##/lib/builders/unifiedImport';
import { getPageByPathAndLanguageUnstrict } from '@/lib/pages/api';
import { setStaticParamsLocale } from 'next-international/server';
import MDX from '@/components/layouts/blog/MdxComponent';
import PageTaxonomy from '##/config/taxonomies/pages';
import { buildPageTitle } from '@rtm/shared-lib/str';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getServerSideI18n } from '@/i18n/server';
import { allPages } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { i18ns } from '##/config/i18n';

// {ToDo} Move this into its own API + test it
export async function generateMetadata({ params }: PageProps) {
  const [path, language] = [params[PageTaxonomy.PATH].join('/'), params[I18nTaxonomy.LANGUAGE]];
  const page = getPageByPathAndLanguageUnstrict(language, path);
  if (!page) notFound();

  const globalT = await getServerSideI18n();
  const { metadescription: description, title: pageTitle } = page;

  const { vocab } = i18ns;
  const title = buildPageTitle(globalT(`${vocab}.brand-short`), pageTitle);

  return { description, title };
}

// {ToDo} Move this into its own API + test it
export async function generateStaticParams() {
  const staticParams = [];

  for (const { language, path } of allPages) {
    if (path === INDEX_TOKEN) continue;
    if (!isValidLanguageFlag(language)) continue;
    const page = getPageByPathAndLanguageUnstrict(language, path);
    if (!page) continue;
    staticParams.push({ [PageTaxonomy.PATH]: page.path.split('/'), [I18nTaxonomy.LANGUAGE]: page.language });
  }
  return staticParams;
}

export default function Page({ params }: PageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  const path = params[PageTaxonomy.PATH].join('/');
  const page = getPageByPathAndLanguageUnstrict(language, path);

  if (!page) notFound();
  return (
    <main className="max-w-full">
      <MDX code={page.body.code} />
    </main>
  );
}
