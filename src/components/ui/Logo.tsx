import Image from "next/image";

type LogoProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function Logo({
  src,
  alt = "Logo",
  width = 120,
  height = 32,
  className = "h-7 w-auto",
}: LogoProps) {
  return (
    <div className="flex-shrink-0">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        className={className}
      />
    </div>
  );
}
