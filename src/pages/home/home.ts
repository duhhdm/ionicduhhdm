import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService) {

  }

  login(){
    this.auth.Authenticate(this.creds)
      .subscribe(response =>{
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
    error =>{
      
    });
    console.log("usuario "+ this.creds.email+ " senha "+ this.creds.senha);
    
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter(){
    this.auth.refreshToken()
      .subscribe(response =>{
        console.log(this.auth.successfulLogin(response.headers.get('Authorization')));
        this.navCtrl.setRoot('CategoriasPage');
        
      },
    error =>{
      
    });
    
  }

}
