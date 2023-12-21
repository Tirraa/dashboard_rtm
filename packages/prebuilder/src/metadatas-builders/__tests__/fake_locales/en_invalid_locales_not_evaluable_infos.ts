const externalFromParsedStringScope = 'lol';

export default {
  _infos: {
    lng: externalFromParsedStringScope // <== Invalid: won't be evaluated successfully
  }
} as const;
