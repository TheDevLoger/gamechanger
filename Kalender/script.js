import { db, collection, addDoc, query, where, getDocs } from './firebase-config.js';

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("month-year");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const modal = document.getElementById("modal");
const selectedDateHeading = document.getElementById("selected-date");
const eventList = document.getElementById("event-list");
const eventInput = document.getElementById("event-input");
const saveEventBtn = document.getElementById("save-event");

let currentDate = new Date();
let selectedDate = null;

function renderCalendar() {
  calendar.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = (firstDay.getDay() + 6) % 7;

  monthYear.textContent = firstDay.toLocaleString('de-DE', { month: 'long', year: 'numeric' });

  for (let i = 0; i < startDay; i++) {
    const empty = document.createElement("div");
    calendar.appendChild(empty);
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const cell = document.createElement("div");
    cell.textContent = day;
    cell.addEventListener("click", () => openModal(year, month, day));
    calendar.appendChild(cell);
  }
}

async function openModal(year, month, day) {
  selectedDate = new Date(year, month, day);
  selectedDateHeading.textContent = selectedDate.toLocaleDateString('de-DE');
  eventInput.value = '';
  eventList.innerHTML = '';

  const dateString = selectedDate.toISOString().split('T')[0];
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
  await addDoc(collection(db, "events"), { date: dateString, text: text });
  openModal(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
});

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

document.addEventListener("DOMContentLoaded", renderCalendar);