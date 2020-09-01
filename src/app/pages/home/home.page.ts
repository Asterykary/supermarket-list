import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddProductComponent } from '../../components/add-product/add-product.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public modalController: ModalController) {
    this.modalAgregarProducto();
  }

  async modalAgregarProducto(){
    const modal = await this.modalController.create({
      component: AddProductComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
