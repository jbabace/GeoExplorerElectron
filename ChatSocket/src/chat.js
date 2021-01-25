var net = require('net');

var client = new net.Socket();
client.connect(1234, '127.0.0.1', function() {
    console.log('Connected');
    var loginJson = '{ "action": "login", "user":"Endibra", "route":"Ruta X"}';
    
    client.write(loginJson);
    client.end();
});


client.on("data", (data) => {
    console.log(data.toString());
    client.end();
});

function escribirSocket() {
    console.log("Vamos a conectarnos");
    
    
}

function botonPulsado() {

    if (window.event.keyCode === 13) {
        anadirTexto();
        
        $(".textareaChat").val("");
        $(".textareaChat").height('5px');

        //evitamos que ponga un espacio cuando no hace falta
        window.event.preventDefault();
    }
}

function anadirTexto() {
    if($('.textareaChat').val() != ""){
        var content = document.createElement("div");

        //cambiamos
        var html = $(".textareaChat").val().replace(/(\n|\r|\r\n)/g, '<br>');

        content.innerHTML = html;
    
        $('#contenidoChat').append(content).append('<hr>');

        //vaciamos el textarea
        $(".textareaChat").val("");
        $(".textareaChat").height('5px');
    }
}

