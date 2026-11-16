import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { PlateaLogo } from '../components/PlateaLogo';
import { MENU_ITEMS, PAYMENT_METHODS, formatMoney } from '../data/menuData';
import { CartMap, PaymentMethod } from '../types/kiosk';

interface ViewCartPageProps {
  cart: CartMap;
  paymentMethod: PaymentMethod;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onSelectPayment: (method: PaymentMethod) => void;
  onConfirmOrder: () => void;
  onBackToMenu: () => void;
}

export const ViewCartPage: React.FC<ViewCartPageProps> = ({
  cart,
  paymentMethod,
  onUpdateQuantity,
  onSelectPayment,
  onConfirmOrder,
  onBackToMenu,
}) => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const entries = Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({
      item: MENU_ITEMS[id],
      quantity: qty,
    }))
    .filter((entry) => Boolean(entry.item));

  const subtotal = entries.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0,
  );
  const additionalFees = 0;
  const total = subtotal + additionalFees;

  return (
    <section
      aria-label="View the Cart"
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
          Review your Order
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-10 lg:gap-12 items-start mt-4">
          {/* Left Column: Cart Items */}
          <div>
            <p className="text-[24px] sm:text-[26px] text-[#0b5a14] mb-7">
              Check your items before placing your order
            </p>

            {entries.length > 0 ? (
              <div className="space-y-8">
                {entries.map(({ item, quantity }) => (
                  <article
                    key={item.id}
                    className="border border-[#04502a] rounded-[28px] px-6 py-4 flex flex-col sm:flex-row items-center gap-5 bg-white"
                  >
                    <div className="w-[165px] h-[138px] rounded-[12px] overflow-hidden bg-white border border-[#e6ece7] flex items-center justify-center shrink-0">
                      {!failedImages[item.id] ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedImages((prev) => ({
                              ...prev,
                              [item.id]: true,
                            }))
                          }
                          className={`w-full h-full block ${
                            item.contain ? 'object-contain' : 'object-cover'
                          }`}
                        />
                      ) : (
                        <span className="text-5xl" aria-hidden="true">
                          {item.emoji}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 w-full text-center sm:text-left">
                      <h2 className="text-[32px] sm:text-[36px] text-[#0b5a14] leading-tight sm:text-center">
                        {item.name}
                      </h2>

                      <div className="flex items-center justify-center sm:justify-start gap-3 mt-2 text-[25px] text-[#0b5a14]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="w-8 h-8 rounded-full border border-[#04502a] bg-white hover:bg-[#effff1] text-[#0b5a14] flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Minus className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                        <span className="tabular-nums">
                          Quantity: {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="w-8 h-8 rounded-full border border-[#04502a] bg-white hover:bg-[#effff1] text-[#0b5a14] flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Plus className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                      </div>

                      <p className="text-[25px] text-[#0b5a14] mt-2 tabular-nums">
                        P {formatMoney(item.price * quantity)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="bg-[#effff1] rounded-[24px] p-8 text-center sm:text-left">
                <p className="text-[26px] text-[#0b5a14] mb-4">
                  Your cart is currently empty.
                </p>
                <button
                  type="button"
                  onClick={onBackToMenu}
                  className="px-7 py-2.5 rounded-full bg-[#04502a] hover:bg-[#0b6b38] text-white text-[22px] transition-colors cursor-pointer"
                >
                  Browse the menu
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <aside
            aria-label="Order Summary"
            className="bg-[#effff1] rounded-[26px] px-6 sm:px-8 pt-5 pb-9"
          >
            <h2 className="text-[34px] font-medium text-[#0b5a14] mb-7">
              Order Summary
            </h2>

            <div className="space-y-5 text-[27px] text-[#0b5a14]">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatMoney(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Additional Fees</span>
                <span className="tabular-nums">
                  {additionalFees === 0 ? '00.00' : formatMoney(additionalFees)}
                </span>
              </div>
            </div>

            <hr className="border-0 border-t border-[#223b26] my-6" />

            <div className="flex items-center justify-between text-[#0b5a14] mb-3">
              <span className="text-[36px]">Total</span>
              <span className="text-[28px] tabular-nums">
                {formatMoney(total)}
              </span>
            </div>

            <label
              htmlFor="cart-payment-select"
              className="block text-[26px] text-[#0b5a14] mb-4"
            >
              Payment Method
            </label>

            <select
              id="cart-payment-select"
              value={paymentMethod}
              onChange={(e) => onSelectPayment(e.target.value as PaymentMethod)}
              className="w-full h-[58px] rounded-full border border-[#c5f7c8] bg-white px-6 text-[26px] text-[#0b5a14] mb-7 cursor-pointer"
            >
              {PAYMENT_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>

            <button
              type="button"
              disabled={entries.length === 0}
              onClick={onConfirmOrder}
              className="block w-full max-w-[400px] mx-auto h-[56px] rounded-full bg-[#04502a] hover:bg-[#0b6b38] disabled:opacity-45 disabled:cursor-not-allowed text-white text-[26px] sm:text-[28px] uppercase font-medium tracking-wide transition-colors cursor-pointer"
            >
              Confirm Order
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
};
