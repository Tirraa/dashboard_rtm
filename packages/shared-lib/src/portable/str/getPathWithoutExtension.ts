// eslint-disable-next-line no-magic-numbers
const getPathWithoutExtension = (path: string) => (path.includes('.') ? path.substring(0, path.lastIndexOf('.')) : path);

export default getPathWithoutExtension;
