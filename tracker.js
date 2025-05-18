function formatTime(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function initTracker(user) {
  let onlineTime = 0;
  let workTime = 0;
  let workTimer;
  const startBtn = document.getElementById("start-btn");
  const stopBtn = document.getElementById("stop-btn");
  const onlineDisplay = document.getElementById("online-time");
  const workDisplay = document.getElementById("work-time");

  const dateKey = new Date().toISOString().split('T')[0];
  const workStorageKey = `workTime_${user}_${dateKey}`;

  if (localStorage.getItem(workStorageKey)) {
    workTime = parseInt(localStorage.getItem(workStorageKey));
  }

  setInterval(() => {
    onlineTime++;
    onlineDisplay.textContent = formatTime(onlineTime);
  }, 1000);

  if (startBtn && stopBtn) {
    startBtn.onclick = () => {
      if (!workTimer) {
        workTimer = setInterval(() => {
          workTime++;
          localStorage.setItem(workStorageKey, workTime);
          workDisplay.textContent = formatTime(workTime);
        }, 1000);
      }
    };
    stopBtn.onclick = () => {
      clearInterval(workTimer);
      workTimer = null;
    };
  }

  workDisplay.textContent = formatTime(workTime);
}

function showAdminData() {
  const logList = document.getElementById("log-list");
  const users = ['a', 'b'];
  const today = new Date().toISOString().split('T')[0];

  users.forEach(user => {
    const key = `workTime_${user}_${today}`;
    const time = parseInt(localStorage.getItem(key) || 0);
    const li = document.createElement("li");
    li.textContent = `Benutzer ${user.toUpperCase()}: ${formatTime(time)}`;
    logList.appendChild(li);
  });
}