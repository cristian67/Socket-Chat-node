class Usuario {

    constructor() {
        this.personas = [];
    }



    agregarPersona(id, nombre, sala) {

        let persona = {
            id,
            nombre,
            sala
        };

        //agregar al arreglo persona
        this.personas.push(persona);

        return this.personas;
    }



    getPersona(id) {

        //Retornar un unico registro
        let persona = this.personas.filter(persona => persona.id === id)[0];

        return persona;

    }



    getPersonas() {
        return this.personas;
    }



    getPersonasPorSala(sala) {

        let personasEnSala = this.personas.filter(persona => persona.sala === sala);

        return personasEnSala;
    }



    borrarPersona(id) {

        //Saber quien deja el chat
        let personaBorrada = this.getPersona(id);

        //Eliminarlo del chat: 
        //filter: elimina todos los q no cumpla la condicion.
        this.personas = this.personas.filter(persona => persona.id != id);

        return personaBorrada;


    }
}



module.exports = {

    Usuario

}