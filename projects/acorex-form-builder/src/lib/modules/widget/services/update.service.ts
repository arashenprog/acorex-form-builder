import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AXPopupService } from 'acorex-ui';

@Injectable({
    providedIn: 'root'
})
export class AXFUpdateService {
    constructor(private readonly updates: SwUpdate,private popupService:AXPopupService) { 
         
        
        if(this.updates.isEnabled)
        { 
            alert('isEnabled'+this.updates.isEnabled)
            this.updates.available.subscribe(event=>{
                
                alert('current'+event.current)
                if (event.current !== event.available)
                {
                    this.showAppUpdateAlert();
                }
            }) 
        } 
    }
  
    showAppUpdateAlert() {
        // const header = 'App Update available';
        // const message = 'Choose Ok to update';
        // const action = this.doAppUpdate;
        // const caller = this;
        // // Use MatDialog or ionicframework's AlertController or similar
        // presentAlert(header, message, action, caller);

        if(confirm('update available for the app please confirm'))
        {
            this.doAppUpdate();
        }
    }
    doAppUpdate() {
        this.updates.activateUpdate().then(() => document.location.reload());
    }
}