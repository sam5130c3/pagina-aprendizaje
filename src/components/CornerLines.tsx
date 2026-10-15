export default function CornerLines({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 230" fill="none" className={className} aria-hidden="true">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path
          key={i}
          d={`M${-40 + i * 26},230 C${110 + i * 24},${200 - i * 12} ${250 + i * 20},${168 - i * 16} 420,${142 - i * 20}`}
          stroke="#F0A055"
          strokeWidth="1.4"
          opacity="0.5"
        />
      ))}
    </svg>
  )
}
