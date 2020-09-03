import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

  public productForm: FormGroup;

  get nombre(): AbstractControl {return this.productForm.get('nombre')}
  get cantidad(): AbstractControl {return this.productForm.get('cantidad')}

  constructor(public modalController: ModalController, private fb: FormBuilder, private productoService: ProductoService, private auth: AuthService) { 
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  agregarProducto(){
    console.log(this.productForm);
    if(this.productForm.valid){
      console.log('Formulario valido');
      this.auth.user.subscribe((user) => {
        
        const product: Producto = {
          nombre: this.nombre.value,
          cantidad: this.cantidad.value,
          listo: false,
          idusuario: user.uid
        }
        this.productoService.agregarProducto(product);
        this.modalController.dismiss();
      })
      
    }else{
      alert('Formulario invalido');
    }

  }

  closeModal(){
    this.modalController.dismiss();
  }

}
