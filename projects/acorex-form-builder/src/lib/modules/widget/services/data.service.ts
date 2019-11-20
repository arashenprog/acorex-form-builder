import { Injectable } from '@angular/core';
import { AXFConnectService } from './connect.service';

@Injectable({ providedIn: "root" })
export class AXFDataService {

    constructor(private connectService:AXFConnectService) {
        
    }

    
}