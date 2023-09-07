import { ErrorMessage } from '../_types';

type TSidebarErrorsVocab = {
  UNABLE_TO_RETRIEVE_ANY_SIDEBAR_ICON: ErrorMessage;
  UNABLE_TO_RETRIEVE_MAIN_ELEMENT: ErrorMessage;
  UNABLE_TO_RETRIEVE_THE_NAVBAR_ELEMENT: ErrorMessage;
};

const PREFIX = 'Dashboard Sidebar Error:';
const SUFFIX = "The sidebar won't be displayed.";
const SIDEBAR_ERRORS_VOCAB: TSidebarErrorsVocab = {
  UNABLE_TO_RETRIEVE_ANY_SIDEBAR_ICON: 'Unable to retrieve any sidebar icon!',
  UNABLE_TO_RETRIEVE_MAIN_ELEMENT: 'Unable to retrieve the <main> element!',
  UNABLE_TO_RETRIEVE_THE_NAVBAR_ELEMENT: "Unable to retrieve the navbar element! If you don't have any navbar, set the NAVBAR_ID value to `null`."
} as const;

export const sidebarErrorVocabAccessor = (key: keyof TSidebarErrorsVocab): ErrorMessage => PREFIX + ' ' + SIDEBAR_ERRORS_VOCAB[key] + ' ' + SUFFIX;
export default sidebarErrorVocabAccessor;
