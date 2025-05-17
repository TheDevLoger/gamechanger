let currentUser = null;

function login(user) {
    currentUser = user;
    updateStatus();
}

function logout() {
    currentUser = null;
    updateStatus();
}

function updateStatus() {
    const statusBox = document.getElementById('status');
    if (currentUser) {
        statusBox.innerHTML = `<p><strong>${currentUser}</strong> ist eingeloggt.</p>`;
    } else {
        statusBox.innerHTML = "<p>Niemand ist eingeloggt.</p>";
    }
}

function renderZeitleiste() {
    const zeitleiste = document.getElementById("zeitleiste-a");
    zeitleiste.innerHTML = "";

    const einträge = JSON.parse(localStorage.getItem("arbeitszeiten_BenutzerA")) || [];

    einträge.forEach(eintrag => {
        const start = new Date(eintrag.start);
        const ende = new Date(eintrag.ende);
        const tag = start.toISOString().slice(0, 10);
        const stundenGesamt = 24;

        if (tag === new Date().toISOString().slice(0, 10)) {
            const startProzent = ((start.getHours() * 60 + start.getMinutes()) / (stundenGesamt * 60)) * 100;
            const dauerMin = (ende - start) / 60000;
            const breiteProzent = (dauerMin / (stundenGesamt * 60)) * 100;

            const bar = document.createElement("div");
            bar.className = "timeline-bar";
            bar.style.left = startProzent + "%";
            bar.style.width = breiteProzent + "%";
            zeitleiste.appendChild(bar);
        }
    });
}


