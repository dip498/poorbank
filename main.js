function save(){
    let tk = document.getElementById('tk').value;
    if (tk == '') {
        alert('Please enter a taka');
        return;
    }
    // set the cookie
    let sumtaka= document.cookie.split('; ').find(row => row.startsWith('taka='));
    if (sumtaka) {
        let currentValue = sumtaka.split('=')[1];
        let newValue = parseFloat(currentValue) + parseFloat(tk);
        document.cookie = `taka=${newValue}; path=/; max-age=31536000`;
    } else {
        document.cookie = `taka=${parseFloat(tk)}; path=/; max-age=31536000`; // Initialize if not found
    }

}
function load() {
    let cookie = document.cookie.split('; ').find(row => row.startsWith('taka='));
    if (cookie) {
        let value = cookie.split('=')[1];
        document.getElementById('show').innerHTML = value;
    } else {
        document.cookie = "taka=0; path=/; max-age=31536000"; // Initialize taka to 0 if not found
        document.getElementById('show').innerHTML = "00.00"; // Update display immediately
    }
}
setInterval(() => {
    load();
}, 1000);

function withdraw() {
    let tk = document.getElementById('tk').value;
    if (tk == '') {
        alert('Please enter a taka');
        return;
    }

    let sumtaka = document.cookie.split('; ').find(row => row.startsWith('taka='));
    if (sumtaka) {
        let currentValue = sumtaka.split('=')[1];
        if (parseFloat(currentValue) < parseFloat(tk)) {
            alert('Insufficient balance');
            return;
        }
        let newValue = parseFloat(currentValue) - parseFloat(tk);
        document.cookie = `taka=${newValue}; path=/; max-age=31536000`;
        alert(`Withdrawn ${tk} taka successfully`);
    } else {
        alert('No balance to withdraw from.'); // Handle case where cookie doesn't exist
    }
   
}
function about(){
    let cookie = document.cookie.split('; ').find(row => row.startsWith('taka='));
    let taka=  cookie.split('=')[1] ;
    let per= 0;
    if (taka<=500){
        document.getElementById('lavel').innerHTML= "Level: 1";
        document.getElementById('ststus').innerHTML= "Status: Poor";
        document.getElementById('turget').innerHTML= "Target: 500 Taka";
        per= 500;

    }
    else if (taka>500 && taka<=1000){
        document.getElementById('lavel').innerHTML= "Level: 2";
        document.getElementById('ststus').innerHTML= "Status: Middle Class";
        document.getElementById('turget').innerHTML= "Target: 1000 Taka";
        per= 1000;
    }
    else if (taka>1000 && taka<=1600){
        document.getElementById('lavel').innerHTML= "Level: 3";
        document.getElementById('ststus').innerHTML= "Status: Rich";
        document.getElementById('turget').innerHTML= "Target: 1600 Taka";
        per= 1600;
    }
    else if (taka>1600 && taka<=2000){
        document.getElementById('lavel').innerHTML= "Level: 4";
        document.getElementById('ststus').innerHTML= "Status: Very Rich";
        document.getElementById('turget').innerHTML= "Target: 2000 Taka";
        per= 2000;
    }
    else if (taka>2000 && taka<=2200){
        document.getElementById('lavel').innerHTML= "Level: 5";
        document.getElementById('ststus').innerHTML= "Status: Super Rich";
        document.getElementById('turget').innerHTML= "Target: 2200 Taka";
        per= 2200;
    }
    else if (taka>2200 && taka<=2500){
        document.getElementById('lavel').innerHTML= "Level: 6";
        document.getElementById('ststus').innerHTML= "Status: Ultra Rich";
        document.getElementById('turget').innerHTML= "Target: 2500 Taka";
        per= 2500;
    }
    else if (taka>2500 && taka<=3000){
        document.getElementById('lavel').innerHTML= "Level: 7";
        document.getElementById('ststus').innerHTML= "Status: Mega Rich";
        document.getElementById('turget').innerHTML= "Target: 3000 Taka";
        per= 3000;
    }
    else if (taka>3000 && taka<=3200){
        document.getElementById('lavel').innerHTML= "Level: 8";
        document.getElementById('ststus').innerHTML= "Status: Billionaire";
        document.getElementById('turget').innerHTML= "Target: 3200 Taka";
        per= 3200;
    }
    else {
        document.getElementById('lavel').innerHTML= "Level: 9";
        document.getElementById('ststus').innerHTML= "Status: Super Billionaire";
        document.getElementById('turget').innerHTML= "Target: 5000 Taka";
        per= 5000;
    }
    let persent = (taka / per) * 100;
    document.getElementById('%').innerHTML = "Percentage: " + persent.toFixed(2) + "%";
    let euro = taka / 141.96; 
    document.getElementById('euro').innerHTML = "Euro: " + euro.toFixed(2) + "€";
    
}
    document.getElementById('taka').innerHTML= "Taka: " + document.cookie.split('; ').find(row => row.startsWith('taka=')).split('=')[1]
    setInterval(() => {
        about();
    }, 1000);
