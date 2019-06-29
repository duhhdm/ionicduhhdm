import { Injectable } from "@angular/core";
import { HttpHandler, HttpRequest, HttpInterceptor, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular/components/alert/alert-controller";



@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    
    constructor(public storage: StorageService, public alertCtrl: AlertController){

    }

    intercept(req: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req).catch((error, caught)=>{
            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }

            if(!errorObj.status){
                errorObj=JSON.parse(errorObj);
            }
            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);
            
            switch(error.status){
                case 401:
                    this.handle401();
                break;
                
                case 403:
                    this.handle403();
                break;
                default:
                    this.handleDefaultError(errorObj);
                break;
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    handle401(){
        let alert = this.alertCtrl.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorreta',
            enableBackdropDismiss: false,
            buttons: [{text:'Ok'}]
                
        });
        alert.present();
    }

    handle403(){
        this.storage.setLocalUser(null);
    }

    handleDefaultError(obj){
        let alert = this.alertCtrl.create({
            title: obj.status + ': '+ obj.error,
            message: obj.message,
            enableBackdropDismiss: false,
            buttons: [{text:'Ok'}]
                
        });
        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};