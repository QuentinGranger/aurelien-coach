import Image from 'next/image';
import { useState } from 'react';

interface SEOImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  loading?: 'lazy' | 'eager';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  title?: string;
  caption?: string;
  schema?: {
    contentUrl: string;
    description: string;
    name: string;
    author?: string;
    datePublished?: string;
    license?: string;
  };
}

export default function SEOImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  sizes,
  fill = false,
  loading = 'lazy',
  placeholder = 'blur',
  blurDataURL,
  title,
  caption,
  schema,
}: SEOImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate blur data URL if not provided
  const defaultBlurDataURL = `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1a1a1a"/>
      <rect x="20%" y="40%" width="60%" height="20%" fill="#d4af37" opacity="0.3"/>
    </svg>`
  ).toString('base64')}`;

  // Schema.org ImageObject
  const imageSchema = schema ? {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": schema.contentUrl,
    "description": schema.description,
    "name": schema.name,
    "author": schema.author,
    "datePublished": schema.datePublished,
    "license": schema.license,
    "width": width,
    "height": height,
    "encodingFormat": src.includes('.webp') ? 'image/webp' : 
                     src.includes('.jpg') || src.includes('.jpeg') ? 'image/jpeg' :
                     src.includes('.png') ? 'image/png' : 'image/jpeg',
  } : null;

  return (
    <figure className={`seo-image ${className} ${isLoaded ? 'loaded' : 'loading'}`}>
      {imageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(imageSchema),
          }}
        />
      )}
      
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={`seo-image__img ${className}`}
        priority={priority}
        quality={quality}
        sizes={sizes || (fill ? '100vw' : `${width}px`)}
        loading={loading}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        title={title || alt}
        onLoad={() => setIsLoaded(true)}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      
      {caption && (
        <figcaption className="seo-image__caption">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
