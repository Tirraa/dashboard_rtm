/* v8 ignore start */
// Stryker disable all
import { memoryDriver } from 'bentocache/drivers/memory';
import { BentoCache, bentostore } from 'bentocache';

export const keysFactory = {
  discordProfilePicture: (id: string) => `discord:pp:${id}`
};

const bentocache = new BentoCache({
  stores: {
    default: bentostore().useL1Layer(memoryDriver())
  },

  gracePeriod: {
    duration: '6h',
    enabled: true
  },
  default: 'default'
});

export default bentocache;
// Stryker restore all
/* v8 ignore stop */
