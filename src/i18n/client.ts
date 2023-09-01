'use client';

import { LanguageFlag } from '@/config/i18n';
import { isServerSideCtx } from '@/lib/next';
import { i18nOptions } from '@/types/UglyTypes';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useEffect as __useEffect, useState as __useState } from 'react';
import { useTranslation as getTranslation, initReactI18next } from 'react-i18next';
import { defaultNS, getOptions, languages } from './settings';

const serverSideCtx = isServerSideCtx();

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
  .init({
    ...getOptions(),
    lng: undefined,
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator']
    },
    preload: serverSideCtx ? languages : []
  });

export function getClientSideTranslation(lng: LanguageFlag, ns: string = defaultNS, options: i18nOptions = {}) {
  const ret = getTranslation(ns, options);
  const { i18n } = ret;
  if (serverSideCtx && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  } else {
    const [activeLng, setActiveLng] = __useState<string | undefined>(i18n.resolvedLanguage);
    __useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return;
      setActiveLng(i18n.resolvedLanguage);
    }, [activeLng, i18n.resolvedLanguage]);
    __useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return;
      i18n.changeLanguage(lng);
    }, [lng, i18n]);
  }
  return ret;
}
