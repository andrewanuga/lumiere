# 📷 Lumiere | Minimalist Photography Portfolio

**Lumiere** is a high-end, cinematic digital portfolio designed for photography studios and visual artists. Built with **Next.js 14** and **GSAP**, it focuses on the "untranslatable feeling of a moment held forever" through sophisticated animations, 3D interactions, and a luxury "Dark Mode" aesthetic.

---

## ✨ Features

### 1. **Cinematic Motion Design**
* **Split-Text Reveal:** Headlines animate character-by-character using GSAP for a high-fashion editorial feel.
* **Parallax Scroll:** Imagery reacts to the user's scroll depth, creating a sense of physical space.
* **Entrance Staggers:** Content fades and slides into view using optimized Bezier easing (`expo.out`).

### 2. **Immersive Interactions**
* **3D Tilt Gallery:** Featured work cards use a custom mouse-tracking algorithm to tilt in 3D space, responding to the user's cursor.
* **Ambient UI:** Subtle radial glows and a fine-mesh grid background simulate a darkroom environment.

### 3. **Performance First**
* **Next.js App Router:** Utilizing the latest React features for speed and SEO.
* **Dynamic GSAP Loading:** Animation libraries are loaded on the client side to prevent blocking the initial page paint.
* **Fluid Typography:** Uses CSS `clamp()` to ensure headlines look massive on desktops but remain readable on mobile.

---

## 🛠️ Technical Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Animations** | [GSAP](https://greensock.com/gsap/) & ScrollTrigger |
| **Styling** | CSS Modules & CSS Variables (Theming) |
| **Images** | [Next/Image](https://nextjs.org/docs/basic-features/image-optimization) (Optimized) |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/andrewanuga/lumiere.git](https://github.com/andrewanuga/lumiere.git)

cd lumiere

npm install
# or
yarn install

npm run dev

npm run build
npm start

---

Made with ❤️ by Andrew