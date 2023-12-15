const NODE_ENV = 'test';

// @ts-expect-error
process.env.NODE_ENV = NODE_ENV;

export default NODE_ENV;
