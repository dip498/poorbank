
function load(){
    let cookies = document.cookie.split(';');
    let tk = '';
    for(let i=0; i<cookies.length; i++){
        if(cookies[i].trim().startsWith('tk=')){
            tk = cookies[i].split('=')[1];
            break;
        }
    }
    if(tk){
        document.getElementById("currentBalance").innerText = "৳" + tk;
    } 
}

setInterval(() => {
    load();
}, 1000);

function addtk(){
    let currentBalance = document.getElementById("currentBalance");
    let currentTk = parseFloat(currentBalance.innerText.replace('৳', ''));
    let tkInput = document.getElementById("tkInput").value;
    if(tkInput){
        let newTk = parseFloat(tkInput);
        if(!isNaN(newTk)){
            currentBalance.innerText = "৳" + (currentTk + newTk).toFixed(2);
            document.cookie = "tk=" + (currentTk + newTk).toFixed(2) + "; path=/; max-age=31536000; secure; SameSite=Strict";
            alert("TK added successfully!");
        } else {
            alert("Please enter a valid number.");
        }
    } else {
        alert("Please enter an amount to add.");
    }
    let lastSave = new Date().toLocaleString();
    document.cookie = "lastSave=" + lastSave + "; path=/; max-age=31536000; secure; SameSite=Strict";
    let tim= document.cookie.split(';');
    
    document.getElementById("last").innerText = "Last save: " + tim;
}
function loadLastSave() {
    let cookies = document.cookie.split(';');
    let lastSave = '';
    for(let i=0; i<cookies.length; i++){
        if(cookies[i].trim().startsWith('lastSave=')){
            lastSave = cookies[i].split('=')[1];
            break;
        }
    }
    if(lastSave){
        document.getElementById("last").innerText = "Last save: " + lastSave ;
    } else {
        document.getElementById("last").innerText = "No previous save found.";
    }
}
setInterval(() => {
    loadLastSave();
}, interval = 1000);

function about(){
    let tkText = document.getElementById("currentBalance").innerText;
    let tk = parseFloat(tkText.replace('৳', '').replace(/,/g, ''));
    let level = 0;
    if (tk <= 500){
        level = 1;
    }
    else if ( tk>= 1000){
        level = 2;
    }
    else if (tk >= 10000 && tk < 20000){
        level = 3;
    }
    else if (tk >= 20000 && tk < 50000){
        level = 4;
    }
    else if (tk >= 50000){
        level = 5;
    }
    document.getElementById("lavel").innerText = "Your level is: " + level;
}
setInterval(() => {
    about();
}, 1000);

function printPage() {
    window.print();
}