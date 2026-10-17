"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import {
  LuArrowRight,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuMenu,
  LuPackage,
  LuSearch,
  LuShieldCheck,
  LuShoppingBag,
  LuTruck,
  LuUserRound,
  LuX,
} from "react-icons/lu";
import { bestSellers, featuredProducts, money, type Product } from "../data/products";

function Stars() {
  return (
    <span className="stars" aria-label="Rated 4 out of 5">
      <span aria-hidden="true">★★★★</span><span className="star-empty" aria-hidden="true">★</span>
    </span>
  );
}

function ProductTile({
  product,
  onAdd,
  compact = false,
}: {
  product: Product;
  onAdd: (product: Product) => void;
  compact?: boolean;
}) {
  return (
    <article className={`product-tile${compact ? " compact" : ""}`}>
      <div className="product-image">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={compact ? "(max-width: 1024px) 45vw, 22vw" : "(max-width: 1024px) 45vw, 24vw"}
          className="product-photo"
        />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button
          className="quick-add"
          aria-label={`Add ${product.name} to bag`}
          onClick={() => onAdd(product)}
        >
          +
        </button>
      </div>
      <div className="product-meta">
        <h3>{product.name}</h3>
        <Stars />
        <p>{money(product.price)}</p>
      </div>
    </article>
  );
}

const navItems = [
  { label: "HOME", chevron: true, href: "#top" },
  { label: "MEN", chevron: true, href: "#featured" },
  { label: "WOMEN", chevron: true, href: "#featured" },
  { label: "NEW ARRIVALS", chevron: false, href: "#featured" },
  { label: "BRANDS", chevron: true, href: "#bestsellers" },
  { label: "SALE", chevron: false, href: "#bestsellers" },
  { label: "JOURNAL", chevron: false, href: "#community" },
];

