import { getServerSideTranslation } from '@/app/i18n';
import UniversalVocab from '@/app/i18n/locales/Universal';
import InviteBotButton from '@/components/misc/InviteBotButton';
import i18nTaxonomy from '@/taxonomies/i18n';
import { i18nPageProps } from '@/types/Next';
import Image from 'next/image';
import { CSSProperties, FunctionComponent } from 'react';

interface HomepageInnerProps extends i18nPageProps {}

// {ToDo} Please, design a real logo
const style: CSSProperties = {
  filter: 'invert(42%) sepia(7%) saturate(5518%) hue-rotate(189deg) brightness(92%) contrast(91%)'
};
const [width, height]: [number, number] = [226, 69];

export const HomepageInner: FunctionComponent<HomepageInnerProps> = async ({ params }) => {
  const lng = params[i18nTaxonomy.langFlag];
  const { t } = await getServerSideTranslation(lng);

  return (
    <div className="m-auto">
      <Image src="/assets/rtm-txt-logo.svg" {...{ style, width, height }} alt={`${UniversalVocab.brand} (${t('logo')})`} />
      <h1 className="mt-2">{UniversalVocab.brand}</h1>
      <InviteBotButton />
    </div>
  );
};

export default HomepageInner;
