import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Producto } from '../models/producto.model';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productos: Producto[] = [];


  constructor(private firestore: AngularFirestore, public loadingController: LoadingController) { }

  async obtenerProductos(idusuario: string){
    const loading = await this.loadingController.create({
      message: 'Obteniendo producto'
    });
    await loading.present();

    console.log(idusuario);
    this.firestore.collection<Producto>('productos', ref => ref.where('idusuario', '==', idusuario))
    .get().toPromise().then((resp) =>{
      this.productos = [];
      resp.forEach((prod) =>{
        const producto: Producto = {
          id: prod.data().id,
          idusuario: prod.data().idusuario,
          nombre: prod.data().nombre,
          cantidad: prod.data().cantidad,
          listo: prod.data().listo
        }
        this.productos.push(producto);
        
        
      });
      loading.dismiss();
      console.log(this.productos);
    });
  }

  actualizarProducto(producto: Producto){
    this.firestore.collection<Producto>('productos').doc(producto.id).set(producto)
    .then((resp) =>{
      this.obtenerProductos(producto.idusuario);
    });
  }

  borrarProducto(producto: Producto){
    this.firestore.collection<Producto>('productos').doc(producto.id).delete()
    .then((resp) => {
      this.obtenerProductos(producto.idusuario);
    });
  }

  agregarProducto(producto: Producto){
    producto.id = this.firestore.createId();
    this.firestore.collection<Producto>('productos').doc(producto.id).set(producto)
    .then((resp)=>{
      this.obtenerProductos(producto.idusuario);
    });
  }
}
