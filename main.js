
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