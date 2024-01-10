/* v8 ignore start */
// Stryker disable all
import { capitalize } from 'inflection';

import { LOCALES_INFOS_ROOT_KEY, LOCALES_LNG_INFOS_KEY, MAX_TAXONOMY_LEN, BUGTRACKER_URL, DOC_URL, FLAGS } from '.';

const KNOWN_OPTIONS = Object.values(FLAGS).join(', ');

export const DEFAULT_LOCALE: Locale = 'en';

const VOCAB_TOKENS = {
  fr: {
    F_SINGULAR: {
      SUBCATEGORIES: 'sous-catégorie',
      CATEGORIES: 'catégorie',
      TAXONOMY: 'taxonomie',
      UNKNOWN: 'inconnue',
      WRONG: 'incorrecte',
      OPTIONS: 'option'
    },
    F_PLURAL: {
      SUBCATEGORIES: 'sous-catégories',
      CATEGORIES: 'catégories',
      UNKNOWN: 'inconnues',
      WRONG: 'incorrectes',
      OPTIONS: 'options',
      LOCALES: 'locales'
    },
    M_SINGULAR: {
      PREBUILDER: 'prebuilder',
      PREBUILD: 'prebuild',
      SLUGS: 'slug'
    },
    M_PLURAL: {
      SLUGS: 'slugs'
    }
  },
  en: {
    N_SINGULAR: {
      SUBCATEGORIES: 'subcategory',
      PREBUILDER: 'prebuilder',
      CATEGORIES: 'category',
      TAXONOMY: 'taxonomy',
      PREBUILD: 'prebuild',
      LOCALES: 'locale',
      SLUGS: 'slug'
    },
    N_PLURAL: {
      SUBCATEGORIES: 'subcategories',
      CATEGORIES: 'categories',
      LOCALES: 'locales',
      SLUGS: 'slugs'
    },
    INVARIABLE: {
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
  `[Warning] Unknown ${VOCAB_TOKENS.en.N_SINGULAR.LOCALES}: ${unknownLocale}, falling back to ${DEFAULT_LOCALE}.` +
  '\n' +
  `(Known ${VOCAB_TOKENS.en.N_PLURAL.LOCALES} are: ${LOCALES.join(', ')})` +
  '\n';

/* eslint-disable perfectionist/sort-objects */
const DEFAULT_TRANSLATION = {
  blog: 'blog',
  i18n: 'i18n',

  validatedLocalesInfosBenchmark: `Validated ${VOCAB_TOKENS.en.N_PLURAL.LOCALES} infos in ~{duration}s`,
  totalExecutionTimeBenchmark: 'Total execution time: ~{duration}s',
  validatedTaxonomyBenchmark: `Validated ${VOCAB_TOKENS.en.N_SINGULAR.TAXONOMY} in ~{duration}s`,
  codegenBenchmark: 'Generated code in ~{duration}s',

  impossibleToStartThePrebuilder: `Impossible to start the ${VOCAB_TOKENS.en.N_SINGULAR.PREBUILDER}!`,
  interruptedThePrebuilder: `Interrupted the ${VOCAB_TOKENS.en.N_SINGULAR.PREBUILDER}!`,
  failedToPassThePrebuild: `Failed to pass the ${VOCAB_TOKENS.en.N_SINGULAR.PREBUILD}!`,

  disableI18nAnalysisAdvice: `If you don't use i18n in your project, use the ${FLAGS.NO_I18N} ${VOCAB_TOKENS.en.F_SINGULAR.OPTIONS}.`,
  disableBlogAnalysisAdvice: `If you don't have a blog in your project, use the ${FLAGS.NO_BLOG} ${VOCAB_TOKENS.en.F_SINGULAR.OPTIONS}.`,
  disableBothI18nAndBlogAnalysisMaybeAdvice: `Maybe you want to use the ${FLAGS.NO_I18N} and ${FLAGS.NO_BLOG} ${VOCAB_TOKENS.en.F_PLURAL.OPTIONS}?`,

  namingConstraint: `Only dashes and alphanumeric characters are allowed, with the requirement that the first character MUST be a letter or a digit. Also, the maximum length allowed is: ${MAX_TAXONOMY_LEN} characters.`,
  localesInfosEmptyOrMissing: `The '${LOCALES_LNG_INFOS_KEY}' field value is empty or missing in '${LOCALES_INFOS_ROOT_KEY}'! ({localeFilePath})`,
  localesInfosMismatch:
    `The '${LOCALES_INFOS_ROOT_KEY}.${LOCALES_LNG_INFOS_KEY}' field value should match the locale filename! ({localeFilePath})` +
    '\n' +
    `Expected value: '{expectedLocaleCode}', given value: '{localeCode}'`,
  localesInfosValidatorTail: '(locales files infos)',

  optionsAreInvalid: `${capitalize(VOCAB_TOKENS.en.F_PLURAL.OPTIONS)} are invalid.`,

  invalidCategories: `{count, plural,
    =0 {__NEVER__}
    =1 {Invalid ${VOCAB_TOKENS.en.N_SINGULAR.CATEGORIES}:}
    other {Invalid ${VOCAB_TOKENS.en.N_PLURAL.CATEGORIES}:}
  }`,
  invalidSubcategories: `{count, plural,
    =0 {__NEVER__}
    =1 {Invalid ${VOCAB_TOKENS.en.N_SINGULAR.SUBCATEGORIES} in the {categoryWithDefects} ${VOCAB_TOKENS.en.N_SINGULAR.CATEGORIES}:}
    other {Invalid ${VOCAB_TOKENS.en.N_PLURAL.SUBCATEGORIES} in the {categoryWithDefects} ${VOCAB_TOKENS.en.N_SINGULAR.CATEGORIES}:}
  }`,
  invalidSlugs: `{count, plural,
    =0 {__NEVER__}
    =1 {Invalid ${VOCAB_TOKENS.en.N_SINGULAR.SLUGS} in the {folderWithDefects} folder:}
    other {Invalid ${VOCAB_TOKENS.en.N_PLURAL.SLUGS} in the {folderWithDefects} folder:}
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
  }: you can't omit the {omittedOption} ${VOCAB_TOKENS.en.F_SINGULAR.OPTIONS} unless you use the {requiredOptionToAuthorizeOmission} ${
    VOCAB_TOKENS.en.F_SINGULAR.OPTIONS
  }.`,

  incompatibleOption: `• ${capitalize(VOCAB_TOKENS.en.INVARIABLE.WRONG)} ${
    VOCAB_TOKENS.en.F_SINGULAR.OPTIONS
  }: you can't use the {incompatibleOption} ${VOCAB_TOKENS.en.F_SINGULAR.OPTIONS} if you use {scope} related ${VOCAB_TOKENS.en.F_PLURAL.OPTIONS}.`,

  breakingDependency: `• Breaking dependency: you can't use both the {incompatibleOption} ${VOCAB_TOKENS.en.F_SINGULAR.OPTIONS} and {scope} related ${VOCAB_TOKENS.en.F_PLURAL.OPTIONS}.`,

  cantExtractLocalesInfosContent: `Can't extract the content of the '${LOCALES_INFOS_ROOT_KEY}' i18n section!`,
  cantOpenTheI18nLocaleSchemaFile: `Can't open the i18n ${VOCAB_TOKENS.en.N_SINGULAR.LOCALES} schema file!`,
  cantOpenThePostsFolder: "Can't open the posts folder!",
  thePostsFolderIsNotDirectory: 'The posts folder you indicated is NOT a directory!',
  theLocaleSchemaIsNotFile: 'The locale schema file you indicated is NOT a file!',

  unhandledError: 'Unhandled error!' + '\n' + '{error}' + '\n\n' + `RTFM: ${DOC_URL}` + '\n' + `Bugtracker: ${BUGTRACKER_URL}` + '\n',
  prebuildDone: `... ${capitalize(VOCAB_TOKENS.en.N_SINGULAR.PREBUILD)} done.`
} as const;
/* eslint-enable perfectionist/sort-objects */

/* eslint-disable perfectionist/sort-objects */
const translations = {
  fr: {
    blog: 'blog',
    i18n: 'i18n',

    validatedLocalesInfosBenchmark: `Validation des champs 'infos' des ${VOCAB_TOKENS.fr.F_PLURAL.LOCALES} effectuée en ~{duration}s`,
    validatedTaxonomyBenchmark: `Validation de la ${VOCAB_TOKENS.fr.F_SINGULAR.TAXONOMY} effectuée en ~{duration}s`,
    totalExecutionTimeBenchmark: "Temps total d'exécution : ~{duration}s",
    codegenBenchmark: 'Code généré en ~{duration}s',

    impossibleToStartThePrebuilder: `Impossible de démarrer le ${VOCAB_TOKENS.fr.M_SINGULAR.PREBUILDER} !`,
    interruptedThePrebuilder: `Le ${VOCAB_TOKENS.fr.M_SINGULAR.PREBUILDER} a été interrompu !`,
    failedToPassThePrebuild: `Échec du ${VOCAB_TOKENS.fr.M_SINGULAR.PREBUILD} !`,

    disableI18nAnalysisAdvice: `Si vous n'utilisez pas l'i18n dans votre projet, utilisez l'${VOCAB_TOKENS.fr.F_SINGULAR.OPTIONS} "${FLAGS.NO_I18N}".`,
    disableBlogAnalysisAdvice: `Si vous n'avez pas de blog dans votre projet, utilisez l'${VOCAB_TOKENS.fr.F_SINGULAR.OPTIONS} "${FLAGS.NO_BLOG}".`,
    disableBothI18nAndBlogAnalysisMaybeAdvice: `Peut-être voudriez-vous utilisez les ${VOCAB_TOKENS.fr.F_PLURAL.OPTIONS} "${FLAGS.NO_I18N}" et "${FLAGS.NO_BLOG}" ?`,

    namingConstraint: `Seuls les tirets et les caractères alphanumériques sont autorisés. De plus, le premier caractère DOIT être une lettre ou un chiffre. Enfin, la longueur maximale autorisée est de : ${MAX_TAXONOMY_LEN} caractères.`,
    localesInfosEmptyOrMissing: `La valeur du champ "${LOCALES_LNG_INFOS_KEY}" est vide ou manquante dans "${LOCALES_INFOS_ROOT_KEY}" ! ({localeFilePath})`,
    localesInfosMismatch:
      `La valeur du champ "${LOCALES_INFOS_ROOT_KEY}.${LOCALES_LNG_INFOS_KEY}" doit correspondre au nom de fichier de la locale ! ({localeFilePath})` +
      '\n' +
      `Valeur attendue : "{expectedLocaleCode}", valeur déduite : "{localeCode}"`,
    localesInfosValidatorTail: '(infos des fichiers des locales)',

    optionsAreInvalid: `Les ${VOCAB_TOKENS.fr.F_PLURAL.OPTIONS} sont invalides.`,

    invalidCategories: `{count, plural,
      =0 {__NEVER__}
      =1 {${VOCAB_TOKENS.fr.F_SINGULAR.CATEGORIES} invalide : }
      other {${VOCAB_TOKENS.fr.F_PLURAL.CATEGORIES} invalides : }
    }`,
    invalidSubcategories: `{count, plural,
      =0 {__NEVER__}
      =1 {${VOCAB_TOKENS.fr.F_SINGULAR.SUBCATEGORIES} invalide dans la ${VOCAB_TOKENS.fr.F_SINGULAR.CATEGORIES} "{categoryWithDefects}" :}
      other {${VOCAB_TOKENS.fr.F_PLURAL.SUBCATEGORIES} invalides dans la ${VOCAB_TOKENS.fr.F_SINGULAR.CATEGORIES} "{categoryWithDefects}" :}
    }`,
    invalidSlugs: `{count, plural,
      =0 {__NEVER__}
      =1 {${VOCAB_TOKENS.fr.M_SINGULAR.SLUGS} invalide dans le dossier "{folderWithDefects}" :}
      other {${VOCAB_TOKENS.fr.M_PLURAL.SLUGS} invalides dans le dossier "{folderWithDefects}" :}
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
    cantOpenThePostsFolder: "Impossible d'ouvrir le dossier des posts !",
    thePostsFolderIsNotDirectory: "Le dossier des posts que vous avez renseigné n'est PAS un dossier !",
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

type VocabTokens = 'SUBCATEGORIES' | 'PREBUILDER' | 'CATEGORIES' | 'PREBUILD' | 'TAXONOMY' | 'LOCALES' | 'OPTIONS' | 'UNKNOWN' | 'WRONG' | 'SLUGS';

export const LOCALES = ['en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];
type VocabTokensCollection = Partial<Record<VocabTokens, Token>>;
type VocabTokensWithGrammaticalVariants = Partial<Record<GrammaticalVariantsSumType, VocabTokensCollection>>;

export type VocabKey = keyof typeof DEFAULT_TRANSLATION;

export default translations;
// Stryker restore all
/* v8 ignore stop */
