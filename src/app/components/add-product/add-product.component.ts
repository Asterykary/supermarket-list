import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

  public productForm: FormGroup;

  get nombre(): AbstractControl {return this.productForm.get('nombre')}
  get cantidad(): AbstractControl {return this.productForm.get('cantidad')}

  constructor(public modalController: ModalController, private fb: FormBuilder) { 
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  agregarProducto(){
    this.modalController.dismiss();
  }

  closeModal(){
    this.modalController.dismiss();
  }

}
