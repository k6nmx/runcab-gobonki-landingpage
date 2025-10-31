# Gobonki - Modern Landing Page

This repository contains the source code for the Gobonki landing page, a modern, responsive, and highly interactive web application built with Next.js and TypeScript.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-repo%2Fgencraft-gobonki-landingpage)

**Live Demo:** [https://gobonki.com](https://gobonki.com) (placeholder)

---

## ✨ Key Features

This project showcases a variety of modern web development features:

*   **Dual-Mode Content:** A unique feature that dynamically tailors the content for two different audiences ("customers" and "businesses") using a sleek toggle switch.
*   **Internationalization (i18n):** Fully localized into 7 languages (English, German, Spanish, Hindi, Turkish, Vietnamese, and Chinese) using `next-intl`.
*   **Interactive UI:** Smooth animations and transitions powered by Framer Motion.
*   **Responsive Design:** A mobile-first approach ensuring a seamless experience on all devices, from desktops to smartphones.
*   **Component-Based Architecture:** Built with a well-structured and reusable set of React components.
*   **Smooth Scrolling:** Hash-based navigation that smoothly scrolls to different sections of the page.
*   **Modern Tech Stack:** Utilizes the latest features of Next.js (App Router), TypeScript, and Tailwind CSS.
*   **Cookie Consent Banner:** A non-intrusive cookie consent mechanism.
*   **Newsletter & Contact Forms:** Integrated forms for user engagement.

---

## 🚀 Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/)
*   **ORM:** [Drizzle ORM](https://orm.drizzle.team/) (for database interactions)
*   **Linting/Formatting:** ESLint, Prettier

---

## 🏁 Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm, yarn, or pnpm

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/gencraft-gobonki-landingpage.git
    cd gencraft-gobonki-landingpage
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project by copying the example file:
    ```bash
    cp .env.example .env.local
    ```
    Update the variables in `.env.local` as needed.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result. The page will auto-update as you edit the source files.

### Local Git Hooks

This repo uses [Husky](https://typicode.github.io/husky/) to enforce local Git hooks. After installing dependencies, Husky installs automatically. Before pushing, a `pre-push` hook runs `npm run build` to ensure that the project builds successfully.

---

## 📂 Project Structure

The project follows a feature-colocated structure, making it easy to navigate and maintain.

```
.
├── src
│   ├── app                 # Next.js App Router pages and layouts
│   │   ├── [locale]        # Internationalized routes
│   │   └── api             # API routes
│   ├── components          # Shared React components
│   │   ├── layout          # Header, Footer, etc.
│   │   ├── sections        # Page sections (Hero, Features, FAQ, etc.)
│   │   └── ui              # Basic UI elements (Button, Card, etc.)
│   ├── context             # React contexts (e.g., ModeContext)
│   ├── hooks               # Custom React hooks
│   ├── i18n                # Internationalization setup
│   ├── lib                 # Utility functions and libraries
│   └── ...
├── messages                # Translation files for each locale
│   ├── en
│   ├── de
│   └── ...
├── public                  # Static assets (images, fonts, etc.)
└── ...
```

---

## 🚢 Deployment

The easiest way to deploy this Next.js application is to use the [Vercel Platform](https://vercel.com/new), from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.