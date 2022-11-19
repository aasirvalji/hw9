import React from 'react';
import '../misc/Home.css';

function Home() {
  return (
    <>
      <div class='hero' id='home'>
        <div class='hero__container'>
          <h1 class='hero__heading'>
            Prescription at <span>ease</span>
          </h1>
          <p class='hero__description'>Medical systems you can rely on</p>
          {/* <button class='main__btn'>
            <a href='#'>Explore</a>
          </button> */}
        </div>
      </div>

      <div class='main' id='about'>
        <div class='main__container'>
          <div class='main__img--container'>
            <div class='main__img--card'>
              <i class='fa-solid fa-tablets'></i>
            </div>
          </div>
          <div class='main__content'>
            <h1>What do we do?</h1>
            <h2>We help families care for their elders</h2>
            <p>Contact us to learn more about our plans</p>
          </div>
        </div>
      </div>

      <div class='services' id='services'>
        <h1>Our Services</h1>
        <div class='services__wrapper'>
          <div class='services__card'>
            <h2>Intelligent Prescriptions</h2>
            <p>
              We create prescription orders on your behalf when you're all out
            </p>
          </div>
          <div class='services__card'>
            <h2>Medication reminders</h2>
            <p>
              We remind you to take your medicines at the right times with the
              right amounts
            </p>
          </div>
          <div class='services__card'>
            <h2>Doctor Contact</h2>
            <p>We connect you with your private doctor at a moments notice</p>
          </div>
        </div>
      </div>

      <div class='main' id='sign-up'>
        <div class='main__container'>
          <div class='main__content'>
            <h1>Join PLACEHOLDER</h1>
            <h2>Sign Up Today</h2>
            <p>See what makes us different</p>
          </div>
          <div class='main__img--container'>
            <div class='main__img--card' id='card-2'>
              <i class='fa-solid fa-heart-pulse'></i>
            </div>
          </div>
        </div>
      </div>

      <div class='footer__container'>
        <section class='social__media'>
          <div class='social__media--wrap'>
            <div class='footer__logo'>
              <a href='/' id='footer__logo'>
                PLACEHOLDER
              </a>
            </div>
            <p class='website__rights'>
              © PLACEHOLDER 2020. All rights reserved
            </p>
            <div class='social__icons'>
              <a
                href='http://www.facebook.com'
                class='social__icon--link'
                target='_blank'
                rel='noopener noreferrer'
              >
                <i class='fab fa-facebook'></i>
              </a>
              <a
                href='http://www.instagram.com'
                class='social__icon--link'
                target='_blank'
                rel='noopener noreferrer'
              >
                <i class='fab fa-instagram'></i>
              </a>
              <a
                href='http://www.youtube.com'
                class='social__icon--link'
                target='_blank'
                rel='noopener noreferrer'
              >
                <i class='fab fa-youtube'></i>
              </a>
              <a
                href='http://www.linkedin.com'
                class='social__icon--link'
                target='_blank'
                rel='noopener noreferrer'
              >
                <i class='fab fa-linkedin'></i>
              </a>
              <a
                href='http://www.twitter.com'
                class='social__icon--link'
                target='_blank'
                rel='noopener noreferrer'
              >
                <i class='fab fa-twitter'></i>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
