/**
 * Created by juan_arillo on 20/9/17.
 *
 * Description: Error Library for Spanish languaje
 *
 */

'use strict';


let spanishResponse = {
    auth : 'Error de validación. Uno o mas campos requeridos no han sido enviados.',
    token: 'Push incompleto. Uno o mas campos requeridos no han sido enviados.',
    key: 'Campo key no enviado. Revise su solicitud.',
    users: 'Algún campo requerido no ha sido enviado. Por favor, revise su solicitud.',
    server: 'Error del servidor.',
    email: 'Fallo de autentificación. Usuario no encontrado.',
    pwd: 'Fallo de autentificación. Contraseña incorrecta.'
};

module.exports = spanishResponse;