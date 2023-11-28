import type { MaybeObjectValue } from '@rtm/shared-types/src/CustomUtilityTypes';
import type { AnchorTarget } from '@rtm/shared-types/src/HTML';
import type { AppPath } from '@rtm/shared-types/src/Next';

type LinkTargetAttr = MaybeObjectValue<AnchorTarget>;
export const getLinkTarget = (href: AppPath): LinkTargetAttr => (href.startsWith('http') ? '_blank' : undefined);

export default getLinkTarget;
