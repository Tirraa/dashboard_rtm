import type { MaybeObjectValue } from '@rtm/shared-types/CustomUtilityTypes';
import type { AnchorTarget } from '@rtm/shared-types/HTML';
import type { AppPath } from '@rtm/shared-types/Next';

type LinkTargetAttr = MaybeObjectValue<AnchorTarget>;
export const getLinkTarget = (href: AppPath): LinkTargetAttr => (href.startsWith('http') ? '_blank' : undefined);

export default getLinkTarget;
