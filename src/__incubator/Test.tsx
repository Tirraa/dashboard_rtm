'use client';

import { fInter } from '@/fonts';
import { fCls } from '@/lib/fonts';
import { FunctionComponent, useEffect, useState } from 'react';

interface TestProps {}

export const Test: FunctionComponent<TestProps> = () => {
  const defaultTestDataValue = { title: 'dummy placeholder' };
  const [testData, setTestData] = useState<Record<string, unknown>>(defaultTestDataValue);

  useEffect(() => {
    async function getData() {
      const data = await (await fetch('https://jsonplaceholder.typicode.com/todos/1')).json();
      setTestData(data);
    }
    getData();
  }, []);

  return <p {...fCls(fInter)}>{testData.title as string}</p>;
};

export default Test;
