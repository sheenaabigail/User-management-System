import React from 'react';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <div className='landing-about-main-div' id="about">
      <h1>About Us</h1>
      <section className="landing-about-section-class-section">
        <div className="landing-about-section-class-image">
          <img 
            src="https://www.homage.sg/wp-content/uploads/2021/03/bigstock-Child-Training-Basic-Language-408859919-1536x1024.jpg" 
            alt="About Us" 
          />
        </div>
        <div className="landing-about-section-class-content">
          <h2>Why Choose Us?</h2>
          <p>
            At VoiceLift, we believe in empowering individuals of all ages to overcome communication barriers. Our therapists bring years of expertise and a commitment to creating a comfortable, nurturing environment where everyone can thrive.
          </p>
          <h2>Benefits of Our Services:</h2>
          <ul>
            <li>Customized therapy plans</li>
            <li>Evidence-based practices</li>
            <li>Support for both children and adults</li>
            <li>One-on-one and group sessions available</li>
          </ul>
          <div className="button-container">
            <a 
              href="https://example.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="landing-about-section-class-btn">
              Know More
            </a>
            <button 
              onClick={() => alert('Button Clicked!')} 
              className="landing-about-section-class-btn">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutSection;
