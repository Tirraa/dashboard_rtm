/* v8 ignore start */
// Stryker disable all

import { capitalize } from 'inflection';

import {
  LOCALES_INFOS_ROOT_KEY,
  LOCALES_LNG_INFOS_KEY,
  MAX_BLOG_TAXONOMY_LEN,
  MAX_PAGE_TAXONOMY_LEN,
  MAX_LP_TAXONOMY_LEN,
  BUGTRACKER_URL,
  DOC_URL,
  FLAGS
} from '.';

const KNOWN_OPTIONS = Object.values(FLAGS).join(', ');

export const DEFAULT_LOCALE = 'en' as const satisfies Locale;

const VOCAB_TOKENS = {
  fr: {
    F_PLURAL: {
      SUBCATEGORIES: 'sous-catégories',
      NESTINGS: 'imbrications',
      CATEGORIES: 'catégories',
      INVALID: 'invalides',
      UNKNOWN: 'inconnues',
      WRONG: 'incorrectes',
      OPTIONS: 'options',
      LOCALES: 'locales'
    },
    F_SINGULAR: {
      SUBCATEGORIES: 'sous-catégorie',
      NESTINGS: 'imbrication',
      CATEGORIES: 'catégorie',
      TAXONOMY: 'taxonomie',
      INVALID: 'invalide',
      UNKNOWN: 'inconnue',
      WRONG: 'incorrecte',
      OPTIONS: 'option'
    },
    M_SINGULAR: {
      PREBUILDER: 'prebuilder',
      PREBUILD: 'prebuild',
      INVALID: 'invalide',
      SLUGS: 'slug'
    },
    M_PLURAL: {
      INVALID: 'invalides',
      SLUGS: 'slugs'
    },
    N_SINGULAR: {
      WARNING: 'warning'
    }
  },
  en: {
    N_SINGULAR: {
      SUBCATEGORIES: 'subcategory',
      PREBUILDER: 'prebuilder',
      CATEGORIES: 'category',
      TAXONOMY: 'taxonomy',
      PREBUILD: 'prebuild',
      NESTINGS: 'nesting',
      WARNING: 'warning',
      LOCALES: 'locale',
      SLUGS: 'slug'
    },
    N_PLURAL: {
      SUBCATEGORIES: 'subcategories',
      CATEGORIES: 'categories',
      NESTINGS: 'nestings',
      LOCALES: 'locales',
      SLUGS: 'slugs'
    },
    INVARIABLE: {
      INVALID: 'invalid',
      UNKNOWN: 'unknown',
      WRONG: 'wrong'
    },
    F_SINGULAR: {
      OPTIONS: 'option'
    },
    F_PLURAL: {
      OPTIONS: 'options'
    }
  }
} as const satisfies Record<Locale, VocabTokensWithGrammaticalVariants>;

export const UNKNOWN_LOCALE_FALLBACK_MSG = (unknownLocale: string) =>
  `[${capitalize(VOCAB_TOKENS[DEFAULT_LOCALE].N_SINGULAR.WARNING)}] ${capitalize(VOCAB_TOKENS[DEFAULT_LOCALE].INVARIABLE.UNKNOWN)} ${
    VOCAB_TOKENS[DEFAULT_LOCALE].N_SINGULAR.LOCALES
  }: ${unknownLocale}, falling back to ${DEFAULT_LOCALE}.` +
  '\n' +
  `(Known ${VOCAB_TOKENS[DEFAULT_LOCALE].N_PLURAL.LOCALES} are: ${LOCALES.join(', ')})` +
  '\n';

