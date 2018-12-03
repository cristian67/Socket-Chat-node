var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre es necesario y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')

}

//Escuchar inicio de sesion 
socket.on('connect', function() {
    console.log('Conectado al servidor');
    //Avisar que se conecto
    socket.emit('entrarChat', usuario, function(resp) {

        console.log('Usuarios', resp);

    });
});

// escuchar Desconexion
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

//Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor: ', mensaje);

});




//Escuchar cambio de usuario
socket.on('listaPersona', function(personas) {

    console.log('Personas: ', personas);

});


//Escuchar Mensajes privados
socket.on('mensajePrivado', function(mensaje) {

    console.log('mensaje', mensaje);


});