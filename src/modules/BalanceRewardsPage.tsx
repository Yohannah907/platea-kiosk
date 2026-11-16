import React from 'react';
import { PlateaLogo } from '../components/PlateaLogo';
import { PAYMENT_METHODS, formatMoney } from '../data/menuData';
import { PaymentMethod } from '../types/kiosk';

interface BalanceRewardsPageProps {
  balance: number;
  selectedPayment: PaymentMethod;
  onSelectPayment: (method: PaymentMethod) => void;
  onBackToMenu: () => void;
}

const PaymentIcon: React.FC<{ method: PaymentMethod }> = ({ method }) => {
  if (method === 'Cash') {
    return (
      <svg
        width="34"
        height="26"
        viewBox="0 0 34 26"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="1" y="5" width="28" height="17" rx="2" fill="#2fbf71" />
        <rect x="5" y="2" width="28" height="17" rx="2" fill="#1f9d5a" />
        <circle cx="19" cy="10.5" r="4" fill="#d9fbe6" />
        <text
          x="19"
          y="13"
          fontSize="7"
          textAnchor="middle"
          fill="#1f9d5a"
          fontFamily="Arial"
          fontWeight="700"
        >
          $
        </text>
      </svg>
    );
  }

  return (
    <svg
      width="28"
      height="26"
      viewBox="0 0 26 26"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="2" y="5" width="22" height="17" rx="3" fill="#0aa561" />
      <rect x="2" y="3" width="14" height="4" rx="1.5" fill="#075a37" />
      <circle cx="19" cy="14" r="3" fill="#fff" />
      <circle cx="19" cy="14" r="1.2" fill="#0aa561" />
    </svg>
  );
};

export const BalanceRewardsPage: React.FC<BalanceRewardsPageProps> = ({
  balance,
  selectedPayment,
  onSelectPayment,
  onBackToMenu,
}) => {
  return (
    <section
      aria-label="Balance and Rewards"
      className="min-h-screen bg-white px-6 sm:px-10 lg:px-12 py-7"
    >
      <div className="max-w-[1165px] mx-auto">
        <header className="border-b border-[#4a7c52] pb-4 mb-5 max-w-[1041px]">
          <PlateaLogo
            onBack={onBackToMenu}
            backLabel="Back to Menu"
            variant="inline"
          />
        </header>

        <h1 className="text-[34px] sm:text-[38px] font-medium text-[#0b5a14] leading-tight">
          Balance &amp; Rewards
        </h1>
        <p className="text-[22px] sm:text-[26px] text-[#0b5a14] mt-3 mb-6">
          Manage your balance and choose your preferred payment method.
        </p>

        {/* Available Balance Card */}
        <div className="bg-[#effff1] rounded-[26px] px-6 py-5 mb-7">
          <p className="text-[32px] sm:text-[36px] text-[#0b5a14] leading-tight">
            Available Balance
          </p>
          <p className="text-[38px] sm:text-[42px] text-[#0b5a14] mt-2 tabular-nums">
            ₱ {formatMoney(balance)}
          </p>
        </div>

        <h2 className="text-[32px] sm:text-[38px] font-medium text-[#0b5a14] mb-4">
          Choose Payment Method
        </h2>

        <div role="radiogroup" aria-label="Payment Methods" className="space-y-6">
          {PAYMENT_METHODS.map((method) => {
            const isSelected = selectedPayment === method;
            return (
              <button
                key={method}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelectPayment(method)}
                className={`w-full h-[58px] rounded-full border px-5 flex items-center gap-4 text-[26px] sm:text-[28px] text-[#0b5a14] text-left transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#86e08c] border-[#2fb344] font-medium'
                    : 'bg-white border-[#7edc86] hover:bg-[#f4fff5]'
                }`}
              >
                <PaymentIcon method={method} />
                <span>{method}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onBackToMenu}
          className="w-full h-[55px] rounded-full bg-[#04502a] hover:bg-[#0b6b38] text-white text-[26px] sm:text-[28px] font-bold mt-9 transition-colors cursor-pointer"
        >
          Back to Menu
        </button>

        <p className="text-center text-[20px] text-[#0b5a14] mt-3">
          Your campus served beautifully.
        </p>
      </div>
    </section>
  );
};