/* eslint-disable perfectionist/sort-objects */
const DEFAULT_TRANSLATION = {
  pages: 'pages',
  blog: 'blog',
  i18n: 'i18n',
  lp: 'landing pages',

  watchersReady: 'Watchers are ready!',

  pagesCodegenBenchmark: 'Generated pages related code in ~{duration}s',
  blogCodegenBenchmark: 'Generated blog related code in ~{duration}s',
  lpCodegenBenchmark: 'Generated landing pages related code in ~{duration}s',

  validatedLocalesInfosBenchmark: `Validated ${VOCAB_TOKENS.en.N_PLURAL.LOCALES} infos in ~{duration}s`,
  generatedUtilTypesBenchmark: `Generated util types in ~{duration}s`,
  validatedPagesTaxonomyBenchmark: `Validated pages ${VOCAB_TOKENS.en.N_SINGULAR.TAXONOMY} in ~{duration}s`,
  validatedBlogTaxonomyBenchmark: `Validated blog ${VOCAB_TOKENS.en.N_SINGULAR.TAXONOMY} in ~{duration}s`,
  validatedLpTaxonomyBenchmark: `Validated landing pages ${VOCAB_TOKENS.en.N_SINGULAR.TAXONOMY} in ~{duration}s`,

  totalExecutionTimeBenchmark: 'Total execution time: ~{duration}s',

  impossibleToStartThePrebuilder: `Impossible to start the ${VOCAB_TOKENS.en.N_SINGULAR.PREBUILDER}!`,
  interruptedThePrebuilder: `Interrupted the ${VOCAB_TOKENS.en.N_SINGULAR.PREBUILDER}!`,
  failedToPassThePrebuild: `Failed to pass the ${VOCAB_TOKENS.en.N_SINGULAR.PREBUILD}!`,

  disableI18nAnalysisAdvice: `If you don't use i18n in your project, use the '${FLAGS.NO_I18N}' ${VOCAB_TOKENS.en.F_SINGULAR.OPTIONS}.`,
  disablePagesAnalysisAdvice: `If you don't use pages in your project, use the '${FLAGS.NO_PAGES}' ${VOCAB_TOKENS.en.F_SINGULAR.OPTIONS}.`,
  disableBlogAnalysisAdvice: `If you don't use a blog in your project, use the '${FLAGS.NO_BLOG}' ${VOCAB_TOKENS.en.F_SINGULAR.OPTIONS}.`,
  disableLpAnalysisAdvice: `If you don't use landing pages in your project, use the '${FLAGS.NO_LP}' ${VOCAB_TOKENS.en.F_SINGULAR.OPTIONS}.`,
  disableBothI18nAndPagesAnalysisMaybeAdvice: `↳ Maybe you want to use the '${FLAGS.NO_I18N}' and '${FLAGS.NO_PAGES}' ${VOCAB_TOKENS.en.F_PLURAL.OPTIONS}?`,
  disableBothI18nAndBlogAnalysisMaybeAdvice: `↳ Maybe you want to use the '${FLAGS.NO_I18N}' and '${FLAGS.NO_BLOG}' ${VOCAB_TOKENS.en.F_PLURAL.OPTIONS}?`,
  disableBothI18nAndLpAnalysisMaybeAdvice: `↳ Maybe you want to use the '${FLAGS.NO_I18N}' and '${FLAGS.NO_LP}' ${VOCAB_TOKENS.en.F_PLURAL.OPTIONS}?`,

  pagesNamingConstraint: `Only dashes and alphanumeric characters are allowed, with the requirement that the first character MUST be a letter or a digit. Also, the maximum length allowed is: ${MAX_PAGE_TAXONOMY_LEN} characters.`,

  blogNamingConstraint: `Only dashes and alphanumeric characters are allowed, with the requirement that the first character MUST be a letter or a digit. Also, the maximum length allowed is: ${MAX_BLOG_TAXONOMY_LEN} characters.`,

  lpNamingConstraint: `Only dashes and alphanumeric characters are allowed, with the requirement that the first character MUST be a letter or a digit. Also, the maximum length allowed is: ${MAX_LP_TAXONOMY_LEN} characters.`,

  localesInfosEmptyOrMissing: `The '${LOCALES_LNG_INFOS_KEY}' field value is empty or missing in '${LOCALES_INFOS_ROOT_KEY}'! ({localeFilePath})`,
  localesInfosMismatch:
    `The '${LOCALES_INFOS_ROOT_KEY}.${LOCALES_LNG_INFOS_KEY}' field value should match the locale filename! ({localeFilePath})` +
    '\n' +
    "Expected value: ''{expectedLocaleCode}'', given value: ''{localeCode}''",

  optionsAreInvalid: `${capitalize(VOCAB_TOKENS.en.F_PLURAL.OPTIONS)} are ${VOCAB_TOKENS.en.INVARIABLE.INVALID}:`,

  invalidCategories: `{count, plural,
    =0 {__NEVER__}
    =1 {${capitalize(VOCAB_TOKENS.en.INVARIABLE.INVALID)} ${VOCAB_TOKENS.en.N_SINGULAR.CATEGORIES}:}
    other {${capitalize(VOCAB_TOKENS.en.INVARIABLE.INVALID)} ${VOCAB_TOKENS.en.N_PLURAL.CATEGORIES}:}
  }`,
  invalidSubcategories: `{count, plural,
    =0 {__NEVER__}
    =1 {${capitalize(VOCAB_TOKENS.en.INVARIABLE.INVALID)} ${VOCAB_TOKENS.en.N_SINGULAR.SUBCATEGORIES} in the ''{categoryWithDefects}'' ${
      VOCAB_TOKENS.en.N_SINGULAR.CATEGORIES
    }:}
    other {${capitalize(VOCAB_TOKENS.en.INVARIABLE.INVALID)} ${VOCAB_TOKENS.en.N_PLURAL.SUBCATEGORIES} in the ''{categoryWithDefects}'' ${
      VOCAB_TOKENS.en.N_SINGULAR.CATEGORIES
    }:}
  }`,
  invalidSlugs: `{count, plural,
    =0 {__NEVER__}
    =1 {${capitalize(VOCAB_TOKENS.en.INVARIABLE.INVALID)} ${VOCAB_TOKENS.en.N_SINGULAR.SLUGS} in the ''{folderWithDefects}'' folder:}
    other {${capitalize(VOCAB_TOKENS.en.INVARIABLE.INVALID)} ${VOCAB_TOKENS.en.N_PLURAL.SLUGS} in the ''{folderWithDefects}'' folder:}
  }`,
  invalidNestings: `{count, plural,
    =0 {__NEVER__}
    =1 {${capitalize(VOCAB_TOKENS.en.INVARIABLE.INVALID)} ${VOCAB_TOKENS.en.N_SINGULAR.NESTINGS}:}
    other {${capitalize(VOCAB_TOKENS.en.INVARIABLE.INVALID)} ${VOCAB_TOKENS.en.N_PLURAL.NESTINGS}:}
  }`,
  unknownOptions: `{count, plural,
    =0 {__NEVER__}
    =1 {• ${capitalize(VOCAB_TOKENS.en.INVARIABLE.UNKNOWN)} ${VOCAB_TOKENS.en.F_SINGULAR.OPTIONS}: {UNKNOWN_OPTIONS}\n(Known ${
      VOCAB_TOKENS.en.F_PLURAL.OPTIONS
    } are: ${KNOWN_OPTIONS})}
    other {• ${capitalize(VOCAB_TOKENS.en.INVARIABLE.UNKNOWN)} ${VOCAB_TOKENS.en.F_PLURAL.OPTIONS}: {UNKNOWN_OPTIONS}\n(Known ${
      VOCAB_TOKENS.en.F_PLURAL.OPTIONS
    } are: ${KNOWN_OPTIONS})}
  }`,

  unauthorizedToOmitOption: `• ${capitalize(VOCAB_TOKENS.en.INVARIABLE.WRONG)} ${
    VOCAB_TOKENS.en.F_SINGULAR.OPTIONS
  }: you can't omit the ''{omittedOption}'' ${VOCAB_TOKENS.en.F_SINGULAR.OPTIONS} unless you use the ''{requiredOptionToAuthorizeOmission}'' ${
    VOCAB_TOKENS.en.F_SINGULAR.OPTIONS
  }.`,

  incompatibleOption: `• ${capitalize(VOCAB_TOKENS.en.INVARIABLE.WRONG)} ${
    VOCAB_TOKENS.en.F_SINGULAR.OPTIONS
  }: you can't use the ''{incompatibleOption}'' ${VOCAB_TOKENS.en.F_SINGULAR.OPTIONS} if you use {scope} related ${
    VOCAB_TOKENS.en.F_PLURAL.OPTIONS
  }.`,

  breakingDependency: `• Breaking dependency: you can't use both the ''{incompatibleOption}'' ${VOCAB_TOKENS.en.F_SINGULAR.OPTIONS} and {scope} related ${VOCAB_TOKENS.en.F_PLURAL.OPTIONS}.`,

  cantExtractLocalesInfosContent: `Can't extract the content of the '${LOCALES_INFOS_ROOT_KEY}' i18n section!`,
  cantOpenTheI18nLocaleSchemaFile: `Can't open the i18n ${VOCAB_TOKENS.en.N_SINGULAR.LOCALES} schema file!`,
  cantOpenThePagesFolder: "Can't open the pages folder!",
  cantOpenThePostsFolder: "Can't open the posts folder!",
  cantOpenTheLpFolder: "Can't open the landing pages folder!",
  thePagesFolderIsNotDirectory: 'The pages folder you indicated is NOT a directory!',
  thePostsFolderIsNotDirectory: 'The posts folder you indicated is NOT a directory!',
  theLpFolderIsNotDirectory: 'The landing pages folder you indicated is NOT a directory!',
  theLocaleSchemaIsNotFile: 'The locale schema file you indicated is NOT a file!',

  unhandledError: 'Unhandled error!' + '\n' + '{error}' + '\n\n' + `RTFM: ${DOC_URL}` + '\n' + `Bugtracker: ${BUGTRACKER_URL}` + '\n',
  prebuildDone: `... ${capitalize(VOCAB_TOKENS.en.N_SINGULAR.PREBUILD)} done.`
} as const;
/* eslint-enable perfectionist/sort-objects */

