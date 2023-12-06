function preserveKeyboardNavigation(element: EventTarget | HTMLElement) {
  if (!(element instanceof HTMLElement)) return;

  const linkElement = element.querySelector('a');
  const buttonElement = !linkElement ? element.querySelector('button') : undefined;

  if (linkElement) linkElement.click();
  else if (buttonElement) buttonElement.click();
}

export default preserveKeyboardNavigation;
