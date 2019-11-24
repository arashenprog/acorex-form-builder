import { Injectable } from '@angular/core';
import { AXFConnectService } from './connect.service';
import { PromisResult } from 'acorex-ui';

export interface VarItem {
    key: string, value: any;
}
const VARIABLES: VarItem[] = [];

@Injectable({ providedIn: "root" })
export class AXFDataService {

    constructor(private connectService: AXFConnectService) {
        this.init();
    }

    private init(): void {
        if (!VARIABLES.length) {
            this.connectService.send("getVars").then(c => {
                console.log("fill variables");
                VARIABLES.push(...c.items);
            });
        }
    }

    getList(dataSourceName: String, params?: any): PromisResult<any[]> {
        return new PromisResult<any[]>((resolve) => {
            this.connectService.send("getList", { name: dataSourceName, params: params }).then(c => {
                resolve(c.items);
            });
        });
    }

    getWord(key: string): string {
        let item = VARIABLES.find(c => c.key == key)
        if (item)
            return item.value;
        return null;
    }
}