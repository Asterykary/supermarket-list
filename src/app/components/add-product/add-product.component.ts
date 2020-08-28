import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  agregarProducto(){
    this.modalController.dismiss();
  }

  closeModal(){
    this.modalController.dismiss();
  }

}
