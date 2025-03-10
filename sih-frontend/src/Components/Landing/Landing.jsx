
import React from 'react';
import Navbar from './Component/Navbar';
import HeroSection from './Component/HeroSection';
import AboutSection from './Component/AboutSection';
import ContactSection from './Component/ContactSection';

const Landing = () => (
  <div className='landing-main'>
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ContactSection />
  </div>
);

export default Landing;
