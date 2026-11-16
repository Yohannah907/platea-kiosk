import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PlateaLogo } from '../components/PlateaLogo';

interface WelcomePageProps {
  onStartOrder: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onStartOrder }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      aria-label="Welcome Page"
      className="mint-grain-surface min-h-screen flex items-center justify-center px-6 py-10 lg:px-20 lg:py-14"
    >
      <div className="w-full max-w-[1160px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
        <div className="flex flex-col justify-between py-2">
          <div>
            <PlateaLogo />
          </div>

          <div className="my-10 lg:my-0">
            <p className="uppercase tracking-wide text-[20px] sm:text-[22px] text-[#0b5a14] mb-3">
              Campus dining reimagined
            </p>
            <h1 className="text-[40px] sm:text-[48px] font-medium leading-[1.15] text-[#0b5a14] mb-8 max-w-[440px]">
              Your campus, served beautifully.
            </h1>
            <p className="text-[22px] sm:text-[26px] leading-[1.28] text-[#0b5a14] max-w-[430px] mb-10">
              Discover your favorite meals and make every campus break delicious.
            </p>
            <button
              type="button"
              onClick={onStartOrder}
              className="inline-flex items-center justify-center gap-3 bg-[#073d09] hover:bg-[#0b5a14] text-[#b8f8b8] rounded-[14px] w-full max-w-[415px] h-[56px] text-[22px] sm:text-[24px] uppercase tracking-wide transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Start your order</span>
              <ArrowRight className="w-6 h-6" strokeWidth={2} />
            </button>
          </div>

          <div className="hidden lg:block" />
        </div>

        <div className="rounded-[12px] overflow-hidden bg-[#273045] min-h-[380px] lg:min-h-[620px] shadow-md flex items-center justify-center">
          {!imgError ? (
            <img
              src="/images/welcome.jpg"
              alt="Shrimp fried rice topped with fried egg and fresh lime"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover block"
            />
          ) : (
            <div className="text-center p-10 text-white/90">
              <div className="text-7xl mb-3" aria-hidden="true">🍳</div>
              <p className="text-xl">Fresh campus meals prepared daily</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
