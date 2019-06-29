import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";
@Injectable()
export class AuthService{
    url : string = API_CONFIG.baseUrl;
    jwtHelper: JwtHelper = new JwtHelper();
    constructor(
        public http: HttpClient,
        public storage: StorageService
    ){}



    Authenticate(creds : CredenciaisDTO){
        return this.http.post(this.url+"/login",
            creds,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    refreshToken(){
        return this.http.post(this.url+"/auth/refresh_token",
            {},
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    successfulLogin(authorizationValue : string){
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token : tok,
            email : this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }


}