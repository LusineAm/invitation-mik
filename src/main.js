import './style.css'
import { languages } from './data.js';

const getImageUrl = (name) => {
  return new URL(`./img/${name}`, import.meta.url).href;
}

const urlParams = new URLSearchParams(window.location.search);
const langParam = urlParams.get('lang');
const validLang = langParam === 'ru' || langParam === 'am' ? langParam : null;
let currentLang = validLang || localStorage.getItem('invitationLang') || 'am';

const renderContent = () => {
  const lang = languages[currentLang];

  document.querySelector('#app').innerHTML = `
    <div class="invitation-container">
      <div class="language-selector">
        <button id="langToggle" class="lang-btn">${lang.langButton}</button>
      </div>

      <div class="invitation-header">
        <div class="header-decoration"></div>
        <h1 class="elegant-title">${lang.title}</h1>
        <h2 class="subtitle">${lang.subtitle}</h2>
        <div class="header-decoration"></div>
      </div>
      <div class="photo-gallery">
        <div class="photo-row">
          <div class="image-container">
            <img src="${getImageUrl('mik-3.JPG')}" alt="Mikael's Photo 1" class="invitation-image">
          </div>
          <div class="photo-description">
            <h3 class="description-title">${lang.baptism}</h3>
          </div>
        </div>

        <div class="photo-row reverse">
          <div class="image-container">
            <img src="${getImageUrl('mik-2.JPG')}" alt="Mikael's Photo 2" class="invitation-image">
          </div>
          <div class="photo-description">
            <h3 class="description-title">${lang.birthday}</h3>
          </div>
        </div>

        <div class="photo-row">
          <div class="image-container">
            <img src="${getImageUrl('mik-1.JPG')}" alt="Mikael's Photo 3" class="invitation-image">
          </div>
          <div class="photo-description">
              <div class="detail-text">
                <p class="date-text">${lang.date}</p>
              </div>
              <div class="detail-text">
                <h3 class="venue-name">${lang.church}</h3>
                <p class="time-text">${lang.churchTime}</p>
              </div>
              <div class="detail-text">
                <h3 class="venue-name">${lang.restaurant}</h3>
                <p class="time-text">${lang.restaurantTime}</p>
              </div>
            </div>
        </div>
      </div>
      <div class="invitation-footer">
        <div class="footer-decoration"></div>
        <p class="rsvp">${lang.rsvp}</p>
        <p class="rsvp">${lang.parents}</p>
        <div class="footer-decoration"></div>
      </div>
    </div>
  `;

  document.getElementById('langToggle').addEventListener('click', toggleLanguage);
};

const toggleLanguage = () => {
  currentLang = currentLang === 'am' ? 'ru' : 'am';

  localStorage.setItem('invitationLang', currentLang);

  const url = new URL(window.location);
  url.searchParams.set('lang', currentLang);
  window.history.pushState({}, '', url);

  const existingIndicator = document.querySelector('.lang-indicator');
  if (existingIndicator) {
    document.body.removeChild(existingIndicator);
  }

  const existingLinkBtn = document.querySelector('.link-btn');
  if (existingLinkBtn) {
    document.body.removeChild(existingLinkBtn);
  }

  renderContent();

};

renderContent();
