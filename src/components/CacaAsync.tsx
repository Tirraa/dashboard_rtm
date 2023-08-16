import { FunctionComponent } from 'react';

interface CacaAsyncProps {}

const CacaAsync: FunctionComponent<CacaAsyncProps> = async () => {
  const cacaData = await (
    await fetch('https://worldtimeapi.org/api/timezone/Europe/Paris', {
      next: {
        revalidate: 5 // * ... Si la dernière mise en cache était il y a + de 5 secondes, regénération du composant en cache
      }
    })
  ).json();
  return <div className="font-inter">{cacaData.datetime}</div>;
};

export default CacaAsync;
