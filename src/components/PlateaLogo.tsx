import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PlateaLogoProps {
  onBack?: () => void;
  backLabel?: string;
  variant?: 'circle' | 'inline';
  onLogoClick?: () => void;
}

export const PlateaLogo: React.FC<PlateaLogoProps> = ({
  onBack,
  backLabel = 'Go back',
  variant = 'inline',
  onLogoClick,
}) => {
  return (
    <div className="inline-flex items-center gap-3 shrink-0">
      {onBack && variant === 'circle' && (
        <button
          type="button"
          onClick={onBack}
          aria-label={backLabel}
          className="w-11 h-11 rounded-full bg-[#073d09] text-white flex items-center justify-center hover:bg-[#0b5a14] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
        </button>
      )}
      {onBack && variant === 'inline' && (
        <button
          type="button"
          onClick={onBack}
          aria-label={backLabel}
          className="text-[#0b5a14] hover:text-[#04502a] transition-colors flex items-center justify-center cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" strokeWidth={2.2} />
        </button>
      )}
      {onLogoClick ? (
        <button
          type="button"
          onClick={onLogoClick}
          className="font-platea-logo text-[#0b5a14] text-[42px] sm:text-[46px] leading-none relative inline-block pr-3 cursor-pointer bg-transparent border-0 whitespace-nowrap"
        >
          Platea
          <span
            aria-hidden="true"
            className="absolute right-0 -top-1 text-[34px] leading-none"
          >
            `
          </span>
        </button>
      ) : (
        <span className="font-platea-logo text-[#0b5a14] text-[42px] sm:text-[46px] leading-none relative inline-block pr-3 select-none whitespace-nowrap">
          Platea
          <span
            aria-hidden="true"
            className="absolute right-0 -top-1 text-[34px] leading-none"
          >
            `
          </span>
        </span>
      )}
    </div>
  );
};
