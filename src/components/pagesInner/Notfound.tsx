import { FunctionComponent } from 'react';

interface NotFoundInnerProps {}

// {ToDo} i18n this!
export const NotFoundInner: FunctionComponent<NotFoundInnerProps> = () => (
  <div className="m-auto">
    <h1 className="mt-2">404 - Not found!</h1>
  </div>
);

export default NotFoundInner;
