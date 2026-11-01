import Image from 'next/image';

interface RatingsBarProps {
  rating: number;
}

export function RatingsBar({ rating }: RatingsBarProps) {
  if (!rating) return null;

  const slots = Array.from({ length: 5 }, (_, i) => {
    if (rating >= i + 1) return 'full';
    if (rating >= i + 0.5) return 'half';
    return 'default';
  });

  return (
    <div className="ratings-bar" aria-label={`Rating: ${rating} out of 5`}>
      {slots.map((type, i) => (
        <Image
          key={i}
          src={`/ranking-${type}.svg`}
          alt=""
          width={18}
          height={18}
          unoptimized
        />
      ))}
      <style>{`
        .ratings-bar {
          display: flex;
          align-items: center;
          gap: 2px;
        }
      `}</style>
    </div>
  );
}
