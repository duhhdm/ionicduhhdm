import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/cliente.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService{
    url: string = API_CONFIG.baseUrl; 
    constructor(public http: HttpClient, public storage: StorageService){

    }

    findByEmail(email: string): Observable<ClienteDTO>{
        return this.http.get<ClienteDTO>(this.url+`/clientes/email/${email}`);
    }

    getImageFromBucket(id : string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
        return this.http.get(url, {responseType : `blob`});
    }
}