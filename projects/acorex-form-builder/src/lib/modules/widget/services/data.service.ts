import { Injectable } from '@angular/core';
import { AXFConnectService } from './connect.service';
import { PromisResult } from 'acorex-ui';

export interface VarItem {
    key: string, word: any;
}


const VARIABLES: VarItem[] = [];

@Injectable()
export class AXFDataService {

    constructor(private connectService: AXFConnectService) {

    }

    init(): Promise<any> {
        let p1 = new Promise((resolve) => {
            if (!VARIABLES.length) {
                this.connectService.send("getVarList").then(c => {
                    console.log("Load Variables ...")
                    VARIABLES.push(...c.items);
                    resolve()
                });
            }
        });
        return Promise.all([p1]);
    }

    getList(dataSourceName: String, params?: any): PromisResult<any[]> {
        return new PromisResult<any[]>((resolve) => {
            let keyValObject = {}
            if (params) {
                params.forEach(p => {
                    keyValObject[p.name] = p.value;
                });
            }

            this.connectService.send("getList", { name: dataSourceName, params: keyValObject }).then(c => {
                resolve(c.items);
            });
        });
    }


    getDSList(): PromisResult<any[]> {
        return this.getList("ds-list");
    }

    getWord(key: string): string {
        let item = VARIABLES.find(c => c.key == key)
        if (item)
            return item.word;
        return null;
    }
}