type TSidebarErrorsVocab = {
  UNABLE_TO_RETRIEVE_ANY_SIDEBAR_ICON: string;
  UNABLE_TO_RETRIEVE_MAIN_ELEMENT: string;
  UNABLE_TO_RETRIEVE_THE_NAVBAR_ELEMENT: string;
};

const PREFIX = 'Dashboard Sidebar Error: ';
const SidebarErrorsVocab: TSidebarErrorsVocab = {
  UNABLE_TO_RETRIEVE_ANY_SIDEBAR_ICON: "Unable to retrieve any sidebar icon! The sidebar won't be displayed.",
  UNABLE_TO_RETRIEVE_MAIN_ELEMENT: "Unable to retrieve the <main> element! The sidebar won't be displayed.",
  UNABLE_TO_RETRIEVE_THE_NAVBAR_ELEMENT:
    "Unable to retrieve the navbar element! If you don't have any navbar, set the NAVBAR_ID value to `null`. The sidebar won't be displayed."
} as const;

export const sidebarErrorVocab = (key: keyof TSidebarErrorsVocab): string => PREFIX + SidebarErrorsVocab[key];
export default sidebarErrorVocab;
