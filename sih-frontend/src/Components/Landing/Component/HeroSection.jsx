import React from 'react';
import './HeroSection.css';
import { Player } from '@lottiefiles/react-lottie-player';

const HeroSection = () => (
  <section className="landing-hero-section-class" id="home">
    <div className="landing-hero-section-class-text">
      <h1>Unlock Your Voice, Embrace Communication</h1>
      <p>
      Supporting your journey to clear, confident communication. Our speech therapy experts provide compassionate, tailored services to help you or your loved one improve speech, language, and social communication skills.      </p>
      <a href="/Auth" className="landing-hero-section-class-btn">
        Get Started
      </a>
    </div>
    <div className="landing-hero-section-class-image">
      <Player 
        autoplay
        loop
        src = "https://lottie.host/24a52bc0-e07d-4ab9-832f-0ed445a25215/JkMK094rwz.json"
        style={{ height: '500px', width: '500px' }} />
    </div>
  </section>
);

export default HeroSection;
