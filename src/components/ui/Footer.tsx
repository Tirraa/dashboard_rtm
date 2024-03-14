import type { FunctionComponent } from 'react';

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <footer className="flex min-h-20 flex-col items-center justify-center border-t-[1px] border-transparent bg-black text-center text-white dark:border-card dark:bg-transparent">
      Footer (todo)
    </footer>
  );
};

export default Footer;
