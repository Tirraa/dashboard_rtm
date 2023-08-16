'use client';

import { FunctionComponent, useEffect, useState } from 'react';

interface CacaProps {}

const Caca: FunctionComponent<CacaProps> = () => {
  const defaultCacaDataValue = { title: 'zizi' };
  const [cacaData, setCacaData] = useState<Record<string, unknown>>(defaultCacaDataValue);

  useEffect(() => {
    async function getData() {
      const data = await (await fetch('https://jsonplaceholder.typicode.com/todos/1')).json();
      setCacaData(data);
    }
    getData();
  }, []);

  return <>{cacaData.title}</>;
};

export default Caca;
