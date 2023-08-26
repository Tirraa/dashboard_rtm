import { FunctionComponent } from 'react';

interface TestAsyncProps {}

export const TestAsync: FunctionComponent<TestAsyncProps> = async () => {
  const testData = await (
    await fetch('https://worldtimeapi.org/api/timezone/Europe/Paris', {
      next: {
        revalidate: 5 // * ... Si la dernière mise en cache était il y a + de 5 secondes, regénération du composant en cache
      }
    })
  ).json();
  return <p>{testData.datetime}</p>;
};

export default TestAsync;
