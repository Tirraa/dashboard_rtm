'use client';

import type { WithChildren } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import getRefCurrentPtr from '@rtm/shared-lib/portable/react/getRefCurrentPtr';
import { getClientSideI18n } from '@/i18n/client';
import { useState, useRef } from 'react';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';

export interface CopyToClipboardProps extends WithChildren {}

const MS_DELAY = 750;

const CopyToClipboard: FunctionComponent<CopyToClipboardProps> = ({ children }) => {
  const textInputRef = useRef<HTMLDivElement>(null);
  const copyBtnRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const globalT = getClientSideI18n();

  const onMouseEnter = () => setHovered(true);
  const onMouseLeave = () => {
    setHovered(false);
  };

  const onFocus = () => setFocused(true);
  const onBlur = () => {
    setFocused(false);
  };

  const isHidden = () => !hovered && !focused;
  const isShown = () => hovered || focused;

  const onCopy = () => {
    let currentCoroutine: NodeJS.Timeout | null = null;
    const textInputInstance = getRefCurrentPtr(textInputRef);

    setCopied(true);
    if (textInputInstance && textInputInstance.textContent !== null) navigator.clipboard.writeText(textInputInstance.textContent);
    if (currentCoroutine) clearTimeout(currentCoroutine);

    currentCoroutine = setTimeout(() => {
      if (!currentCoroutine) return;
      setCopied(false);
      const copyBtnInstance = getRefCurrentPtr(copyBtnRef);
      if (copyBtnInstance) copyBtnInstance.blur();
      clearTimeout(currentCoroutine);
      currentCoroutine = null;
    }, MS_DELAY);
  };

  return (
    <div className="code-block relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={textInputRef}>
      {
        <button
          className={cn('absolute right-2 top-2 h-8 w-8 rounded border-2 bg-gray-700 p-1 transition-[opacity] dark:bg-gray-800', {
            'border-green-400 focus:border-green-400 focus:outline-none': copied,
            'opacity-0 delay-200': isHidden(),
            'hover:border-gray-300': !copied,
            'opacity-100': isShown()
          })}
          aria-label={globalT(`${i18ns.vocab}.copy-to-clipboard`)}
          onFocus={onFocus}
          ref={copyBtnRef}
          onClick={onCopy}
          onBlur={onBlur}
        >
          <svg
            className={copied ? 'text-green-400' : 'text-gray-300'}
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
          >
            {copied ? (
              <path
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth={2}
              />
            ) : (
              <path
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth={2}
              />
            )}
          </svg>
        </button>
      }
      {children}
    </div>
  );
};

export default CopyToClipboard;
