'use client';

import { i18ns } from '@/config/i18n';
import { getClientSideI18n } from '@/i18n/client';
import { cn } from '@/lib/tailwind';
import type { LayoutMinimalProps as WithChildren } from '@/types/Next';
import type { FunctionComponent } from 'react';
import { useRef, useState } from 'react';

interface CopyToClipboardProps extends WithChildren {}

export const CopyToClipboard: FunctionComponent<CopyToClipboardProps> = ({ children }) => {
  const textInput = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const globalT = getClientSideI18n();

  const onEnter = () => setHovered(true);
  const onExit = () => setHovered(false);

  let currentCoroutine: NodeJS.Timeout | null = null;
  const onCopy = () => {
    setCopied(true);
    if (textInput.current !== null && textInput.current.textContent !== null) navigator.clipboard.writeText(textInput.current.textContent);
    if (currentCoroutine) clearTimeout(currentCoroutine);

    currentCoroutine = setTimeout(() => {
      if (!currentCoroutine) return;
      setCopied(false);
      clearTimeout(currentCoroutine);
      currentCoroutine = null;
    }, 750);
  };

  return (
    <div ref={textInput} onMouseEnter={onEnter} onMouseLeave={onExit} className="code-block relative">
      {
        <button
          aria-label={globalT(`${i18ns.vocab}.copy-to-clipboard`)}
          className={cn('absolute right-2 top-2 h-8 w-8 rounded border-2 bg-gray-700 p-1 transition-[opacity] dark:bg-gray-800', {
            'opacity-100': hovered,
            'opacity-0 delay-200': !hovered,
            'border-green-400 focus:border-green-400 focus:outline-none': copied,
            'hover:border-gray-300': !copied
          })}
          onClick={onCopy}
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
