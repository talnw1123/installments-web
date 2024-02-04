'use client';
import { FunctionComponent, PropsWithChildren, useEffect, useState } from 'react';

import EmotionCacheProvider from './EmotionCacheProvider';

const ThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(false), []); // Set .loading to false when the component is mounted

  if (loading) return null; // Don't render anything until the component is mounted

  return <EmotionCacheProvider options={{ key: 'mui' }}>{children}</EmotionCacheProvider>;
};

export default ThemeProvider;
