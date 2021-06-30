import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Device {

    is(): boolean {
        return true;
    }
}