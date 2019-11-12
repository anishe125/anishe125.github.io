document.getElementById("input-form").addEventListener("submit",myFunction);
function myFunction(event){
    event.preventDefault();
    $(function find () {
            let wAPI = $.getJSON('https://api.openweathermap.org/data/2.5/weather?appid=9d5b59f6e7f7e77586dc0269e6d0438a', {q: cityName.value})
                .done(function (data){
                    drawData(data);
                })
                .fail(function (error) {
                    drawError(error);
                })
    });

//event target. value
}
function drawData(data) {

    let template = $("#main_template").html();
    let text = Mustache.render(template, data);
    $("#mypanel").html(text);
}

function drawError(error){

    if (error === 'Not found'){
        document.getElementById('mypanel').innerText = 'City not found';
    }
    else {
        document.getElementById('mypanel').innerText = 'Server error';
    }
}


