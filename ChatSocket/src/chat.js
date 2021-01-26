var net = require('net');
var usuario = "Endibra";
var ruta = "Ruta X";

var client = new net.Socket();
client.connect(1234, '127.0.0.1', function() {
    console.log('Conectado');
    var loginJson = '{ "action": "login", "user":"'+usuario+'", "route":"'+ruta+'"}';
    
    client.write(loginJson);
    client.write("\n");
});


client.on("data", (data) => {
    var datos = JSON.parse(data);
    anadirTextoExterno(datos);
});

function escribirTextoInterno(mensaje) {
    var mensajeJSON = '{"action":"msg","from":"'+usuario+'","route":"'+ruta+'","value":"'+mensaje+'"}';
    client.write(mensajeJSON);
    client.write("\n");
}


function botonPulsado() {

    //si se le da enter, envia el texto automaticamente
    if (window.event.keyCode === 13) {
        anadirTexto();
        
        //vaciamos el textarea y le ajustamos el tamaño en caso de que haya escrito mucho
        $(".textareaChat").val("");
        $(".textareaChat").height('5px');

        //evitamos que ponga un espacio cuando no hace falta
        window.event.preventDefault();
    }
}

function anadirTexto() {
    mensaje = $('.textareaChat').val();
    if(mensaje != ""){
        escribirTextoInterno(mensaje);
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

function anadirTextoExterno(json) {
    if(json["value"] != ""){
        var content = document.createElement("div");

        //cambiamos
        mensaje = json["value"];
        var html = mensaje.replace(/(\n|\r|\r\n)/g, '<br>');

        content.innerHTML = html;
    
        $('#contenidoChat').append(content).append('<hr>');
    }
}

