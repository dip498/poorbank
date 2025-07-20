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
