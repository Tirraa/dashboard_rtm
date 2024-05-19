/* v8 ignore start */
// Stryker disable all

import type { DocumentHeading as NestedTypeDocumentHeading } from 'contentlayer/generated';
import type { NestedTypeNoiseKeys } from '##/lib/misc/contentlayerCornerCases';

export type DocumentHeading = Omit<NestedTypeDocumentHeading, NestedTypeNoiseKeys>;

// Stryker restore all
/* v8 ignore stop */
