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
