const countdownelement=document.getElementById("countdown");
const gif=document.getElementById("gif-container");

let countvalue=10;
countdownelement.textContent=countvalue;
const countinterval=setInterval(() => {
    countvalue--;
    countdownelement.textContent=countvalue;
    if(countvalue==0){
        clearInterval(countinterval);
        document.getElementById("countdown-container").style.display='none';
        gif.style.display='block';
    }
}, 1000);