export default function Storefront() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeBest, setActiveBest] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const carouselProducts = bestSellers.slice(0, 4);

  function addToBag(_product?: Product) {
    setCartCount((count) => count + 1);
    setCartOpen(true);
  }

  return (
    <main>
      <header className="site-header">
        <div className="header-top">
          <div className="social-strip" aria-label="Social links">
            <a href="#community" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#community" aria-label="X"><FaXTwitter /></a>
            <a href="#community" aria-label="Instagram"><FaInstagram /></a>
            <a href="#community" aria-label="YouTube"><FaYoutube /></a>
            <a href="#community" aria-label="Pinterest"><FaPinterestP /></a>
          </div>
          <a className="brand" href="#top" aria-label="Stryde home">STRYDE</a>
          <div className="header-tools">
            <button aria-label="Search" onClick={() => setSearchOpen((open) => !open)}><LuSearch /></button>
            <button aria-label="Account"><LuUserRound /></button>
            <button
              className="bag-button"
              aria-label={`Shopping bag, ${cartCount} items`}
              onClick={() => setCartOpen((open) => !open)}
            >
              <LuShoppingBag />
              <span>{cartCount}</span>
            </button>
            <button
              className="mobile-menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <LuX /> : <LuMenu />}
            </button>
          </div>
        </div>
        <nav className={`main-nav${menuOpen ? " open" : ""}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}{item.chevron && <LuChevronDown aria-hidden="true" />}
            </a>
          ))}
        </nav>
        {searchOpen && (
          <form className="search-panel" onSubmit={(event) => event.preventDefault()}>
            <LuSearch aria-hidden="true" />
            <input autoFocus placeholder="Search footwear" aria-label="Search footwear" />
            <button type="button" onClick={() => setSearchOpen(false)}>Close</button>
          </form>
        )}
        {cartOpen && (
          <aside className="cart-popover" aria-live="polite">
            <button className="cart-close" onClick={() => setCartOpen(false)} aria-label="Close bag"><LuX /></button>
            <strong>Your bag</strong>
            <p>{cartCount ? `${cartCount} ${cartCount === 1 ? "item" : "items"} added` : "Your bag is currently empty."}</p>
            <a href="#featured" onClick={() => setCartOpen(false)}>Continue shopping <span>→</span></a>
          </aside>
        )}
      </header>

      <section className="hero" id="top">
        <div className="hero-word" aria-hidden="true">FOOTWEAR</div>
        <Image
          className="hero-shoe"
          src="/hero-sneaker-v2.png"
          alt="White, silver and black retro air-cushion running sneaker"
          width={1194}
          height={1317}
          priority
          sizes="(max-width: 760px) 90vw, 48vw"
        />
        <p className="hero-brand">STRYDE</p>
        <div className="hero-copy"><span>NEW COLLECTION</span><span>FOR SUMMER</span></div>
        <a className="hero-cta" href="#featured">
          <span className="circle-arrow"><LuArrowRight aria-hidden="true" /></span>
          <span>STEP INTO<br />A BRIGHTER<br />SEASON</span>
        </a>
      </section>

      <section className="catalog-section featured-section" id="featured">
        <div className="section-heading">
          <span className="section-ghost" aria-hidden="true">FOOTWEAR</span>
          <div><h2>featured</h2><p>PRODUCTS</p></div>
        </div>
        <div className="featured-grid">
          {featuredProducts.map((product) => <ProductTile key={product.name} product={product} onAdd={addToBag} />)}
        </div>
      </section>

      <section className="catalog-section bestseller-section" id="bestsellers">
        <div className="section-heading">
          <span className="section-ghost" aria-hidden="true">BEST SELLER</span>
          <div><h2>best seller</h2><p>PRODUCTS</p></div>
        </div>
        <div className="bestseller-layout">
          <div className="featured-best">
            <div className="best-image">
              <Image
                src={carouselProducts[activeBest].image}
                alt={carouselProducts[activeBest].name}
                fill
                sizes="(max-width: 1024px) 90vw, 48vw"
                className="best-photo"
              />
              <span className="product-badge">BEST SELLER</span>
              <button className="slide-arrow previous" aria-label="Previous best seller" onClick={() => setActiveBest((activeBest + carouselProducts.length - 1) % carouselProducts.length)}><LuChevronLeft /></button>
              <button className="slide-arrow next" aria-label="Next best seller" onClick={() => setActiveBest((activeBest + 1) % carouselProducts.length)}><LuChevronRight /></button>
            </div>
            <div className="best-caption">
              <h3>{carouselProducts[activeBest].name}</h3>
              <Stars />
              <p>{money(carouselProducts[activeBest].price)}</p>
            </div>
            <div className="slider-dots" aria-label="Choose featured product">
              {[0, 1, 2, 3].map((item) => (
                <button key={item} aria-label={`Show product ${item + 1}`} className={activeBest === item ? "active" : ""} onClick={() => setActiveBest(item)} />
              ))}
            </div>
            <button className="best-quick-add" onClick={() => addToBag(carouselProducts[activeBest])}>ADD TO BAG <span>+</span></button>
          </div>
          <div className="bestseller-grid">
            {bestSellers.slice(1).map((product) => <ProductTile key={product.name} compact product={product} onAdd={addToBag} />)}
          </div>
        </div>
        <a href="#featured" className="all-products">VIEW ALL PRODUCTS <LuArrowRight aria-hidden="true" /></a>
      </section>

      <section className="promises" aria-label="Shopping benefits">
        <div><LuTruck aria-hidden="true" /><p>FREE SHIPPING<br /><span>OVER $100</span></p></div>
        <i aria-hidden="true" />
        <div><LuPackage aria-hidden="true" /><p>EASY RETURNS<br /><span>WITHIN 30 DAYS</span></p></div>
        <i aria-hidden="true" />
        <div><LuShieldCheck aria-hidden="true" /><p>AUTHENTIC PRODUCTS<br /><span>GUARANTEED</span></p></div>
      </section>

      <footer className="site-footer" id="community">
        <div className="footer-branding">
          <a className="footer-logo" href="#top">STRYDE</a>
          <p>FOOTWEAR FOR A BRIGHTER TOMORROW</p>
          <small>© 2024 STRYDE. All rights reserved.</small>
        </div>
        <div className="footer-column"><h3>SHOP</h3><a href="#featured">Men</a><a href="#featured">Women</a><a href="#featured">New Arrivals</a><a href="#bestsellers">Sale</a></div>
        <div className="footer-column"><h3>SUPPORT</h3><a href="#community">FAQs</a><a href="#community">Shipping</a><a href="#community">Returns</a><a href="#community">Size Guide</a></div>
        <div className="footer-column"><h3>COMPANY</h3><a href="#community">About Us</a><a href="#community">Careers</a><a href="#community">Journal</a><a href="#community">Contact</a></div>
        <div className="footer-community">
          <h3>JOIN OUR COMMUNITY</h3>
          <form className="subscribe-form" onSubmit={(event) => { event.preventDefault(); if (email.includes("@")) setSubscribed(true); }}>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Your email address" aria-label="Your email address" required />
            <button aria-label="Subscribe" type="submit"><LuArrowRight /></button>
          </form>
          {subscribed && <p className="subscribe-success">Thanks for joining us.</p>}
          <div className="footer-social" aria-label="Social links">
            <a href="#community" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#community" aria-label="Instagram"><FaInstagram /></a>
            <a href="#community" aria-label="YouTube"><FaYoutube /></a>
            <a href="#community" aria-label="TikTok"><FaTiktok /></a>
            <a href="#community" aria-label="Pinterest"><FaPinterestP /></a>
            <a href="#community" aria-label="X"><FaXTwitter /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
