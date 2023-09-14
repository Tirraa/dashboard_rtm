import path from 'path';
import { ROOT_FOLDER_RELATIVE_PATH_FROM_STATIC_ANALYZER_CTX } from './config/config';
import retrieveMetadatas from './core/retrieveMetadatas';
import declaredBlogArchitectureValidator from './validators/architectureMatching';
import validateArgumentsThenReturnRetrievedValuesFromArgs from './validators/arguments';

const moveToCallerDirectory = () => process.chdir(path.join(__dirname, ROOT_FOLDER_RELATIVE_PATH_FROM_STATIC_ANALYZER_CTX));

/**
 * @throws {Error}
 */
function processStaticAnalysis() {
  moveToCallerDirectory();
  try {
    const retrievedValuesFromArgs = validateArgumentsThenReturnRetrievedValuesFromArgs();
    const [metadatasFromSys, declaredMetadatas] = retrieveMetadatas(retrievedValuesFromArgs);
    const validatorFeedback = declaredBlogArchitectureValidator(metadatasFromSys, declaredMetadatas);
    if (validatorFeedback) throw new Error(validatorFeedback);
    console.log('... Static analysis done.');
  } catch (error) {
    console.error((error as Error).message);
    process.exit(1);
  }
}

processStaticAnalysis();
