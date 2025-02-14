import { Metadata } from 'next';
import { defaultMetadata } from '@/app/seo/config';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Products & Solutions | Nodetus',
  description: 'Explore our innovative IT solutions and products designed for federal agencies. From cloud services to cybersecurity, discover how we can transform your technology infrastructure.',
  keywords: 'Federal IT Products, Government Technology Solutions, Cloud Services, Cybersecurity Products, IT Infrastructure, Digital Transformation Tools',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Nodetus Products & Solutions',
    description: 'Innovative IT solutions for federal agencies.',
    type: 'website'
  }
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
} 