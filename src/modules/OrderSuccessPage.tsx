import React from 'react';
import { Check } from 'lucide-react';
import { PlateaLogo } from '../components/PlateaLogo';
import { formatMoney } from '../data/menuData';
import { OrderSummary } from '../types/kiosk';

interface OrderSuccessPageProps {
  order: OrderSummary | null;
  onBackToMenu: () => void;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({
  order,
  onBackToMenu,
}) => {
  const displayOrder = order ?? {
    orderNumber: '#PLT-001',
    total: 0,
    paymentMethod: 'Cash' as const,
    status: 'Confirmed' as const,
  };

  return (
    <section
      aria-label="Order Success"
      className="min-h-screen bg-white px-6 sm:px-10 lg:px-12 py-7"
    >
      <div className="max-w-[1165px] mx-auto">
        <header className="border-b border-[#4a7c52] pb-4 mb-6 max-w-[1041px]">
          <PlateaLogo />
        </header>

        <div className="text-center pt-2">
          <div className="w-[120px] h-[120px] rounded-full bg-[#cde8cf] mx-auto flex items-center justify-center">
            <Check className="w-16 h-16 text-[#12b886]" strokeWidth={4} />
          </div>

          <h1 className="text-[40px] sm:text-[52px] font-medium text-[#0b5a14] mt-3 leading-tight">
            Order Successfully Placed
          </h1>

          <p className="text-[22px] sm:text-[26px] text-[#0b5a14] max-w-[440px] mx-auto mt-3 mb-9 leading-snug">
            Thank you for ordering with PLATEA. Your order has been received.
          </p>

          <div className="bg-[#effff1] rounded-[26px] px-6 sm:px-9 pt-5 pb-3 max-w-[980px] mx-auto text-left">
            <h2 className="text-[32px] sm:text-[38px] font-medium text-[#0b5a14] mb-5">
              Order Summary
            </h2>

            <div className="space-y-5 text-[24px] sm:text-[26px] text-[#0b5a14]">
              <div className="flex items-center justify-between pr-2 sm:pr-5">
                <span>Order Number</span>
                <span className="tabular-nums">{displayOrder.orderNumber}</span>
              </div>

              <div className="flex items-center justify-between pr-2 sm:pr-5">
                <span>Order Total</span>
                <span className="tabular-nums">
                  {formatMoney(displayOrder.total)}
                </span>
              </div>

              <div className="flex items-center justify-between pr-2 sm:pr-5">
                <span>Payment Method</span>
                <span>{displayOrder.paymentMethod}</span>
              </div>

              <div className="flex items-center justify-between pr-2 sm:pr-5 pt-1">
                <span className="text-[30px] sm:text-[36px]">Order Status</span>
                <span className="bg-[#cde8cf] text-[#2a9a2a] rounded-full px-8 py-1 text-[23px] sm:text-[26px]">
                  {displayOrder.status}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onBackToMenu}
              className="w-full h-[55px] rounded-full bg-[#04502a] hover:bg-[#0b6b38] text-white text-[26px] sm:text-[28px] font-bold mt-6 transition-colors cursor-pointer"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
