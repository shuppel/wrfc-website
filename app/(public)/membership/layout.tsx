import { generateMetadata } from '../utils/seo';

export const metadata = generateMetadata('membership');

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 