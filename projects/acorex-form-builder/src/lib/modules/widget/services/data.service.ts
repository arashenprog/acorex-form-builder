import { Injectable } from '@angular/core';
import { AXFConnectService } from './connect.service';
import { PromisResult } from 'acorex-ui';

@Injectable({ providedIn: "root" })
export class AXFDataService {

    constructor(private connectService: AXFConnectService) {

    }

    fetch(dataSourceName: String): PromisResult<any[]> {
        return new PromisResult<any[]>((resolve) => {
            this.connectService.send("getList", { name: dataSourceName }).then(c => {
                resolve(c.items);
            });
        });
    }
}