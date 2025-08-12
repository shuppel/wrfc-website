import Image from 'next/image';
import Link from 'next/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS, Document, Block, Inline } from '@contentful/rich-text-types';

// Options for the rich text renderer
const options = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-bold">{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic">{text}</em>,
    [MARKS.UNDERLINE]: (text: React.ReactNode) => <u className="underline">{text}</u>,
    [MARKS.CODE]: (text: React.ReactNode) => <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded font-mono text-sm">{text}</code>,
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (node: Block | Inline, children: React.ReactNode) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: React.ReactNode) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
    [BLOCKS.HEADING_3]: (node: Block | Inline, children: React.ReactNode) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
    [BLOCKS.HEADING_4]: (node: Block | Inline, children: React.ReactNode) => <h4 className="text-xl font-bold mt-6 mb-3">{children}</h4>,
    [BLOCKS.HEADING_5]: (node: Block | Inline, children: React.ReactNode) => <h5 className="text-lg font-bold mt-4 mb-2">{children}</h5>,
    [BLOCKS.HEADING_6]: (node: Block | Inline, children: React.ReactNode) => <h6 className="text-base font-bold mt-4 mb-2">{children}</h6>,
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: React.ReactNode) => <p className="mb-4">{children}</p>,
    [BLOCKS.UL_LIST]: (node: Block | Inline, children: React.ReactNode) => <ul className="list-disc pl-6 mb-6">{children}</ul>,
    [BLOCKS.OL_LIST]: (node: Block | Inline, children: React.ReactNode) => <ol className="list-decimal pl-6 mb-6">{children}</ol>,
    [BLOCKS.LIST_ITEM]: (node: Block | Inline, children: React.ReactNode) => <li className="mb-1">{children}</li>,
    [BLOCKS.QUOTE]: (node: Block | Inline, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-wrfc-red pl-4 italic my-6">{children}</blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-8 border-gray-300 dark:border-gray-700" />,
    [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
      const { title, description, file } = node.data.target.fields;
      const { url, details } = file;
      const { image } = details;
      const { width, height } = image || { width: 800, height: 400 };

      return (
        <div className="my-8 relative">
          <Image
            src={`https:${url}`}
            alt={description || title || 'Embedded image'}
            width={width}
            height={height}
            className="rounded-lg mx-auto"
          />
          {title && <p className="text-center text-sm text-gray-500 mt-2">{title}</p>}
        </div>
      );
    },
    [INLINES.HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => {
      const { uri } = node.data;
      const isInternal = uri.startsWith('/');

      // For internal links, use Next.js Link component
      if (isInternal) {
        return (
          <Link href={uri} className="text-wrfc-red hover:underline">
            {children}
          </Link>
        );
      }

      // For external links, use standard anchor tag with security attributes
      return (
        <a
          href={uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-wrfc-red hover:underline"
        >
          {children}
        </a>
      );
    },
    [INLINES.ENTRY_HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => {
      const { slug, __typename } = node.data.target;
      let href = '/';

      // Determine the link path based on content type
      if (__typename === 'BlogPost') {
        href = `/blog/${slug}`;
      } else if (__typename === 'PlayerProfile') {
        href = `/teams/players/${slug}`;
      }

      return (
        <Link href={href} className="text-wrfc-red hover:underline">
          {children}
        </Link>
      );
    },
  },
};

/**
 * Renders a Contentful Rich Text field as React components
 * @param content Rich text document from Contentful
 * @returns React components
 */
export function renderRichText(content: Document | undefined | null) {
  if (!content) {
    return null;
  }

  return documentToReactComponents(content, options);
}