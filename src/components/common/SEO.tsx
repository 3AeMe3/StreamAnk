import { HeadProvider, Meta, Title } from "react-head";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({ title, description, image, url }: SEOProps) {
  return (
    <HeadProvider>
      <Title>{title}</Title>
      <Meta name="description" content={description} />
      {url && <link rel="canonical" href={url}></link>}

      {/* Open Graph */}
      <Meta property="og:title" content={title}></Meta>
      {description && <Meta property="og:description" content={description} />}
      {image && <Meta property="og:image" content={image} />}
      {url && <Meta property="og:url" content={url} />}
      <Meta property="og:type" content="website"></Meta>

      {/* X(twitter) card */}
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={title} />
      {description && (
        <Meta name="twitter:description" content={description}></Meta>
      )}
      {image && <Meta name="twitter:image" content={image}></Meta>}
    </HeadProvider>
  );
}
