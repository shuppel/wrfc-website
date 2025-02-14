interface ImageWithSEOProps {
  src: string
  alt: string
  width: number
  height: number
}

export default function ImageWithSEO({ src, alt, width, height }: ImageWithSEOProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
    />
  )
} 