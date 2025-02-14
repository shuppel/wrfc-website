import SEO from './SEO'

interface ServicesSEOProps {
  serviceName: string;
  serviceDescription: string;
}

export default function ServicesSEO({ serviceName, serviceDescription }: ServicesSEOProps) {
  return (
    <SEO
      title={`${serviceName} - IT Advisory Services`}
      description={`Nodetus provides ${serviceName.toLowerCase()} services. ${serviceDescription}`}
      article={false}
    />
  )
} 