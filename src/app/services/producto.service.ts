import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productos: Producto[] = [];

  loading: boolean = false;

  constructor(private firestore: AngularFirestore) { }

  obtenerProductos(idusuario: string){
    this.loading = true;
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
      this.loading = false;
    });
  }

  actualizarProducto(producto: Producto){
    this.loading = true;
    this.firestore.collection<Producto>('productos').doc(producto.id).set(producto)
    .then((resp) =>{
      this.obtenerProductos(producto.idusuario);
    });
  }

  borrarProducto(producto: Producto){
    this.loading = true;
    this.firestore.collection<Producto>('productos').doc(producto.id).delete()
    .then((resp) => {
      this.obtenerProductos(producto.idusuario);
    });
  }

  agregarProducto(producto: Producto){
    this.loading = true;
    producto.id = this.firestore.createId();
    this.firestore.collection<Producto>('productos').doc(producto.id).set(producto)
    .then((resp)=>{
      this.obtenerProductos(producto.idusuario);
    });
  }
}
