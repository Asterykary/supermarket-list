import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Usuario} from 'src/app/models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: firebase.User;

  constructor(private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore, 
              private navCtrl: NavController, public loadingController: LoadingController) {
    firebaseAuth.authState.subscribe((user)=>{
      if(user){
        this.user = user;
      }else{
        this.user = null;
      }

    });
  }

  async loginGoogle(){
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión'
    });
    await loading.present();

    const provider = new firebase.auth.GoogleAuthProvider();
    this.firebaseAuth.signInWithPopup(provider).then((resp) => {
      const usuario: Usuario = {
        id : resp.user.uid,
        nombre: resp.user.displayName,
        correo: resp.user.email
      };
      this.crearUsuario(usuario);
      loading.dismiss();
      this.navCtrl.navigateForward('/home');
    }).catch((error) =>{
      console.log(error);
      loading.dismiss();
    })
    
  }

  cerrarSesion(){
    this.firebaseAuth.signOut();
    this.navCtrl.navigateBack('/login');
  }

  crearUsuario(usuario: Usuario){
    return this.firestore.collection<Usuario>('usuarios').doc(usuario.id).set(usuario);
  }
}
