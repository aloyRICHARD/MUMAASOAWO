# MUMAASO-AWO

Premium streetwear e-commerce storefront for **MUMAASO-AWO**, a Kampala fashion label. Built for customers in Uganda, with prices in UGX and ordering by WhatsApp or mobile money.

> **Status:** frontend prototype. Payments are simulated, and product prices, stock and fabric details are placeholders.

## Features

- **Pages:** Home, Shop, Men, Women, New Arrivals, Product, Cart, Checkout, Order confirmation, Account, Wishlist, About
- **Shopping:** search, price/size/colour filters, sorting, size selection, quantity, coupon code
- **Persistence:** cart, wishlist, orders and theme are saved in `localStorage`
- **Ordering:** WhatsApp order buttons with a pre-filled message (product page, cart, floating button)
- **Checkout:** Ugandan phone validation, MTN Mobile Money and Airtel Money selection, payment states (awaiting, sent, processing, successful, failed, cancelled, retry)
- **Design:** black / ivory / lime tokens, glass surfaces on the header, menus and overlays, hover "pop" animation on product cards, homepage lookbook video
- **Themes:** light, dark and system, with a paper texture in light mode and a halftone background in dark mode
- **Accessibility:** keyboard focus styles, ARIA labels, `prefers-reduced-motion` respected

## Tech stack

React 18, Vite, TypeScript, Tailwind CSS 3, React Router 6, Lucide React

## Getting started

Requires **Node.js 18 or higher**.

```bash
npm install
npm run dev
```

Open the address Vite prints, normally `http://localhost:5173`. Opening `index.html` directly will not work.

```bash
npm run build     # type-check and build to dist/
npm run preview   # serve the production build
```

## Project structure

```
public/
  images/products/   Product photos (WebP), grouped by product
  video/             Lookbook video (MP4 + WebM) and poster
src/
  components/        Layout, ProductCard, Lookbook
  pages/             One file per route
  context/           Store (cart, wishlist, orders) and Theme
  services/payments/ Payment provider interface and simulator
  data/              products.json and typed accessors
  types/             Product, cart, order and payment types
  utils/             UGX formatting, phone validation, WhatsApp links
```

## Configuration

| What | Where |
|---|---|
| Products, prices, stock | `src/data/products.json` |
| WhatsApp number | `WA` in `src/utils/format.ts` |
| Delivery fee and free-delivery threshold | `DELIVERY`, `FREE_OVER` in `src/utils/format.ts` |
| Coupon (`WELCOME10`, 10% off) | `src/context/Store.tsx` |
| Colour tokens | `tailwind.config.js` and `src/index.css` |

To add a product, add its photos under `public/images/products/<slug>/` and a matching entry in `products.json`.

## Payments

Payments are **simulated** and never contact MTN or Airtel.

- `src/services/payments/provider.ts` defines a `PaymentProvider` interface and a development simulator.
- The simulator never returns a `confirmed` result. Test orders are labelled "simulated" on the confirmation page and in the account.
- Numbers ending in `0` simulate a failed payment.
- Before launch, implement real MTN MoMo and Airtel Money adapters behind that interface. A `confirmed` status must come only from a trusted server-side callback, which needs a backend. Merchant keys must never be stored in the frontend.

## Roadmap

- Backend for real accounts, orders and payment confirmation
- Real prices, stock, size guide and brand copy
- Quick-view panel, filter drawer, page transitions
- More products and product photography

## Contact

Orders and enquiries: WhatsApp [+256 772 122 695](https://wa.me/256772122695)

## License

No license has been chosen yet. All rights reserved by the owner until one is added.
