import React from "react";
import { Link } from "react-router-dom";

import "./Hero.css";

export default function Hero({
  title,
  subtitle,
  image,
  ctaLink,
  ctaText,
  ...rest
}) {
  return (
    <div className="hero" {...rest}>
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <h2 className="hero-subtitle">{subtitle}</h2>
        <Link to={ctaLink}>
          <button className="hero-button">{ctaText}</button>
        </Link>
      </div>
      {/* <div className="hero-image">
        <img src={image} alt="Hero" />
      </div> */}
    </div>
  );
}

Hero.defaultProps = {
  title: "React landing page",
  subtitle:
    "This is the subheader section where you describe the basic benefits of your product",
  //image: "https://source.unsplash.com/collection/404339/800x600",
  ctaText: "Create your account now",
  ctaLink: "/register",
};
