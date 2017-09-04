import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { LabelService } from '../labels/label.service';

@Injectable()
export abstract class AuthenticationService {
    
    private authenticated = false;
    private username = null;
    private password = null;

    constructor(protected labels: LabelService) { }

    public authenticate(url: string) {
        let service = this;
        return Observable.create(obs => {
            if (!service.authenticated) {
                service.popup(url).subscribe(
                    (x) => {
                        obs._next(service.buildBasicAuthorization());
                    },
                    (e) => obs._error(e),
                    () => obs._complete()
                );
            } else {
                obs._next(service.buildBasicAuthorization());
            }
        });
    }
    
    public buildBasicAuthorization(){
        return 'Basic ' + btoa(this.username + ':' + this.password);
    }
    
    private clearPopup(){
        while(document.querySelector('#authentication-container')){
            let container = document.querySelector('#authentication-container');
            container.parentElement.removeChild(container);
        }
    }

    public popup(url: string) {
        
        this.clearPopup();
        
        let service = this;
        
        let container = document.createElement('div');
        container.setAttribute('id', 'authentication-container');
        document.querySelector('body').appendChild(container);
        
        let form = document.createElement('form');
        container.appendChild(form);
        
        let fieldset1 = document.createElement('fieldset');
        form.appendChild(fieldset1);
        
        let mailLabel = document.createElement('label');
        fieldset1.appendChild(mailLabel);
        mailLabel.setAttribute('for','email');
        mailLabel.innerHTML = this.labels.gb('authentication.popup.label.email');
        
        let mail = document.createElement('input');
        mail.setAttribute('type','email');
        mail.setAttribute('id','email');
        fieldset1.appendChild(mail);
        mail.focus();
  
        let fieldset2 = document.createElement('fieldset');
        form.appendChild(fieldset2);
        
        let passwordLabel = document.createElement('label');
        fieldset2.appendChild(passwordLabel);
        passwordLabel.setAttribute('for','password');
        passwordLabel.innerHTML = this.labels.gb('authentication.popup.label.password');
        
        let password = document.createElement('input');
        password.setAttribute('type','password');
        password.setAttribute('id','password');
        fieldset2.appendChild(password);
        
        let fieldset3 = document.createElement('fieldset');
        form.appendChild(fieldset3);
        let button = document.createElement('input');
        button.setAttribute('type','button');
        button.value = this.labels.gb('authentication.popup.label.connection');
        fieldset3.appendChild(button);
        
        mail.onkeydown = password.onkeydown = (e) => {
            if (e.keyCode == 13) {
                button.click();
            }
                
        }
        
        return Observable.create(obs => {
               button.onclick = (evt) => {
               if(mail.value.length > 0 && password.value.length > 0){
                   service.username = mail.value;
                   service.password = password.value;
                   let req = new XMLHttpRequest();
                   req.onreadystatechange = function(event) {
                        // XMLHttpRequest.DONE === 4
                        if (this.readyState === XMLHttpRequest.DONE) {
                            if (this.status === 200) {
                                service.authenticated = true;
                                service.clearPopup();
                                obs._next();
                            } else if (this.status === 401){
                                mail.value = '';
                                password.value = '';
                                service.username = '';
                                service.password = '';
                            } else {
                                alert('Accès impossible ! Un problème a eu lieu durant l\'authenthification');
                                obs._next();
                                obs._complete();
                            }
                        }
                    };
                    // we make a synchronous call
                    req.open('GET', url, true);
                    req.setRequestHeader("Authorization", service.buildBasicAuthorization());
                    req.withCredentials = true;
                    req.send(null);
               } 
            };     
        });
    }
}
