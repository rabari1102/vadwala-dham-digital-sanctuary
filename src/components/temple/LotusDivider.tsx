const LotusDivider = () => (
  <div className="flex items-center justify-center gap-4 py-6">
    <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-orange-400" />
    <div className="flex items-center gap-1.5">
      <span className="text-orange-300 text-base select-none">✦</span>
      <svg width="36" height="36" viewBox="0 0 40 40" className="text-orange-500">
        <g fill="currentColor" opacity="0.85">
          <ellipse cx="20" cy="28" rx="4" ry="10" transform="rotate(0 20 28)" />
          <ellipse cx="20" cy="28" rx="4" ry="10" transform="rotate(30 20 28)" />
          <ellipse cx="20" cy="28" rx="4" ry="10" transform="rotate(60 20 28)" />
          <ellipse cx="20" cy="28" rx="4" ry="10" transform="rotate(90 20 28)" />
          <ellipse cx="20" cy="28" rx="4" ry="10" transform="rotate(120 20 28)" />
          <ellipse cx="20" cy="28" rx="4" ry="10" transform="rotate(150 20 28)" />
          <circle cx="20" cy="28" r="4" fill="#FF6700" />
        </g>
      </svg>
      <span className="text-orange-300 text-base select-none">✦</span>
    </div>
    <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-orange-400" />
  </div>
);

export default LotusDivider;
