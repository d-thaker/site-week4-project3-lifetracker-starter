import React from "react";
import "./Home.css";
import Hero from "../Hero/Hero";
import trackerImage from "../../assets/tracker.jpg";
import FeedTiles from "../FeedTiles/FeedTiles";

export default function Home() {
  return (
    <div className="home-container">
      <Hero
        title="LifeTracker"
        subtitle="Helping you take back control of your world."
        ctaText="Create your account now"
        ctaLink="/register"
      />
      <div
        className="hero-image"
        style={{ backgroundImage: `url(${trackerImage})` }}
      ></div>
      <FeedTiles />
    </div>
  );
}
