import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddProductComponent } from '../../components/add-product/add-product.component';
import { AuthService } from '../../services/auth.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  get user() {return this.auth.user}
  get productos() {return this.productoService.productos}

  constructor(public modalController: ModalController, private auth: AuthService, private productoService: ProductoService) {
    //this.modalAgregarProducto();
  }

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      if(user){
        this.productoService.obtenerProductos(user.uid);
        
      }
    })
  }


  async modalAgregarProducto(){
    const modal = await this.modalController.create({
      component: AddProductComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  cerrarSesion(){
    this.auth.cerrarSesion();
  }

}
