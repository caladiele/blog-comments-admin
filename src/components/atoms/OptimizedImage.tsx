import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  width?: number;
  height?: number;
}

export default function OptimizedImage({ 
  src, 
  alt, 
  caption, 
  credit, 
  width = 800, 
  height = 600,
  ...props 
}: OptimizedImageProps) {
    return (
    <figure className="recipe-content-figure">
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="recipe-content-figure__image"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
            {...props}
        />
    </figure>
    )
};