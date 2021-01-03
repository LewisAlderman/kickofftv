import React from 'react';
import PageWrapper from './PageWrapper';

export default function Main({ children }) {
  return (
    <main className="flex-1 pt-2 pb-20 md:pt-4 md:pb-32">
      <PageWrapper>{children}</PageWrapper>
    </main>
  );
}
