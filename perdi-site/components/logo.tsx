import Image from 'next/image'

interface LogoProps {
  className?: string
  size?: "normal" | "large"
}

export default function Logo({ className = "", size = "normal" }: LogoProps) {
  // Boyutları farklı yerler için
  const imgWidth = size === "large" ? 220 : 150
  const imgHeight = size === "large" ? 70 : 50
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logob.png`}
        alt="By Tezer Perde Logo"
        width={imgWidth}
        height={imgHeight}
        className="object-contain select-none"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.outerHTML = '<span style="font-size:1.2rem;font-weight:bold;font-family:serif">By Tezer Perde</span>';
        }}
        draggable={false}
      />
    </div>
  )
}
