window.onload = windowPrepared;

function windowPrepared() {
    let canvas = document.createElement('canvas');    
    document.body.appendChild(canvas);
    let context = canvas.getContext("2d");

    canvas.width = 500;
    canvas.height = 500;

    let counter = 0;


    let quote = "";
/**
    let backgroundImage1 = new Image();
    backgroundImage1.crossOrigin = 'anonymous';
    backgroundImage1.src = "https://source.unsplash.com/collection/1127163/300x500";
    backgroundImage1.onload = function () {
        counter++;
        drawContent();
    };

    let backgroundImage2 = new Image();
    backgroundImage2.crossOrigin = 'anonymous';
    backgroundImage2.src = "https://source.unsplash.com/collection/1127163/200x260";
    backgroundImage2.onload = function () {
        counter++;
        drawContent();
    };

    let backgroundImage3 = new Image();
    backgroundImage3.crossOrigin = 'anonymous';
    backgroundImage3.src = "https://source.unsplash.com/collection/1127163/200x240";
    backgroundImage3.onload = function () {
        counter++;
        drawContent();
    };*/

    let images = new Array();
    for (var i = 0; i < 4; i++){
        images[i] = new Image();
        images[i].crossOrigin="anonymous";
    }
    images[0].scr = "https://source.unsplash.com/collection/1127163/200x240";
    images[0].onload = function(){
        counter++;
        drawContent();
    }
    images[1].scr = "https://source.unsplash.com/collection/1127163/200x240";
    images[1].onload = function(){
        counter++;
        drawContent();
    }
    images[2].scr = "https://source.unsplash.com/collection/1127163/200x240";
    images[2].onload = function(){
        counter++;
        drawContent();
    }
    images[3].scr = "https://source.unsplash.com/collection/1127163/200x240";
    images[3].onload = function(){
        counter++;
        drawContent();
    }
    /*
    for(let i = 0; i < 4; i++){
        let tmp = new Image();
        tmp.crossOrigin = 'anonymous';
        tmp.src = "https://source.unsplash.com/collection/1127163/";
        tmp.onload = function () {
        images[i] = tmp;
        counter++;
        drawContent();
        };
    }**/

    let requestQuote = new XMLHttpRequest();

    requestQuote.open('GET', "https://thesimpsonsquoteapi.glitch.me/quotes");

    requestQuote.send();

    requestQuote.onload = requestQuoteLoaded;

    function requestQuoteLoaded() {
        let responseObject = JSON.parse(requestQuote.response);
        quote = responseObject[0].quote;
        counter++;
        drawContent();
    }
    
    
    function drawBlackout() {
        context.fillStyle = "rgba(0, 0, 0, 0.4)";
        context.fillRect(0, 0, 500, 500);
    }
    context.textAlign = 'center';
    context.verticalAlign = 'middle';
    context.textBaseline = 'top';
    context.strokeStyle = "#ffffff"
    context.font = "30px lucida console";

    function drawContent() {
        if (counter === 4) {
            context.drawImage(images[0], 0, 0);
            context.drawImage(images[1], 300, 0);
            context.drawImage(images[2], 300, 260);
            drawBlackout();
            fitQuoteIntoCanvas();
            canvas.onclick = download;
        }
    }

    function download() {
        const fakeLink = document.createElement('a');
        fakeLink.download = 'canvas.png';
        fakeLink.href = canvas.toDataURL();
        fakeLink.click();
    }


    function breakdownText(textString, canvas) {
    let words = textString.split(' ');
    let text = [];
    let currentLine = words.shift();

    while (words.length > 0) {
        let currentWord = words.shift();
        if (canvas.getContext("2d").measureText(currentLine + currentWord).width < canvas.width * .8) {
            currentLine += " " + currentWord;
        } else {
            text.push(currentLine);
            currentLine = currentWord;
        }
    }

    text.push(currentLine);
    return text;
    }






    function fitQuoteIntoCanvas() {
        let text = breakdownText(quote, canvas);
         let middleLineNumber = text.length / 2;
        for (let i = 0; i < text.length; i++) {
            context.strokeText(text[i], canvas.width / 2, canvas.height / 2 - 30 * middleLineNumber + 30 * i);
        }
    }
}