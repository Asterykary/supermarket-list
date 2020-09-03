import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  get user() {return this.auth.user}

  constructor(private navCtrl: NavController, private auth: AuthService) { }

  ngOnInit() {
  }

  iniciarSesion(){
    this.auth.loginGoogle();
  }

  
}
