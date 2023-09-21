const request = new XMLHttpRequest();
const url = 'https://api.adviceslip.com/advice';
const refreshButton = document.getElementById('refresh-button');
const saveButton = document.getElementById('save-button');
const adviceBox = document.getElementById('advice-box');
const adviceText = document.getElementById('advice-text');
const errorMsg = document.getElementById('error-msg');

const savedAdviceBox = document.getElementById('saved-advice-box');

let savedAdvice = [];

let canMakeRequest = true;

function sendRequest() {
    if(canMakeRequest) {
        canMakeRequest = false;
        request.open("GET", url);
        request.send()

        setTimeout(() => {
            canMakeRequest = true;
        }, 2000);
    } else {
        errorMsg.innerHTML = "Requesting too fast... please slow down!"
    }
    
}

function saveAdvice() {
    let adviceString;
    let newAdvice;
    
    adviceString = JSON.parse(request.responseText).slip.advice;
    if (!savedAdvice.includes(adviceString)){
        savedAdvice.push(adviceString);
        
        newAdvice = document.createElement("div");
        newAdvice.classList.add("saved-advice");
        newAdvice.innerHTML = adviceString;

        errorMsg.innerHTML = "";

        savedAdviceBox.appendChild(newAdvice);
    } else {
        errorMsg.innerHTML = "Advice already saved. Please refresh and try again."
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
saveButton.addEventListener("click", saveAdvice)