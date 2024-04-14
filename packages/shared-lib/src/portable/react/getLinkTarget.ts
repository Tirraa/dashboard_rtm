import type { MaybeObjectValue } from '@rtm/shared-types/CustomUtilityTypes';
import type { AnchorTarget } from '@rtm/shared-types/HTML';
import type { Href } from '@rtm/shared-types/Next';

type LinkTargetAttr = MaybeObjectValue<AnchorTarget>;
const getLinkTarget = (href: Href): LinkTargetAttr => (href.startsWith('http') ? '_blank' : undefined);

export default getLinkTarget;
