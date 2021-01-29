var net = require('net');
var usuario = "Endibra";
var ruta = "";

var client = new net.Socket();
client.connect(1234, '10.10.12.183', function() {
    console.log('Conectado');
});


function conexion(route) {
    ruta = route;
    var loginJson = '{ "action": "login", "user":"'+usuario+'", "route":"'+ruta+'"}';
    
    client.write(loginJson);
    client.write("\n");
}

function desconexion() {
    

    $(".textareaChat").val("");
    $(".textareaChat").height('5px');
    var contenidoChat = document.getElementById("contenidoChat");
    contenidoChat.innerHTML="";
}


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
        content.className = "chatInterno"

        content.innerHTML = "Yo: " + mensaje;
    
        $('#contenidoChat').append(content);

        //vaciamos el textarea
        $(".textareaChat").val("");
        $(".textareaChat").height('5px');
    }
}

function anadirTextoExterno(json) {
    if(json["value"] != ""){
        var content = document.createElement("div");
        content.className = "chatExterno"

        //cambiamos
        mensaje = json["value"];
        usuario = json["from"];

        content.innerHTML = usuario + ": " + mensaje;
    
        $('#contenidoChat').append(content);
    }
}

