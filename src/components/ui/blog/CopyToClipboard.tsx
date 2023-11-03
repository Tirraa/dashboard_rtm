'use client';

import { i18ns } from '@/config/i18n';
import { getClientSideI18n } from '@/i18n/client';
import { getRefCurrentPtr } from '@/lib/react';
import { cn } from '@/lib/tailwind';
import type { WithChildren } from '@/types/Next';
import type { FunctionComponent } from 'react';
import { useRef, useState } from 'react';

interface CopyToClipboardProps extends WithChildren {}

export const CopyToClipboard: FunctionComponent<CopyToClipboardProps> = ({ children }) => {
  const textInputRef = useRef<HTMLDivElement>(null);
  const copyBtnRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [copied, setCopied] = useState(false);
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

  let currentCoroutine: NodeJS.Timeout | null = null;
  const onCopy = () => {
    const copyBtnInstance = getRefCurrentPtr(copyBtnRef);
    const textInputInstance = getRefCurrentPtr(textInputRef);
    if (copyBtnInstance) copyBtnInstance.blur();

    setCopied(true);
    if (textInputInstance && textInputInstance.textContent !== null) navigator.clipboard.writeText(textInputInstance.textContent);
    if (currentCoroutine) clearTimeout(currentCoroutine);

    currentCoroutine = setTimeout(() => {
      if (!currentCoroutine) return;
      setCopied(false);
      clearTimeout(currentCoroutine);
      currentCoroutine = null;
    }, 750);
  };

  return (
    <div ref={textInputRef} className="code-block relative" {...{ onMouseEnter, onMouseLeave }}>
      {
        <button
          ref={copyBtnRef}
          aria-hidden={isHidden()}
          aria-label={globalT(`${i18ns.vocab}.copy-to-clipboard`)}
          className={cn('absolute right-2 top-2 h-8 w-8 rounded border-2 bg-gray-700 p-1 transition-[opacity] dark:bg-gray-800', {
            'opacity-100': isShown(),
            'opacity-0 delay-200': isHidden(),
            'border-green-400 focus:border-green-400 focus:outline-none': copied,
            'hover:border-gray-300': !copied
          })}
          onClick={onCopy}
          {...{ onFocus, onBlur }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            className={copied ? 'text-green-400' : 'text-gray-300'}
          >
            {copied ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
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
