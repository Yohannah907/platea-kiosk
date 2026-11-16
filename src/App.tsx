import { useState } from 'react';
import { INITIAL_BALANCE, MENU_ITEMS } from './data/menuData';
import { AddToCartModal } from './modules/AddToCartModal';
import { BalanceRewardsPage } from './modules/BalanceRewardsPage';
import { LoginPage } from './modules/LoginPage';
import { MenuPage } from './modules/MenuPage';
import { OrderSuccessPage } from './modules/OrderSuccessPage';
import { ViewCartPage } from './modules/ViewCartPage';
import { WelcomePage } from './modules/WelcomePage';
import {
  CartMap,
  MenuItem,
  OrderSummary,
  PaymentMethod,
  ScreenId,
} from './types/kiosk';

export default function App() {
  const [screen, setScreen] = useState<ScreenId>('welcome');
  const [studentId, setStudentId] = useState('');
  const [cart, setCart] = useState<CartMap>({});
  const [lastAddedItem, setLastAddedItem] = useState<MenuItem | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash');
  const [balance, setBalance] = useState<number>(INITIAL_BALANCE);
  const [orderSequence, setOrderSequence] = useState<number>(0);
  const [lastOrder, setLastOrder] = useState<OrderSummary | null>(null);

  const navigateTo = (nextScreen: ScreenId) => {
    setLastAddedItem(null);
    setScreen(nextScreen);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] ?? 0) + 1,
    }));
    setLastAddedItem(item);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      const nextQty = (prev[itemId] ?? 0) + delta;
      if (nextQty <= 0) {
        const { [itemId]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: nextQty };
    });
  };

  const handleConfirmOrder = () => {
    const orderTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
      const item = MENU_ITEMS[id];
      return item ? sum + item.price * qty : sum;
    }, 0);

    if (orderTotal <= 0) return;

    const nextSeq = orderSequence + 1;
    setOrderSequence(nextSeq);
    setLastOrder({
      orderNumber: `#PLT-${String(nextSeq).padStart(3, '0')}`,
      total: orderTotal,
      paymentMethod,
      status: 'Confirmed',
    });

    if (paymentMethod !== 'Cash') {
      setBalance((prev) => Math.max(0, prev - orderTotal));
    }

    setCart({});
    navigateTo('success');
  };

  const handleBackToMenuFromSuccess = () => {
    setCart({});
    navigateTo('menu');
  };

  return (
    <div className="min-h-screen bg-white text-[#0b5a14]">
      {screen === 'welcome' && (
        <WelcomePage onStartOrder={() => navigateTo('login')} />
      )}

      {screen === 'login' && (
        <LoginPage
          initialStudentId={studentId}
          onBack={() => navigateTo('welcome')}
          onContinue={(enteredId) => {
            setStudentId(enteredId);
            navigateTo('menu');
          }}
        />
      )}

      {screen === 'menu' && (
        <>
          <MenuPage
            studentId={studentId}
            cartCount={cartCount}
            onAddToCart={handleAddToCart}
            onOpenCart={() => navigateTo('cart')}
            onOpenBalance={() => navigateTo('balance')}
            onBackToWelcome={() => navigateTo('welcome')}
          />
          <AddToCartModal
            item={lastAddedItem}
            onContinueShopping={() => setLastAddedItem(null)}
            onViewCart={() => navigateTo('cart')}
          />
        </>
      )}

      {screen === 'cart' && (
        <ViewCartPage
          cart={cart}
          paymentMethod={paymentMethod}
          onUpdateQuantity={handleUpdateQuantity}
          onSelectPayment={setPaymentMethod}
          onConfirmOrder={handleConfirmOrder}
          onBackToMenu={() => navigateTo('menu')}
        />
      )}

      {screen === 'balance' && (
        <BalanceRewardsPage
          balance={balance}
          selectedPayment={paymentMethod}
          onSelectPayment={setPaymentMethod}
          onBackToMenu={() => navigateTo('menu')}
        />
      )}

      {screen === 'success' && (
        <OrderSuccessPage
          order={lastOrder}
          onBackToMenu={handleBackToMenuFromSuccess}
        />
      )}
    </div>
  );
}
