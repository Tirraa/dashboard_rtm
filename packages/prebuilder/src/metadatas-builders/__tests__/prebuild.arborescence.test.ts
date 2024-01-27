// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import traverseAndMapFilepaths from '../../lib/traverseAndMapFilepaths';
import buildArborescence from '../arborescence';

const VALID_ARBORESCENCE_FOLDER_PATH = './packages/prebuilder/src/metadatas-builders/__tests__/fake_arborescence';

describe('buildArborescence', () => {
  it('should match snapshot', async () => {
    const arborescenceMap = await traverseAndMapFilepaths(VALID_ARBORESCENCE_FOLDER_PATH);
    const arborescence = buildArborescence(arborescenceMap, VALID_ARBORESCENCE_FOLDER_PATH);
    expect(arborescence).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const arborescenceMap = await traverseAndMapFilepaths(VALID_ARBORESCENCE_FOLDER_PATH);
    const arborescence = buildArborescence(arborescenceMap);
    expect(arborescence).toMatchSnapshot();
  });
});
