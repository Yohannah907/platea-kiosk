# Platea – Campus Food-Ordering Kiosk

A modular self-service campus food-ordering kiosk interface built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**.

## Features & Modules

Each screen and flow in the ordering journey is organized into its own module under `src/modules/`:

1. **Welcome Page** (`src/modules/WelcomePage.tsx`) – Brand introduction and **Start Your Order** entry point.
2. **Login Page** (`src/modules/LoginPage.tsx`) – Student ID entry with validation and guest access option.
3. **Menu** (`src/modules/MenuPage.tsx`) – Live keyword search, 5 category filters (*All Items*, *Meals*, *Snacks*, *Desserts*, *Drinks*), product cards, and cart counter.
4. **Add to Cart Confirmation** (`src/modules/AddToCartModal.tsx`) – Confirmation modal with **Continue Shopping** and **View Cart** actions.
5. **View the Cart** (`src/modules/ViewCartPage.tsx`) – Itemized order review with quantity steppers, live subtotal/total calculation, payment method selector, and **Confirm Order**.
6. **Balance & Rewards** (`src/modules/BalanceRewardsPage.tsx`) – Available balance display and payment method selection (*Cash*, *GCash*, *PayMaya*).
7. **Order Success** (`src/modules/OrderSuccessPage.tsx`) – Order confirmation summary with sequential order number, total, payment method, and **Confirmed** status.

## Project Structure

```text
public/
  images/                  # Menu item and welcome hero imagery
src/
  components/
    PlateaLogo.tsx         # Shared brand wordmark and back navigation control
  data/
    menuData.ts            # Menu catalog, categories, search keywords, and helpers
  modules/
    WelcomePage.tsx
    LoginPage.tsx
    MenuPage.tsx
    AddToCartModal.tsx
    ViewCartPage.tsx
    BalanceRewardsPage.tsx
    OrderSuccessPage.tsx
  types/
    kiosk.ts               # Shared TypeScript interfaces
  App.tsx                  # Root kiosk state and screen navigation
  index.css                # Tailwind CSS and theme styles
  main.tsx
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation & Local Development

```bash
npm install
npm run dev
```

The app runs on `http://localhost:3000`.

### Scripts

- `npm run dev` – Start the Vite development server
- `npm run build` – Build production assets into `dist/`
- `npm run preview` – Preview the production build locally
- `npm run lint` – Run TypeScript type-checking (`tsc --noEmit`)
