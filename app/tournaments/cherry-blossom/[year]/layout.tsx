import { Metadata } from 'next';
import { generateSEOMetadata } from '@/app/utils/seo';

export async function generateMetadata({ params }: { params: { year: string } }): Promise<Metadata> {
  const year = params.year;
  return generateSEOMetadata({
    title: `${year} Cherry Blossom Rugby Tournament | WRFC`,
    description: `Cherry Blossom Rugby Tournament ${year} - hosted by Washington Rugby Football Club. View teams, results, brackets, and tournament details.`,
    path: `/tournaments/cherry-blossom/${year}`,
  });
}

export default function CherryBlossomYearLayout({ children }: { children: React.ReactNode }) {
  return children;
}
