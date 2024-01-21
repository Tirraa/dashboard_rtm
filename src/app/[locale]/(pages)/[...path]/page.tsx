import type { PageProps } from '@/types/Page';

// {ToDo} Implement this
export default function Page({ params }: PageProps) {
  return <>{params.path.join('/')}</>;
}
