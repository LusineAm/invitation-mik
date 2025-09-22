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
        <img src="${getImageUrl('pigeon.png')}" alt="Photo 1" class="pigeon">
        <h1 class="elegant-title">${lang.title}</h1>
        <h2 class="subtitle">${lang.subtitle}</h2>
        <div class="header-decoration"></div>
      </div>
      <div class="photo-gallery">
        <div class="photo-row">
          <div class="image-container">
            <img src="${getImageUrl('2.jpg')}" alt="Mikael's Photo 1" class="invitation-image">
          </div>
          <div class="photo-description">
            <h3 class="description-title">${lang.baptism}</h3>
          </div>
        </div>

        <div class="photo-row reverse">
          <div class="image-container">
            <img src="${getImageUrl('1.jpg')}" alt="Mikael's Photo 2" class="invitation-image">
          </div>
          <div class="photo-description">
            <h3 class="description-title">${lang.birthday}</h3>
          </div>
        </div>
        <h2 class="subtitle">${lang.date}</h2>

        <div class="photo-row">
          <div class="image-container">
            <img src="${getImageUrl('gayane.jpg')}" alt="st gayane church" class="invitation-image">
          </div>
          <div class="photo-description">
             
              <div class="detail-text">
                <h2 class="time-text">${lang.churchTime}</h2>
                <h3 class="venue-name">${lang.church}</h3>
              </div>
            </div>
        </div>
        <div class="photo-row reverse">
           <div class="image-container">
            <img src="${getImageUrl('liana.jpg')}" alt="lianna garden" class="invitation-image">
          </div>
          <div class="photo-description">
              <div class="detail-text">
                <h2 class="time-text">${lang.restaurantTime}</h2>
                <h3 class="venue-name">${lang.restaurant}</h3>
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
