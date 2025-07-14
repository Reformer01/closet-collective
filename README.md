# Fashion E-commerce Store

A modern, responsive fashion e-commerce application built with React, Vite, and Tailwind CSS, featuring a comprehensive set of functionalities for a seamless shopping experience.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Running the Project](#running-the-project)
-   [Building for Production](#building-for-production)
-   [Performance Optimizations](#performance-optimizations)
-   [Getting Started with Development (For Contributors)](#getting-started-with-development-for-contributors)

## Features

This project includes a wide range of features designed to provide a rich e-commerce experience:

-   **Product Catalog:** Browse products by category (Women, Men, Accessories, Sale).
-   **Product Details:** View detailed product information, including descriptions, prices, available sizes, and colors.
-   **Shopping Cart:** Add, remove, and update quantities of items in the cart.
-   **Checkout Process:**
    -   Comprehensive checkout form for shipping information.
    -   Simulated payment gateway integration.
    -   Discount code application functionality.
-   **User Authentication (Placeholder):**
    -   Basic login and registration system.
    -   Manages simulated authentication state for logged-in users.
-   **Search Functionality:**
    -   Integrated search bar in the navigation.
    -   Dedicated search results page to display filtered products.
-   **Advanced Product Filtering & Sorting:**
    -   Filter products by size, color, and price range on category pages.
    -   Sort products by price (low to high, high to low).
-   **Product Reviews & Ratings:**
    -   View customer reviews and star ratings on product detail pages.
    -   Submit new reviews with a rating, comment, and author.
-   **Wishlist:**
    -   Add and remove products from a personal wishlist.
    -   Dedicated wishlist page to manage saved items.
-   **Recently Viewed Products:**
    -   A section on the homepage displaying products the user has recently viewed.
-   **Social Media Sharing:**
    -   Share product details on Facebook and Twitter directly from product pages.
-   **Responsive Design:** Optimized for a seamless experience across various devices (mobile, tablet, desktop).
-   **Custom Cursor:** An interactive custom cursor for enhanced user experience.
-   **Themed Design:** Utilizes a modern and appealing color palette (`Rosy Brown`, `Pine Green`, `Midnight Green`) for a cohesive brand identity.

## Technologies Used

This project leverages the following key technologies and libraries:

-   **React:** A JavaScript library for building user interfaces.
-   **Vite:** A fast build tool that provides a lightning-fast development experience.
-   **TypeScript:** A superset of JavaScript that adds static typing.
-   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
-   **Shadcn/UI:** A collection of reusable components built with Radix UI and Tailwind CSS.
-   **React Router:** For declarative routing within the application.
-   **Lucide React:** A collection of beautiful and customizable open-source icons.
-   **Zod:** A TypeScript-first schema declaration and validation library (used indirectly via `@hookform/resolvers`).
-   **Class Variance Authority (cva):** For composing Tailwind CSS classes based on component variants.
-   **Local Storage:** Used for client-side persistence of cart, wishlist, and recently viewed items (for demonstration purposes, a real application would use a backend database).

## Installation

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/fashion-ecommerce-store.git
    cd fashion-ecommerce-store
    ```
    *(Replace `your-username/fashion-ecommerce-store.git` with the actual repository URL)*

2.  **Install dependencies:**
    Choose your preferred package manager:
    ```bash
    # Using npm
    npm install

    # Using yarn
    yarn install

    # Using bun
    bun install
    ```

## Running the Project

To start the development server:

```bash
npm run dev
# or
yarn dev
# or
bun dev