/* eslint-disable perfectionist/sort-objects */
const translations = {
  fr: {
    pages: 'pages',
    blog: 'blog',
    i18n: 'i18n',
    lp: 'landing pages',

    watchersReady: 'Mise sur écoute effectuée !',

    pagesCodegenBenchmark: 'Code relatif aux pages généré en ~{duration}s',
    blogCodegenBenchmark: 'Code relatif au blog généré en ~{duration}s',
    lpCodegenBenchmark: 'Code relatif aux landing pages généré en ~{duration}s',

    validatedLocalesInfosBenchmark: `Validation des champs 'infos' des ${VOCAB_TOKENS.fr.F_PLURAL.LOCALES} effectuée en ~{duration}s`,
    generatedUtilTypesBenchmark: `Génération des types utilitaires effectuée en ~{duration}s`,
    validatedPagesTaxonomyBenchmark: `Validation de la ${VOCAB_TOKENS.fr.F_SINGULAR.TAXONOMY} des pages effectuée en ~{duration}s`,
    validatedBlogTaxonomyBenchmark: `Validation de la ${VOCAB_TOKENS.fr.F_SINGULAR.TAXONOMY} du blog effectuée en ~{duration}s`,
    validatedLpTaxonomyBenchmark: `Validation de la ${VOCAB_TOKENS.fr.F_SINGULAR.TAXONOMY} des landing pages en ~{duration}s`,

    totalExecutionTimeBenchmark: "Temps total d'exécution : ~{duration}s",

    impossibleToStartThePrebuilder: `Impossible de démarrer le ${VOCAB_TOKENS.fr.M_SINGULAR.PREBUILDER} !`,
    interruptedThePrebuilder: `Le ${VOCAB_TOKENS.fr.M_SINGULAR.PREBUILDER} a été interrompu !`,
    failedToPassThePrebuild: `Échec du ${VOCAB_TOKENS.fr.M_SINGULAR.PREBUILD} !`,

    disableI18nAnalysisAdvice: `Si vous n'utilisez pas l'i18n dans votre projet, utilisez l'${VOCAB_TOKENS.fr.F_SINGULAR.OPTIONS} "${FLAGS.NO_I18N}".`,
    disablePagesAnalysisAdvice: `Si vous n'utilisez pas de pages dans votre projet, utilisez l'${VOCAB_TOKENS.fr.F_SINGULAR.OPTIONS} "${FLAGS.NO_PAGES}".`,
    disableBlogAnalysisAdvice: `Si vous n'utilisez pas de blog dans votre projet, utilisez l'${VOCAB_TOKENS.fr.F_SINGULAR.OPTIONS} "${FLAGS.NO_BLOG}".`,
    disableLpAnalysisAdvice: `Si vous n'utilisez pas de landing pages dans votre projet, utilisez l'${VOCAB_TOKENS.fr.F_SINGULAR.OPTIONS} "${FLAGS.NO_LP}".`,
    disableBothI18nAndPagesAnalysisMaybeAdvice: `↳ Peut-être que vous voudriez utiliser les ${VOCAB_TOKENS.fr.F_PLURAL.OPTIONS} "${FLAGS.NO_I18N}" et "${FLAGS.NO_PAGES}" ?`,
    disableBothI18nAndBlogAnalysisMaybeAdvice: `↳ Peut-être que vous voudriez utiliser les ${VOCAB_TOKENS.fr.F_PLURAL.OPTIONS} "${FLAGS.NO_I18N}" et "${FLAGS.NO_BLOG}" ?`,
    disableBothI18nAndLpAnalysisMaybeAdvice: `↳ Peut-être que vous voudriez utiliser les ${VOCAB_TOKENS.fr.F_PLURAL.OPTIONS} "${FLAGS.NO_I18N}" et "${FLAGS.NO_LP}" ?`,

    pagesNamingConstraint: `Seuls les tirets et les caractères alphanumériques sont autorisés. De plus, le premier caractère DOIT être une lettre ou un chiffre. Enfin, la longueur maximale autorisée est de ${MAX_PAGE_TAXONOMY_LEN} caractères.`,

    blogNamingConstraint: `Seuls les tirets et les caractères alphanumériques sont autorisés. De plus, le premier caractère DOIT être une lettre ou un chiffre. Enfin, la longueur maximale autorisée est de ${MAX_BLOG_TAXONOMY_LEN} caractères.`,

    lpNamingConstraint: `Seuls les tirets et les caractères alphanumériques sont autorisés. De plus, le premier caractère DOIT être une lettre ou un chiffre. Enfin, la longueur maximale autorisée est de ${MAX_LP_TAXONOMY_LEN} caractères.`,

    localesInfosEmptyOrMissing: `La valeur du champ "${LOCALES_LNG_INFOS_KEY}" est vide ou manquante dans "${LOCALES_INFOS_ROOT_KEY}" ! ({localeFilePath})`,
    localesInfosMismatch:
      `La valeur du champ "${LOCALES_INFOS_ROOT_KEY}.${LOCALES_LNG_INFOS_KEY}" doit correspondre au nom de fichier de la locale ! ({localeFilePath})` +
      '\n' +
      `Valeur attendue : "{expectedLocaleCode}", valeur déduite : "{localeCode}"`,

    optionsAreInvalid: `Les ${VOCAB_TOKENS.fr.F_PLURAL.OPTIONS} sont ${VOCAB_TOKENS.fr.F_PLURAL.INVALID} :`,

    invalidCategories: `{count, plural,
      =0 {__NEVER__}
      =1 {${capitalize(VOCAB_TOKENS.fr.F_SINGULAR.CATEGORIES)} ${VOCAB_TOKENS.fr.F_SINGULAR.INVALID} : }
      other {${capitalize(VOCAB_TOKENS.fr.F_PLURAL.CATEGORIES)} ${VOCAB_TOKENS.fr.F_PLURAL.INVALID} : }
    }`,
    invalidSubcategories: `{count, plural,
      =0 {__NEVER__}
      =1 {${capitalize(VOCAB_TOKENS.fr.F_SINGULAR.SUBCATEGORIES)} ${VOCAB_TOKENS.fr.F_SINGULAR.INVALID} dans la ${
        VOCAB_TOKENS.fr.F_SINGULAR.CATEGORIES
      } "{categoryWithDefects}" :}
      other {${capitalize(VOCAB_TOKENS.fr.F_PLURAL.SUBCATEGORIES)} ${VOCAB_TOKENS.fr.F_PLURAL.INVALID} dans la ${
        VOCAB_TOKENS.fr.F_SINGULAR.CATEGORIES
      } "{categoryWithDefects}" :}
    }`,
    invalidSlugs: `{count, plural,
      =0 {__NEVER__}
      =1 {${capitalize(VOCAB_TOKENS.fr.M_SINGULAR.SLUGS)} ${VOCAB_TOKENS.fr.M_SINGULAR.INVALID} dans le dossier "{folderWithDefects}" :}
      other {${capitalize(VOCAB_TOKENS.fr.M_PLURAL.SLUGS)} ${VOCAB_TOKENS.fr.M_PLURAL.INVALID} dans le dossier "{folderWithDefects}" :}
    }`,
    invalidNestings: `{count, plural,
    =0 {__NEVER__}
    =1 {${capitalize(VOCAB_TOKENS.fr.F_SINGULAR.NESTINGS)} ${VOCAB_TOKENS.fr.F_SINGULAR.INVALID} :}
    other {${capitalize(VOCAB_TOKENS.fr.F_PLURAL.NESTINGS)} ${VOCAB_TOKENS.fr.F_PLURAL.INVALID} :}
  }`,
    unknownOptions: `{count, plural,
      =0 {__NEVER__}
      =1 {• ${capitalize(VOCAB_TOKENS.fr.F_SINGULAR.OPTIONS)} ${VOCAB_TOKENS.fr.F_SINGULAR.UNKNOWN} : {UNKNOWN_OPTIONS}\n(Les ${
        VOCAB_TOKENS.fr.F_PLURAL.OPTIONS
      } valides sont : ${KNOWN_OPTIONS})}
      other {• ${capitalize(VOCAB_TOKENS.fr.F_PLURAL.OPTIONS)} ${VOCAB_TOKENS.fr.F_PLURAL.UNKNOWN} : {UNKNOWN_OPTIONS}\n(Les ${
        VOCAB_TOKENS.fr.F_PLURAL.OPTIONS
      } valides sont : ${KNOWN_OPTIONS})}
    }`,

    unauthorizedToOmitOption: `• ${capitalize(VOCAB_TOKENS.fr.F_SINGULAR.OPTIONS)} ${
      VOCAB_TOKENS.fr.F_SINGULAR.WRONG
    } : vous ne pouvez pas omettre l'${VOCAB_TOKENS.fr.F_SINGULAR.OPTIONS} "{omittedOption}" à moins que vous n'utilisiez l'${
      VOCAB_TOKENS.fr.F_SINGULAR.OPTIONS
    } "{requiredOptionToAuthorizeOmission}".`,

    incompatibleOption: `• ${capitalize(VOCAB_TOKENS.fr.F_SINGULAR.OPTIONS)} ${VOCAB_TOKENS.fr.F_SINGULAR.WRONG} : vous ne pouvez pas utiliser l'${
      VOCAB_TOKENS.fr.F_SINGULAR.OPTIONS
    } "{incompatibleOption}" si vous utilisez des ${VOCAB_TOKENS.fr.F_PLURAL.OPTIONS} de la feature suivante : {scope}.`,

    breakingDependency: `• Rupture de dépendances : vous ne pouvez pas utiliser à la fois l'${VOCAB_TOKENS.fr.F_SINGULAR.OPTIONS} "{incompatibleOption}" et des ${VOCAB_TOKENS.fr.F_PLURAL.OPTIONS} de la feature suivante : {scope}.`,

    cantExtractLocalesInfosContent: `Impossible d'extraire le contenu de la section i18n "${LOCALES_INFOS_ROOT_KEY}" !`,
    cantOpenTheI18nLocaleSchemaFile: `Impossible d'ouvrir le fichier contenant le schéma des ${VOCAB_TOKENS.fr.F_PLURAL.LOCALES} !`,
    cantOpenTheLpFolder: "Impossible d'ouvrir le dossier des landing pages !",
    cantOpenThePagesFolder: "Impossible d'ouvrir le dossier des pages !",
    cantOpenThePostsFolder: "Impossible d'ouvrir le dossier des posts !",
    thePagesFolderIsNotDirectory: "Le dossier des pages que vous avez renseigné n'est PAS un dossier !",
    thePostsFolderIsNotDirectory: "Le dossier des posts que vous avez renseigné n'est PAS un dossier !",
    theLpFolderIsNotDirectory: "Le dossier des landing pages que vous avez renseigné n'est PAS un dossier !",
    theLocaleSchemaIsNotFile: `Le fichier du schéma des ${VOCAB_TOKENS.fr.F_PLURAL.LOCALES} que vous avez renseigné n'est PAS un fichier !`,

    unhandledError:
      `Erreur ${VOCAB_TOKENS.fr.F_SINGULAR.UNKNOWN} !` +
      '\n' +
      '{error}' +
      '\n\n' +
      `RTFM : ${DOC_URL}` +
      '\n' +
      `Bugtracker : ${BUGTRACKER_URL}` +
      '\n',
    prebuildDone: `... ${capitalize(VOCAB_TOKENS.fr.M_SINGULAR.PREBUILD)} terminé.`
  },
  [DEFAULT_LOCALE]: DEFAULT_TRANSLATION
} as const satisfies Record<Locale, Record<VocabKey, string>>;
/* eslint-enable perfectionist/sort-objects */

type Token = string;
type GrammaticalVariantsSumType = 'INVARIABLE' | 'F_SINGULAR' | 'M_SINGULAR' | 'N_SINGULAR' | 'F_PLURAL' | 'M_PLURAL' | 'N_PLURAL';

type VocabTokens =
  | 'SUBCATEGORIES'
  | 'PREBUILDER'
  | 'CATEGORIES'
  | 'PREBUILD'
  | 'TAXONOMY'
  | 'NESTINGS'
  | 'LOCALES'
  | 'OPTIONS'
  | 'UNKNOWN'
  | 'INVALID'
  | 'WARNING'
  | 'WRONG'
  | 'SLUGS';

export const LOCALES = ['en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];
type VocabTokensCollection = Partial<Record<VocabTokens, Token>>;
type VocabTokensWithGrammaticalVariants = Partial<Record<GrammaticalVariantsSumType, VocabTokensCollection>>;

export type VocabKey = keyof typeof DEFAULT_TRANSLATION;

export default translations;

// Stryker restore all
/* v8 ignore stop */
