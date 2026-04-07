const LotusDivider = () => (
  <div className="flex items-center justify-center gap-4 py-8">
    <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-temple-gold" />
    <svg width="40" height="40" viewBox="0 0 40 40" className="text-temple-gold">
      <g fill="currentColor" opacity="0.8">
        <ellipse cx="20" cy="28" rx="4" ry="10" transform="rotate(0 20 28)" />
        <ellipse cx="20" cy="28" rx="4" ry="10" transform="rotate(30 20 28)" />
        <ellipse cx="20" cy="28" rx="4" ry="10" transform="rotate(60 20 28)" />
        <ellipse cx="20" cy="28" rx="4" ry="10" transform="rotate(90 20 28)" />
        <ellipse cx="20" cy="28" rx="4" ry="10" transform="rotate(120 20 28)" />
        <ellipse cx="20" cy="28" rx="4" ry="10" transform="rotate(150 20 28)" />
        <circle cx="20" cy="28" r="4" fill="hsl(var(--temple-saffron))" />
      </g>
    </svg>
    <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-temple-gold" />
  </div>
);

export default LotusDivider;
