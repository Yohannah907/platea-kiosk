import React from 'react';
import { MenuItem } from '../types/kiosk';

interface AddToCartModalProps {
  item: MenuItem | null;
  onContinueShopping: () => void;
  onViewCart: () => void;
}

export const AddToCartModal: React.FC<AddToCartModalProps> = ({
  item,
  onContinueShopping,
  onViewCart,
}) => {
  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="added-modal-title"
      onClick={onContinueShopping}
      className="fixed inset-0 z-50 bg-[#0b5a14]/35 backdrop-blur-[1px] flex items-center justify-center px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[440px] bg-white rounded-[10px] border border-[#7edc86] shadow-2xl px-8 py-8 text-center"
      >
        <h2
          id="added-modal-title"
          className="text-[30px] font-bold text-[#052909] mb-2"
        >
          Added to Cart!
        </h2>
        <p className="text-[20px] text-[#0b5a14] mb-6">
          <span className="font-medium">{item.name}</span> has been successfully added.
        </p>

        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={onContinueShopping}
            className="w-full max-w-[310px] h-[38px] rounded-full border border-[#0b5a14] bg-[#b8f8b8] hover:bg-[#9bf09b] text-[#0b5a14] text-[22px] leading-none transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
          <button
            type="button"
            onClick={onViewCart}
            className="text-[18px] text-[#04502a] hover:underline underline-offset-4 bg-transparent border-0 cursor-pointer"
          >
            View Cart →
          </button>
        </div>
      </div>
    </div>
  );
};
