type Lower = number;
type Upper = number;

export const getBounds = (n1: number, n2: number): [Lower, Upper] => [n1 < n2 ? n1 : n2, n1 > n2 ? n1 : n2];
export default getBounds;
