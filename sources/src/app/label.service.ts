import { Injectable } from '@angular/core';

@Injectable()
export abstract class LabelService {

    private lang = 'fr';
    private labels = {
        "authentication.popup.label.email" : {
            "en" : "email",
            "fr" : "courriel"    
        },
        "authentication.popup.label.password" : {
            "en" : "password",
            "fr" : "mot de passe"    
        },
        "authentication.popup.label.connection" : {
            "en" : "connect",
            "fr" : "se connecter"    
        }    
    }

    constructor() { }
    
    public gb(key: string) {
        if(this.labels[key]){
            return this.labels[key][this.lang]; 
        }
        return "";    
    }
}
