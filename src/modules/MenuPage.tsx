import React, { useState } from 'react';
import { ArrowRight, Search, ShoppingCart, X } from 'lucide-react';
import { PlateaLogo } from '../components/PlateaLogo';
import {
  CATEGORIES,
  CATEGORY_ITEM_IDS,
  MENU_ITEMS,
  formatMoney,
  getItemCategories,
} from '../data/menuData';
import { Category, MenuItem } from '../types/kiosk';

interface MenuPageProps {
  studentId: string;
  cartCount: number;
  onAddToCart: (item: MenuItem) => void;
  onOpenCart: () => void;
  onOpenBalance: () => void;
  onBackToWelcome: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  studentId,
  cartCount,
  onAddToCart,
  onOpenCart,
  onOpenBalance,
  onBackToWelcome,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const trimmedQuery = searchQuery.trim().toLowerCase();

  const matchesSearch = (item: MenuItem): boolean => {
    const categoriesText = getItemCategories(item.id).join(' ');
    const haystack = `${item.name} ${item.keywords} ${categoriesText}`.toLowerCase();
    return trimmedQuery
      .split(/\s+/)
      .filter(Boolean)
      .every((word) => haystack.includes(word));
  };

  const visibleItems: MenuItem[] = trimmedQuery
    ? Object.values(MENU_ITEMS).filter(matchesSearch)
    : CATEGORY_ITEM_IDS[selectedCategory].map((id) => MENU_ITEMS[id]);

  const handleCategoryClick = (cat: Category) => {
    setSelectedCategory(cat);
    setSearchQuery('');
  };

