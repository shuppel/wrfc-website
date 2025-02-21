'use client';

import { useState } from 'react';
import ArticleDrawer from './ArticleDrawer';

export default function ArticleDrawerWrapper() {
  const [isArticleDrawerOpen, setIsArticleDrawerOpen] = useState(false);

  return (
    <ArticleDrawer 
      isOpen={isArticleDrawerOpen} 
      onClose={() => setIsArticleDrawerOpen(!isArticleDrawerOpen)} 
    />
  );
} 