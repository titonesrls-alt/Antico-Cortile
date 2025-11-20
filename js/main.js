document.addEventListener('DOMContentLoaded', () => {
  // i18n dictionary
  const dict = {
    it: {
      'site.title': 'Casa vacanze Antico Cortile',
      'site.subtitle': 'Un angolo di relax nel cuore della città',
      'tabs.structure': 'Struttura',
      'tabs.rooms': 'Stanze',
      'tabs.checkin': 'Check-in',
      'tabs.contacts': 'Contatti',
      'structure.title': 'La nostra struttura',
      'structure.description': "Placeholder: inserisci qui un testo descrittivo della struttura e della città (storia, attrazioni, servizi...)",
      'structure.gallery1': 'Facciata e ingresso',
      'structure.gallery2': 'Hall e aree comuni',
      'structure.gallery3': 'Panorama della città',
      'rooms.title': 'Le nostre camere',
      'rooms.subtitle': 'Seleziona una scheda per visualizzare le foto e i dettagli.',
      'rooms.ciclamino': 'Ciclamino',
      'rooms.ciclaminoDesc': 'Camera matrimoniale con vista.',
      'rooms.gelsomino': 'Gelsomino',
      'rooms.gelsominoDesc': 'Camera doppia confortevole.',
      'contacts.title': 'Contatti',
      'contacts.name': 'Casa Vacanze Antico Cortile',
      'contacts.address1': 'Via Francesco Angileri 32',
      'contacts.address2': '91025 Marsala (TP)',
      'contacts.phoneLabel': '+39 331 232 3632',
      'contacts.emailLabel': 'info@antico-cortile.com',
      'footer.text': 'Casa vacanze Antico Cortile — Tutti i diritti riservati',
      'carousel.prev': 'Immagine precedente',
      'carousel.next': 'Immagine successiva',
      'gallery.empty': 'Nessuna immagine disponibile.'
    },
    en: {
      'site.title': 'Antico Cortile Holiday Home',
      'site.subtitle': 'A relaxing retreat in the heart of the city',
      'tabs.structure': 'Property',
      'tabs.rooms': 'Rooms',
      'tabs.checkin': 'Check-in',
      'tabs.contacts': 'Contacts',
      'structure.title': 'Our property',
      'structure.description': 'Placeholder: add a descriptive text about the property and the city (history, attractions, services...)',
      'structure.gallery1': 'Facade and entrance',
      'structure.gallery2': 'Lobby and common areas',
      'structure.gallery3': 'City panorama',
      'rooms.title': 'Our rooms',
      'rooms.subtitle': 'Select a tab to view photos and details.',
      'rooms.ciclamino': 'Cyclamen',
      'rooms.ciclaminoDesc': 'Double room with a view.',
      'rooms.gelsomino': 'Jasmine',
      'rooms.gelsominoDesc': 'Comfortable twin room.',
      'contacts.title': 'Contacts',
      'contacts.name': 'Antico Cortile Holiday Home',
      'contacts.address1': 'Via Francesco Angileri 32',
      'contacts.address2': '91025 Marsala (TP)',
      'contacts.phoneLabel': '+39 331 232 3632',
      'contacts.emailLabel': 'info@antico-cortile.com',
      'footer.text': 'Antico Cortile Holiday Home — All rights reserved',
      'carousel.prev': 'Previous image',
      'carousel.next': 'Next image',
      'gallery.empty': 'No images available.'
    }
  };

  function applyLang(lang) {
    const strings = dict[lang] || dict.it;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (strings[key] !== undefined) el.textContent = strings[key];
    });
    document.querySelectorAll('.carousel-button.prev').forEach(b => b.setAttribute('aria-label', strings['carousel.prev']));
    document.querySelectorAll('.carousel-button.next').forEach(b => b.setAttribute('aria-label', strings['carousel.next']));
  }

  // language switcher
  const toggle = document.getElementById('lang-toggle');
  const menu = document.getElementById('lang-menu');
  const currentFlag = document.getElementById('current-flag');
  function setCurrentUI(lang) {
    if (currentFlag) currentFlag.textContent = lang === 'en' ? '🇬🇧' : '🇮🇹';
    menu.querySelectorAll('li').forEach(li => li.setAttribute('aria-selected', li.dataset.lang === lang ? 'true' : 'false'));
  }
  toggle?.addEventListener('click', e => { e.stopPropagation(); menu.classList.toggle('open'); toggle.setAttribute('aria-expanded', menu.classList.contains('open')); });
  document.addEventListener('click', () => menu.classList.remove('open'));
  menu?.addEventListener('click', e => { const li = e.target.closest('li'); if (!li) return; const lang = li.dataset.lang; localStorage.setItem('lang', lang); setCurrentUI(lang); applyLang(lang); menu.classList.remove('open'); });
  const savedLang = localStorage.getItem('lang') || 'it'; setCurrentUI(savedLang); applyLang(savedLang);

  // tabs
  const tabs = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');
  function activateTab(btn) { tabs.forEach(t => t.setAttribute('aria-selected', 'false')); panels.forEach(p => p.setAttribute('data-active', 'false')); btn.setAttribute('aria-selected', 'true'); const target = document.getElementById(btn.dataset.target); if (target) target.setAttribute('data-active', 'true'); }
  tabs.forEach(btn => btn.addEventListener('click', () => activateTab(btn)));

  // room selection + carousel
  const roomCards = document.querySelectorAll('.room-card');
  const gallery = document.getElementById('room-gallery');
  const rooms = {
    ciclamino: ['images/rooms/ciclamino-1.jpg','images/rooms/ciclamino-2.jpg','images/rooms/ciclamino-3.jpg'],
    gelsomino: ['images/rooms/gelsomino-1.jpg','images/rooms/gelsomino-2.jpg','images/rooms/gelsomino-3.jpg']
  };
  function showRoom(roomKey, cardEl) {
    roomCards.forEach(c => c.classList.remove('selected')); if (cardEl) cardEl.classList.add('selected'); const imgs = rooms[roomKey] || []; gallery.innerHTML = ''; if (imgs.length === 0) { const p = document.createElement('p'); p.setAttribute('data-i18n', 'gallery.empty'); p.textContent = (document.documentElement.lang === 'en') ? 'No images available.' : 'Nessuna immagine disponibile.'; gallery.appendChild(p); return; }
    let index = 0; const carousel = document.createElement('div'); carousel.className = 'carousel'; carousel.setAttribute('role','region'); carousel.setAttribute('aria-roledescription','carousel'); carousel.setAttribute('tabindex','0');
    const btnPrev = document.createElement('button'); btnPrev.className = 'carousel-button prev'; btnPrev.setAttribute('aria-label', (document.documentElement.lang === 'en') ? 'Previous image' : 'Immagine precedente'); btnPrev.innerHTML = '‹';
    const btnNext = document.createElement('button'); btnNext.className = 'carousel-button next'; btnNext.setAttribute('aria-label', (document.documentElement.lang === 'en') ? 'Next image' : 'Immagine successiva'); btnNext.innerHTML = '›';
    const fig = document.createElement('figure'); const img = document.createElement('img'); img.alt = `${roomKey} foto 1`; img.src = imgs[index]; const caption = document.createElement('figcaption'); caption.textContent = `1 di ${imgs.length}`; fig.appendChild(img); fig.appendChild(caption);
    function update(){ img.src = imgs[index]; img.alt = `${roomKey} foto ${index+1}`; caption.textContent = `${index+1} di ${imgs.length}`; }
    btnPrev.addEventListener('click', ()=>{ index = (index - 1 + imgs.length) % imgs.length; update(); });
    btnNext.addEventListener('click', ()=>{ index = (index + 1) % imgs.length; update(); });
    carousel.addEventListener('keydown', (e)=>{ if(e.key === 'ArrowLeft') { e.preventDefault(); btnPrev.click(); } if(e.key === 'ArrowRight') { e.preventDefault(); btnNext.click(); } });
    carousel.appendChild(btnPrev); carousel.appendChild(fig); carousel.appendChild(btnNext); gallery.appendChild(carousel);
  }
  roomCards.forEach(card=>{ card.addEventListener('click', ()=> showRoom(card.dataset.room, card)); card.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showRoom(card.dataset.room, card); } }); });

  // set year
  const y = new Date().getFullYear(); const yearEl = document.getElementById('year'); if(yearEl) yearEl.textContent = y;

  // --- Check-in form handling (uses EmailJS) ---
  const EMAILJS_SERVICE_ID = 'service_viruqop';
  const EMAILJS_TEMPLATE_ID = 'template_1z5fpgo';
  const EMAILJS_USER_ID = 'kz1z-20a8uOdcEM-L';
  if(window.emailjs && EMAILJS_USER_ID && EMAILJS_USER_ID !== 'YOUR_USER_ID'){ try{ emailjs.init(EMAILJS_USER_ID); }catch(e){ console.warn('EmailJS init failed', e); } }

  const checkinForm = document.getElementById('checkinForm');
  const checkinStatus = document.getElementById('checkinStatus');
  const guestsCountEl = document.getElementById('guestsCount');
  const guestDetailsContainer = document.getElementById('guestDetailsContainer');

  function renderGuestFields(count){
    guestDetailsContainer.innerHTML = '';
    const attachmentsContainer = document.getElementById('attachmentsContainer'); if(attachmentsContainer) attachmentsContainer.innerHTML = '';
    const n = Math.max(1, Math.min(20, Number(count)||1));
    for(let i=1;i<=n;i++){
      const wrapper = document.createElement('div'); wrapper.className = 'guest-row'; wrapper.innerHTML = `\n        <label>Nome ospite ${i}\n          <input type="text" name="guest_${i}_firstname" required>\n        </label>\n        <label>Cognome ospite ${i}\n          <input type="text" name="guest_${i}_lastname" required>\n        </label>\n      `; guestDetailsContainer.appendChild(wrapper);
      if(attachmentsContainer){ const fileRow = document.createElement('div'); fileRow.className = 'guest-file-row'; fileRow.innerHTML = `\n          <label>Documento ospite ${i}\n            <input type="file" name="guest_${i}_id" id="guest_${i}_id" accept="image/*,.pdf" required>\n          </label>\n        `; attachmentsContainer.appendChild(fileRow); }
    }
  }

  // inizializza campi ospiti al caricamento e supporta radio buttons o select
  function getGuestCountValue(){
    const radio = document.querySelector('input[name="guests"]:checked');
    if(radio) return Number(radio.value) || 1;
    if(guestsCountEl && 'value' in guestsCountEl) return Number(guestsCountEl.value) || 1;
    return 1;
  }
  if(guestDetailsContainer){
    renderGuestFields(getGuestCountValue());
    if(guestsCountEl && typeof guestsCountEl.addEventListener === 'function'){
      guestsCountEl.addEventListener('change', ()=> renderGuestFields(getGuestCountValue()));
    }
    document.querySelectorAll('input[name="guests"]').forEach(r => r.addEventListener('change', ()=> renderGuestFields(getGuestCountValue())));
    // mini-tab buttons (guest-tab) support: click to select 1..4
    const guestTabs = document.querySelectorAll('.guest-tab');
    if(guestTabs && guestTabs.length){
      guestTabs.forEach(btn=>{
        btn.addEventListener('click', ()=>{
          const v = btn.dataset.value || btn.getAttribute('data-value');
          // update hidden input value
          if(guestsCountEl) guestsCountEl.value = v;
          // update aria-pressed and active class
          guestTabs.forEach(b=>{ b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
          btn.classList.add('active');
          btn.setAttribute('aria-pressed','true');
          // render fields
          renderGuestFields(Number(v) || 1);
        });
      });
    }
  }

  if(checkinForm){
    checkinForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(!window.emailjs || EMAILJS_USER_ID === 'YOUR_USER_ID'){ checkinStatus.textContent = 'Invio non configurato: collega EmailJS (vedi README).'; return; }
      checkinStatus.textContent = 'Invio in corso…';
      const formData = new FormData(checkinForm);
      const guests = formData.get('guests') || '';
      const checkin_date = formData.get('checkin_date') || '';
      const checkout_date = formData.get('checkout_date') || '';
      const firstname = formData.get('firstname') || formData.get('guest_1_firstname') || '';
      const lastname = formData.get('lastname') || formData.get('guest_1_lastname') || '';
      const guestCount = Number(guests) || 1;
      const guestsArray = [];
      for(let i=1;i<=guestCount;i++){ const gFirst = formData.get(`guest_${i}_firstname`) || ''; const gLast = formData.get(`guest_${i}_lastname`) || ''; guestsArray.push({ firstname: gFirst, lastname: gLast }); }
      const fileCandidates = [];
      for(let i=1;i<=guestCount;i++){ const input = document.getElementById(`guest_${i}_id`); if(input && input.files && input.files.length > 0){ const f = input.files[0]; fileCandidates.push({ file: f, guestIndex: i }); } }
      const additionalInput = document.getElementById('additional_documents'); if(additionalInput && additionalInput.files){ for(let f of additionalInput.files){ fileCandidates.push({ file: f, guestIndex: null }); } }

      // helpers for compression and read
      function compressImageToDataURL(file, maxWidth=1200, quality=0.7){ return new Promise((resolve,reject)=>{ const reader = new FileReader(); reader.onerror = ()=> reject(new Error('read-fail')); reader.onload = ()=>{ const img = new Image(); img.onerror = ()=> reject(new Error('image-load-fail')); img.onload = ()=>{ const ratio = Math.min(1, maxWidth / img.width); const width = Math.round(img.width * ratio); const height = Math.round(img.height * ratio); const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height; const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0, width, height); canvas.toBlob((blob)=>{ if(!blob) return reject(new Error('compress-failed')); const fr = new FileReader(); fr.onerror = ()=> reject(new Error('read-fail')); fr.onload = ()=> resolve(fr.result); fr.readAsDataURL(blob); }, 'image/jpeg', quality); }; img.src = reader.result; }; reader.readAsDataURL(file); }); }
      function readFileAsDataURL(file){ return new Promise((resolve,reject)=>{ const r = new FileReader(); r.onload = ()=> resolve(r.result); r.onerror = ()=> reject(new Error('read-fail')); r.readAsDataURL(file); }); }
      function compressAndRead(item){ const file = item.file; const guestIndex = item.guestIndex; if(file.type && file.type.startsWith('image/')){ return compressImageToDataURL(file).then(dataUrl=>{ const base64 = (dataUrl.indexOf(',')>=0)?dataUrl.split(',')[1]:dataUrl; return { name: file.name, base64, guestIndex }; }).catch(()=>{ return readFileAsDataURL(file).then(dataUrl=> ({ name: file.name, base64: (dataUrl.indexOf(',')>=0)?dataUrl.split(',')[1]:dataUrl, guestIndex })); }); } return readFileAsDataURL(file).then(dataUrl=> ({ name: file.name, base64: (dataUrl.indexOf(',')>=0)?dataUrl.split(',')[1]:dataUrl, guestIndex })); }

      Promise.all(fileCandidates.map(item=> compressAndRead(item))).then(attachments=>{
        const totalVarsBytes = attachments.reduce((s,a)=> s + (a.base64 ? a.base64.length : 0), 0);
        const VARS_LIMIT_BYTES = 50000;
        if(totalVarsBytes > VARS_LIMIT_BYTES){
          console.warn(`Compressed attachments total ${totalVarsBytes} bytes exceeds ${VARS_LIMIT_BYTES} bytes - using emailjs.sendForm fallback`);
          emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, checkinForm).then(()=>{ checkinStatus.textContent = 'Invio avvenuto con successo (via sendForm). Grazie.'; checkinForm.reset(); renderGuestFields(1); }, (err)=>{ console.error('EmailJS sendForm error', err); const msg = (err && err.text) ? err.text : (err && err.statusText) ? err.statusText : (err && err.status) ? `status ${err.status}` : 'Errore sconosciuto'; checkinStatus.textContent = `Errore durante l'invio (sendForm): ${msg}. Controlla la console.`; });
          return;
        }

        const toEmailEl = document.querySelector('a[href^="mailto:"]');
        const to_email = toEmailEl ? toEmailEl.getAttribute('href').replace('mailto:','') : '';
        const templateParams = { to_email, firstname, lastname, guests: guestCount, checkin_date, checkout_date, guests_list: JSON.stringify(guestsArray), attachments: JSON.stringify(attachments) };
        try{ console.debug('EmailJS config', { service: EMAILJS_SERVICE_ID, template: EMAILJS_TEMPLATE_ID, user: EMAILJS_USER_ID }); console.debug('Prepared templateParams (trimmed):', Object.assign({}, templateParams, { guests_list: templateParams.guests_list ? '[json]' : null, attachments: `[${attachments.length} items]` })); console.debug('Attachments detail (names & guestIndex):', attachments.map(a=> ({ name: a.name, guestIndex: a.guestIndex, size: a.base64 ? a.base64.length : 0 }))); }catch(e){ console.warn('Debug logging failed', e); }
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams).then(()=>{ checkinStatus.textContent = 'Invio avvenuto con successo. Grazie.'; checkinForm.reset(); renderGuestFields(1); }, (err)=>{ console.error('EmailJS error', err); const msg = (err && err.text) ? err.text : (err && err.statusText) ? err.statusText : (err && err.status) ? `status ${err.status}` : 'Errore sconosciuto'; checkinStatus.textContent = `Errore durante l'invio: ${msg}. Controlla la configurazione e la console.`; });
      }).catch(err=>{ console.error('File read error', err); checkinStatus.textContent = 'Impossibile leggere uno o più file allegati.'; });
    });
  }
});
