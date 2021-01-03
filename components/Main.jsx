import React from 'react';
import PageWrapper from './PageWrapper';

export default function Main({ children }) {
  return (
    <main className="flex-1 pt-4 pb-14 md:pt-8 md:pb-40">
      <PageWrapper>{children}</PageWrapper>
    </main>
  );
}
