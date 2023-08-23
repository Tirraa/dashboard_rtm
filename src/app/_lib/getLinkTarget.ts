type LinkTargetAttr = { target: string };

export const getLinkTarget = (href: string): {} | LinkTargetAttr => (href.startsWith('http') ? { target: '_blank' } : {});
export default getLinkTarget;
