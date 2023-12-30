import executionContextWarningsVocabGetter from '../../../errors/vocab/warnings/executionContext';

type TComputedNodeEnv = {
  PROD: boolean;
  TEST: boolean;
  DEV: boolean;
};

const [NODE_PROD_ENV_NEEDLE, NODE_DEV_ENV_NEEDLE, NODE_TEST_ENV_NEEDLE] = ['prod', 'dev', 'test'];
const NODE_ENV = process.env.NODE_ENV;

// Stryker Workaround 1. Pointless mutants: it makes no sense to granularly test each of these lines for these scenarios.
// Stryker disable MethodExpression,BooleanLiteral
const prodCtx: boolean = NODE_ENV ? NODE_ENV.startsWith(NODE_PROD_ENV_NEEDLE) : false;
let devCtx: boolean = NODE_ENV ? NODE_ENV.startsWith(NODE_DEV_ENV_NEEDLE) : false;
let testCtx: boolean = NODE_ENV ? NODE_ENV.startsWith(NODE_TEST_ENV_NEEDLE) : false;
// Stryker restore all
let forcedToProd: boolean = prodCtx;

// Stryker Workaround 2. Pointless mutants: there's no ambiguity here.
// Stryker disable next-line BlockStatement,ConditionalExpression
if (NODE_ENV === undefined) {
  console.warn(executionContextWarningsVocabGetter('UNABLE_TO_GET_NODE_ENV'));
  // Stryker Workaround 3. Pointless mutant: it makes no sense to test this line for this scenario.
  // Stryker disable next-line BooleanLiteral
  forcedToProd = true;
}

// Stryker Workaround 4. Pointless mutants: there's no ambiguity here.
// Stryker disable next-line BlockStatement,ConditionalExpression
if (forcedToProd) {
  devCtx = false;
  // Stryker Workaround 5. Pointless mutant: it makes no sense to test this line for this scenario.
  // Stryker disable next-line BooleanLiteral
  testCtx = false;
}

// Stryker Workaround 6. Pointless mutant: it makes no sense to test this line for these scenarios.
// Stryker disable next-line ConditionalExpression,ArrowFunction,ConditionalExpression,EqualityOperator,BooleanLiteral,BlockStatement
if ([devCtx, testCtx, prodCtx, forcedToProd].every((v) => v === false)) {
  console.warn(executionContextWarningsVocabGetter('FAILED_TO_INFER_CTX'));
  // Stryker Workaround 7. Pointless mutant: it makes no sense to test this line for this scenario.
  // Stryker disable next-line BooleanLiteral
  forcedToProd = true;
}

const ComputedNodeCtx: TComputedNodeEnv = {
  PROD: forcedToProd || !testCtx ? !devCtx : false,
  TEST: !forcedToProd ? testCtx : false,
  DEV: !forcedToProd ? devCtx : false
} as const;

export default ComputedNodeCtx;
