type SlashEnvelope = string;

export const getSlashEnvelope = (str: string, slashSymbol: string = '/'): SlashEnvelope =>
  (str.charAt(0) !== slashSymbol ? slashSymbol : '') + str + (str.charAt(str.length - 1) !== slashSymbol ? slashSymbol : '');

export default getSlashEnvelope;
