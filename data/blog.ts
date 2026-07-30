export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishDate: string;
  author: {
    name: string;
    picture?: string;
  };
  featuredImage?: string;
  categories?: string[];
  tags?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'welcome-to-wrfc',
    title: 'Welcome to Washington Rugby Football Club',
    excerpt: 'The history and community of the oldest rugby club in Washington, DC.',
    content: `
      <p>Welcome to Washington Rugby Football Club, the oldest rugby club in Washington, DC, playing continuously since 1963.</p>
      
      <p>For over six decades, WRFC has been a cornerstone of rugby in the nation's capital, developing players, fostering community, and competing at the highest levels of American rugby.</p>
      
      <h2>Our Legacy</h2>
      <p>Since our founding, we've contributed over 25 players to the USA Eagles national team, including World Cup participants and national team captains. Our commitment to excellence on and off the field has made us one of the most respected rugby organizations in the United States.</p>
      
      <h2>Join Us</h2>
      <p>Whether you're an experienced player or new to rugby, WRFC welcomes you. We field competitive teams in both Division 1 and Division 3, ensuring opportunities for players at all skill levels.</p>
    `,
    publishDate: '2025-01-15',
    author: {
      name: 'WRFC Staff'
    },
    featuredImage: '/assets/pictures/huddle_2025_irish.jpg',
    categories: ['Club News'],
    tags: ['welcome', 'history', 'community']
  }
];

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map(post => post.slug);
}
