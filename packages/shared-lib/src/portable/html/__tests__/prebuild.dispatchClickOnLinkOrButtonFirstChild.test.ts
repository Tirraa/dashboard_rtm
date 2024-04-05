import type { IElement } from 'happy-dom';

import { describe, expect, it } from 'vitest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Window } from 'happy-dom';

import dispatchClickOnLinkOrButtonFirstChild from '../dispatchClickOnLinkOrButtonFirstChild';

describe('dispatchClickOnLinkOrButtonFirstChild', () => {
  it('should click on the link element if it exists', () => {
    const window = new Window();
    window.document.body.innerHTML = `
      <div id="element">
        <a href="#"></a>
      </div>
    `;

    const element = window.document.body.querySelector('#element') as IElement;
    const linkElement = element.querySelector('a') as IElement;

    let clicked = false;
    linkElement.onclick = () => {
      clicked = true;
    };

    dispatchClickOnLinkOrButtonFirstChild(element as any);
    expect(clicked).toBe(true);
  });

  it('should click on the button element if it exists', () => {
    const window = new Window();
    window.document.body.innerHTML = `
      <div id="element">
        <button>Click me!</button>
      </div>
    `;

    const element = window.document.body.querySelector('#element') as IElement;
    const buttonElement = element.querySelector('button') as IElement;

    let clicked = false;
    buttonElement.onclick = () => {
      clicked = true;
    };

    dispatchClickOnLinkOrButtonFirstChild(element as any);
    expect(clicked).toBe(true);
  });

  it('should not throw, given an Event Target which does not extend HTMLElement', () => {
    const myEventTarget = new EventTarget();
    expect(() => dispatchClickOnLinkOrButtonFirstChild(myEventTarget)).not.toThrow();
  });
});
