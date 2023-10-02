import { LayoutMinimalProps } from '@/types/CustomUtilitaryTypes';

export default function BlogLayout({ children }: LayoutMinimalProps) {
  return <main className="w-full">{children}</main>;
}
