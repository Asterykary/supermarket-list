import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddProductComponent } from '../../components/add-product/add-product.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  get user() {return this.auth.user}

  constructor(public modalController: ModalController, private auth: AuthService) {
    //this.modalAgregarProducto();
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
