import app from 'firebase/app';
import 'firebase/auth';

import firebaseConfig from './config';

class Firebase {
    constructor(){
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig);
        }
        this.auth = app.auth();
    }

    //registra un usuario
    async registrar(nombre, email, password){
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password);
        //el metodo por defectosolo permite crear la cuenta solo con email y clave

        //fn para aplicar un usuario
        return await nuevoUsuario.user.updateProfile({
            displayName : nombre
        })

    }
}

const firebase = new Firebase();
export default firebase;