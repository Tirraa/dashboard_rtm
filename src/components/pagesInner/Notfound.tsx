import { LanguageFlag } from '@/config/i18n';
import { FunctionComponent } from 'react';

interface NotFoundInnerProps {
  forcedLang?: LanguageFlag;
}

// {ToDo} i18n this!
export const NotFoundInner: FunctionComponent<NotFoundInnerProps> = ({ forcedLang }) => {
  return (
    <div className="m-auto">
      <h1 className="mt-2">404 - Not found!</h1>
    </div>
  );
};

export default NotFoundInner;
