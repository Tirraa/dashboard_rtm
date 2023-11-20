import type { MaybeObjectValue } from '@/types/CustomUtilityTypes';
import type { AnchorTarget } from '@/types/HTML';
import type { AppPath } from '@/types/Next';

type LinkTargetAttr = MaybeObjectValue<AnchorTarget>;
export const getLinkTarget = (href: AppPath): LinkTargetAttr => (href.startsWith('http') ? '_blank' : undefined);

export default getLinkTarget;
