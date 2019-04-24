window.onload = windowPrepared;

function windowPrepared() {
    let canvas = document.createElement('canvas');    
    document.body.appendChild(canvas);
    let context = canvas.getContext("2d");

    canvas.width = 550;
    canvas.height = 550;


    let counter = 0;

    let quote = "";


    let images = new Array();
   
    
    let promises = Array(4).fill(0).map(a => new Promise((resolve, reject) => {
    let image = new Image();
    image.onload = () => resolve(image);
    image.crossOrigin = "anonymous";
    image.src = `https://source.unsplash.com/collection/3582397/420x420?r=${Math.random()}`
    }));

    let imageArrayPromise = Promise.all(promises);

    

    let requestQuote = new XMLHttpRequest();
    requestQuote.open('GET', "https://thesimpsonsquoteapi.glitch.me/quotes");
    requestQuote.send();
    requestQuote.onload = requestQuoteLoaded;

    function requestQuoteLoaded() {
        let responseObject = JSON.parse(requestQuote.response);
        quote = responseObject[0].quote;
    }
    
    
    function drawBlackout() {
        context.fillStyle = "rgba(0, 0, 0, 0.4)";
        context.fillRect(0, 0, 550, 550);
    }
    context.textAlign = 'center';
    context.verticalAlign = 'middle';
    context.textBaseline = 'top';
    context.strokeStyle = "#ffffff"
    context.font = "30px lucida console";

    let x = Math.ceil(Math.random() * (canvas.width - 2 * 420 - 1));
    let y = Math.ceil(Math.random() * (canvas.height - 2 * 420 - 1));
    //let x = 200;
    //let y = 200;



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

                imageArrayPromise.then(images => {
                    context.drawImage(images[0], x, y);
                    context.drawImage(images[1], x + 420, y);
                    context.drawImage(images[2], x, y + 420);
                    context.drawImage(images[3], x + 420, y + 420);
                    drawBlackout();
                    fitQuoteIntoCanvas();
                    canvas.onclick = download;
                })
}