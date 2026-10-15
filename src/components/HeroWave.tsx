export default function HeroWave({ color = '#ffffff' }: { color?: string }) {
  return (
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      <path d="M0,0 L720,300 L1440,0 L1440,320 L0,320 Z" fill={color} />
    </svg>
  )
}
