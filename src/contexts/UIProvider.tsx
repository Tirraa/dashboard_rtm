import { LayoutMinimalProps } from '@/types/Next';
import { NextUIProvider } from '@nextui-org/react';
import { FunctionComponent } from 'react';

interface UIProviderProps extends LayoutMinimalProps {}

const UIProvider: FunctionComponent<UIProviderProps> = ({ children }) => (
  <NextUIProvider className="flex flex-col min-h-screen">{children}</NextUIProvider>
);

export default UIProvider;
