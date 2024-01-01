import { memoryDriver } from 'bentocache/drivers/memory';
import { BentoCache, bentostore } from 'bentocache';

export const keysFactory = {
  discordProfilePicture: (id: string) => `discord:pp:${id}`
};

const bentocache = new BentoCache({
  stores: {
    multitier: bentostore().useL1Layer(memoryDriver())
  },

  gracePeriod: {
    duration: '6h',
    enabled: true
  },
  default: 'multitier'
});

export default bentocache;
