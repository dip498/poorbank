import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, serverTimestamp, increment } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// আপনার Firebase কনফিগারেশন
const firebaseConfig = {
    apiKey: "AIzaSyBbgSXI0cEino8WogqJfGgtWxJ8NBP4XDE",
    authDomain: "poor-bank.firebaseapp.com",
    projectId: "poor-bank",
    storageBucket: "poor-bank.appspot.com",
    messagingSenderId: "654080065048",
    appId: "1:654080065048:web:67e84b041f90620df00d6d"
};

// Firebase ইনিশিয়ালাইজ করা
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const accountRef = doc(db, "accounts", "user1"); // একটি নির্দিষ্ট একাউন্ট ব্যবহার করা হচ্ছে

// DOM এলিমেন্টগুলো নিয়ে নেওয়া
const balanceEl = document.getElementById("currentBalance");
const lastUpdateEl = document.getElementById("last");
const levelEl = document.getElementById("level");
const amountInput = document.getElementById("tkInput");

/** UI আপডেট করার ফাংশন */
function updateUI(data) {
    const balance = data.balance || 0;
    balanceEl.innerText = `৳${balance.toFixed(2)}`;
    
    if (data.last_updated) {
        lastUpdateEl.innerText = `Last update: ${data.last_updated.toDate().toLocaleString()}`;
    }
    
    let level = 0;
    if (balance > 50000) level = 5;
    else if (balance >= 10000) level = 4;
    else if (balance >= 1000) level = 3;
    else if (balance > 500) level = 2;
    else if (balance > 0) level = 1;
    levelEl.innerText = `Your level is: ${level}`;
}

/** ডাটাবেস থেকে তথ্য লোড করা */
async function loadAccountData() {
    try {
        const docSnap = await getDoc(accountRef);
        if (docSnap.exists()) {
            updateUI(docSnap.data());
        } else {
            await setDoc(accountRef, { balance: 0, last_updated: serverTimestamp() });
            updateUI({ balance: 0, last_updated: new Date() });
        }
    } catch (error) {
        console.error("Error loading account data:", error);
        balanceEl.innerText = "Error";
    }
}

/** টাকা জমা বা তোলার জন্য সাধারণ ফাংশন */
async function handleTransaction(amount) {
    if (isNaN(amount)) {
        alert("Please enter a valid number.");
        return;
    }

    try {
        // টাকা তোলার আগে ব্যালেন্স চেক করা
        if (amount < 0) {
            const docSnap = await getDoc(accountRef);
            if (docSnap.data().balance < -amount) {
                alert("Insufficient balance.");
                return;
            }
        }
        
        await updateDoc(accountRef, {
            balance: increment(amount),
            last_updated: serverTimestamp()
        });
        
        alert(`Transaction of ৳${Math.abs(amount).toFixed(2)} successful!`);
        amountInput.value = "";
        loadAccountData();
    } catch (error) {
        console.error("Transaction failed:", error);
        alert("Transaction failed. Please try again.");
    }
}

// Event Listeners সেট করা
document.addEventListener('DOMContentLoaded', loadAccountData);
document.getElementById('saveBtn').addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    if (amount > 0) handleTransaction(amount);
    else alert("Please enter a positive amount to save.");
});
document.getElementById('withdrawBtn').addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    if (amount > 0) handleTransaction(-amount); // টাকা তোলার জন্য ঋণাত্মক মান পাঠানো হচ্ছে
    else alert("Please enter a positive amount to withdraw.");
});
document.getElementById('printBtn').addEventListener('click', () => window.print());
