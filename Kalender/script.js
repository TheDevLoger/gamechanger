import { db, collection, addDoc, query, where, getDocs } from './firebase-config.js';

// 📅 Aktueller Monat und Jahr
let currentDate = new Date();
let selectedDate = null;

// 📌 DOM-Elemente
const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('month-year');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const modal = document.getElementById('modal');
const selectedDateHeading = document.getElementById('selected-date');
const eventInput = document.getElementById('event-input');
const saveEventBtn = document.getElementById('save-event');
const closeModalBtn = document.getElementById('close-modal');
const eventList = document.getElementById('event-list');

// 📆 Monatsnamen
const months = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];

// 📅 Kalender anzeigen
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Setze Kopfzeile
    monthYear.textContent = `${months[month]} ${year}`;

    // Leere das Grid
    calendar.innerHTML = '';

    // Füge leere Felder für den ersten Wochentag ein
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
        const empty = document.createElement('div');
        calendar.appendChild(empty);
    }

    // Füge die Tage ein
    for (let day = 1; day <= lastDate; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;
        dayDiv.addEventListener('click', () => openModal(year, month, day));
        calendar.appendChild(dayDiv);
    }
}

// ⬅️➡️ Navigation
prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// 🪟 Modal öffnen
async function openModal(year, month, day) {
    selectedDate = new Date(year, month, day);
    selectedDateHeading.textContent = selectedDate.toLocaleDateString('de-DE');
    eventInput.value = '';
    eventList.innerHTML = '';

    const dateString = selectedDate.toISOString().split('T')[0];

    // 📥 Events laden
    const q = query(collection(db, "events"), where("date", "==", dateString));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        const li = document.createElement('li');
        li.textContent = doc.data().text;
        eventList.appendChild(li);
    });

    modal.classList.remove('hidden');
}

saveEventBtn.addEventListener('click', async () => {
    const text = eventInput.value.trim();
    if (!text || !selectedDate) return;

    const dateString = selectedDate.toISOString().split('T')[0];
    await addDoc(collection(db, "events"), {
        date: dateString,
        text: text
    });

    openModal(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
});

// Modal schließen
closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// 📦 Initialisieren
renderCalendar();
