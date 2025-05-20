// dashboardService.js
import {
    doc, getDoc, setDoc, updateDoc, arrayUnion, collection, addDoc, getFirestore, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const db = getFirestore();

export async function saveLogin(userKey, dashboard) {
    const ref = doc(db, "logins", `${userKey}_${dashboard}`);
    await setDoc(ref, {
        loginZeit: serverTimestamp()
    }, { merge: true });
}

export async function updateZeitprotokoll(userKey, dashboard, tag, ms) {
    const ref = doc(db, "zeitprotokolle", `${userKey}_${dashboard}`);
    const snapshot = await getDoc(ref);
    const data = snapshot.exists() ? snapshot.data() : {};
    const vorher = data[tag] || 0;

    await setDoc(ref, {
        [tag]: vorher + ms
    }, { merge: true });

    return vorher + ms;
}

export async function addArbeitszeit(userKey, dashboard, eintrag) {
    const ref = collection(db, "arbeitszeiten", `${userKey}_${dashboard}`, "eintraege");
    await addDoc(ref, eintrag);
}

export async function getArbeitszeiten(userKey, dashboard) {
    const snapshot = await getDoc(doc(db, "arbeitszeitenSammlungen", `${userKey}_${dashboard}`));
    return snapshot.exists() ? snapshot.data().eintraege : [];
}

export async function setTasks(userKey, dashboard, tasks) {
    const ref = doc(db, "aufgaben", `${userKey}_${dashboard}`);
    await setDoc(ref, { tasks }, { merge: true });
}

export async function getTasks(userKey, dashboard) {
    const ref = doc(db, "aufgaben", `${userKey}_${dashboard}`);
    const snapshot = await getDoc(ref);
    return snapshot.exists() ? snapshot.data().tasks : [];
}
