const { io } = require('../server');
const { Usuario } = require('../classes/usuarios');
const { crearMensaje } = require('../helpers/helper');

const usuarios = new Usuario();

io.on('connection', (client) => {

    //Iniciar Sesion
    client.on('entrarChat', (user, callback) => {


        if (!user.nombre || !user.sala) {
            return callback({
                error: true,
                message: 'nombre/sala no encontrado'
            });
        }

        client.join(user.sala);

        //Si no existe el error
        usuarios.agregarPersona(client.id, user.nombre, user.sala);

        client.broadcast.to(user.sala).emit('listaPersona', usuarios.getPersonasPorSala(user.sala));

        callback(JSON.stringify(usuarios.getPersonasPorSala(user.sala)));
    });


    //Generar mensaje y enviar a todos
    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

    });



    //Mensajes Privados 

    client.on('mensajePrivado', (data) => {

        let persona = usuarios.getPersona(client.id);

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    });





    //Desconectar Cliente
    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona(client.id);

        //Emitir a todos que  un usuario se desconecto
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Admin', `${personaBorrada.nombre} salio del chat`));
        //Emitiar a todos el estado actual
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));


    });
});