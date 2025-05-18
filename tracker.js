let startTime = null;
let timerInterval = null;

function initTracker(user) {
  const span = document.getElementById("work-time");
  const key = "worklog_" + user;

  function updateDisplay(seconds) {
    span.textContent = seconds + " Sek.";
  }

  function tick() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    updateDisplay(elapsed);
  }

  window.startTracking = function() {
    if (startTime) return;
    startTime = Date.now();
    timerInterval = setInterval(tick, 1000);
  };

  window.stopTracking = function() {
    if (!startTime) return;
    clearInterval(timerInterval);
    const duration = Math.floor((Date.now() - startTime) / 1000);
    const log = JSON.parse(localStorage.getItem(key) || "[]");
    const today = new Date().toLocaleDateString();
    log.push({ date: today, duration });
    localStorage.setItem(key, JSON.stringify(log));
    startTime = null;
    updateDisplay(0);
  };
}
