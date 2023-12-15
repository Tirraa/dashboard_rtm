import { expectTypeTestsToPassAsync } from 'jest-tsd';
import { it } from 'vitest';

it('[POSTBUILD] should not produce static type errors', async () => await expectTypeTestsToPassAsync(__filename));