  return (
    <section aria-label="Menu Page" className="min-h-screen flex flex-col bg-white">
      {/* Top Navigation Header */}
      <header className="bg-white border-b border-[#e5ece6] px-5 sm:px-10 lg:px-12 py-4 lg:h-[106px] flex flex-wrap lg:flex-nowrap items-center gap-4 lg:gap-10">
        <PlateaLogo onLogoClick={onBackToWelcome} />

        {/* Search Field */}
        <div
          role="search"
          className="order-3 lg:order-2 w-full lg:w-[514px] lg:max-w-[44%] h-[42px] bg-[#ece8f3] rounded-full flex items-center pl-6 pr-3 gap-2 focus-within:ring-2 focus-within:ring-[#04502a]"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setSearchQuery('');
            }}
            placeholder="Search your favorite food"
            aria-label="Search your favorite food"
            className="flex-1 bg-transparent border-0 outline-none text-[16px] text-[#333333] placeholder:text-[#555555] font-sans"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="p-1 text-[#555555] hover:text-[#04502a] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            aria-label="Search menu"
            className="p-1.5 text-[#555555] hover:text-[#04502a] cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Right Actions: Balance & Rewards + Cart */}
        <div className="order-2 lg:order-3 ml-auto flex items-center gap-5 shrink-0">
          <button
            type="button"
            onClick={onOpenBalance}
            className="inline-flex items-center gap-3 text-[#0b5a14] hover:text-[#04502a] text-[22px] sm:text-[24px] cursor-pointer bg-transparent border-0 whitespace-nowrap"
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 48 48"
              aria-hidden="true"
              className="shrink-0"
            >
              <circle
                cx="24"
                cy="24"
                r="22"
                fill="#fff"
                stroke="#b9a7d6"
                strokeWidth="1.5"
              />
              <rect
                x="12"
                y="15"
                width="24"
                height="18"
                rx="3"
                fill="none"
                stroke="#6b4ea0"
                strokeWidth="2"
              />
              <path d="M12 19h24" stroke="#6b4ea0" strokeWidth="2" />
              <rect
                x="28"
                y="23"
                width="8"
                height="5"
                rx="1"
                fill="none"
                stroke="#6b4ea0"
                strokeWidth="2"
              />
            </svg>
            <span>Balance &amp; Rewards</span>
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`View cart (${cartCount} items)`}
            className="relative p-1.5 text-[#12b76a] hover:text-[#04502a] transition-colors cursor-pointer bg-transparent border-0"
          >
            <ShoppingCart className="w-9 h-9 fill-[#12b76a] text-[#12b76a]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#04502a] text-white text-[13px] font-bold min-w-[21px] h-[21px] rounded-full flex items-center justify-center px-1 tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Grainy Menu Area */}
      <main className="grain-surface flex-1 px-5 sm:px-10 lg:px-12 pt-8 pb-28 relative">
        <div className="max-w-[1196px] mx-auto">
          <h1 className="text-[32px] sm:text-[36px] font-medium text-[#0b5a14] leading-tight">
            What are your cravings today?
          </h1>
          <p className="text-[22px] sm:text-[26px] text-[#0b5a14] mt-1">
            {studentId && studentId !== 'Guest'
              ? `Fresh choices for your campus day · Student ID: ${studentId}`
              : 'Fresh choices for your campus day.'}
          </p>

          {/* 5 Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Menu Categories"
            className="flex flex-wrap gap-4 sm:gap-7 mt-9 mb-11 lg:ml-6"
          >
            {CATEGORIES.map((category) => {
              const isActive = !trimmedQuery && selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategoryClick(category)}
                  className={`min-w-[136px] sm:w-[158px] h-[38px] px-4 rounded-[14px] border-[1.5px] border-[#04502a] text-[23px] leading-none transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#04502a] text-white'
                      : 'bg-transparent text-[#0b5a14] hover:bg-white/60'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <h2 className="text-[28px] sm:text-[30px] font-medium text-[#0b5a14] mb-6">
            {trimmedQuery
              ? `Search results for “${searchQuery.trim()}” (${visibleItems.length})`
              : 'Our Menu'}
          </h2>

          {/* 3-Column Product Grid */}
          {visibleItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 sm:gap-y-16">
              {visibleItems.map((item) => (
                <article
                  key={item.id}
                  className="w-full max-w-[292px] mx-auto border border-[#7edc86] rounded-[22px] px-7 py-5 text-center bg-transparent transition-all duration-150 hover:shadow-lg hover:-translate-y-0.5 flex flex-col items-center"
                >
                  <div className="w-[236px] max-w-full h-[198px] rounded-[8px] overflow-hidden bg-white border border-[#dcdcdc] flex items-center justify-center">
                    {!failedImages[item.id] ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                        }
                        className={`w-full h-full block ${
                          item.contain ? 'object-contain' : 'object-cover'
                        }`}
                      />
                    ) : (
                      <span className="text-6xl" aria-hidden="true">
                        {item.emoji}
                      </span>
                    )}
                  </div>

                  <h3 className="text-[25px] text-[#0b5a14] leading-tight mt-2">
                    {item.name}
                  </h3>
                  <p className="text-[24px] text-[#0b5a14] leading-snug tabular-nums">
                    P {formatMoney(item.price)}
                  </p>

                  <button
                    type="button"
                    onClick={() => onAddToCart(item)}
                    className="w-full h-[36px] mt-3 rounded-full border border-[#0b5a14] bg-[#b8f8b8] hover:bg-[#9bf09b] text-[#0b5a14] text-[23px] leading-none transition-colors cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4">
              <p className="text-[26px] text-[#0b5a14] mb-4">
                No items match “{searchQuery.trim()}”.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-6 py-2 rounded-full bg-[#04502a] text-white text-[20px] hover:bg-[#0b6b38] transition-colors cursor-pointer"
              >
                Show all menu items
              </button>
            </div>
          )}

          {/* Bottom-right View Cart Button */}
          <div className="mt-12 flex justify-end">
            <button
              type="button"
              onClick={onOpenCart}
              className="inline-flex items-center justify-center gap-3 w-[195px] h-[56px] rounded-[12px] bg-[#04502a] hover:bg-[#0b6b38] text-white text-[24px] transition-colors cursor-pointer shadow-md"
            >
              <span>View Cart</span>
              <ArrowRight className="w-6 h-6" strokeWidth={2} />
            </button>
          </div>
        </div>
      </main>
    </section>
  );
};
