export const getLinkTarget = (href: string) => (href.startsWith('http') ? { target: '_blank' } : {});
export default getLinkTarget;
