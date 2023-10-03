import { resetScroll } from '@/lib/html';
import { useEffect } from 'react';

const useResetScroll = () => useEffect(() => resetScroll(), []);

export default useResetScroll;
