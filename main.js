const request = new XMLHttpRequest();
const url = 'https://api.adviceslip.com/advice';
const refreshButton = document.getElementById('refresh-button');
const adviceBox = document.getElementById('advice-box');
const errorMsg = document.getElementById('error-msg')

let canMakeRequest = true;

let adviceText = "";

function sendRequest() {
    if(canMakeRequest) {
        canMakeRequest = false;
        request.open("GET", url);
        request.send()

        setTimeout(() => {
            canMakeRequest = true;
        }, 2000);
    } else {
        errorMsg.innerHTML = "Requesting too fast... please slow down"
    }
    
}

request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       adviceBox.innerHTML = JSON.parse(request.responseText).slip.advice;
       errorMsg.innerHTML = ""
    }
};

window.onload = function () {
    sendRequest();
}

refreshButton.addEventListener("click", sendRequest);