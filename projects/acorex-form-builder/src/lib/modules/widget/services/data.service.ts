import { Injectable } from '@angular/core';
import { AXFConnectService } from './connect.service';
import { PromisResult } from 'acorex-ui';

export interface VarItem {
    key: string, word: any;
}

export interface DSItem {
    key: string, title: any;
}
const VARIABLES: VarItem[] = [];
const DATASOURCES: DSItem[] = [];

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
        let p2 = new Promise((resolve) => {
            if (!DATASOURCES.length) {
                this.connectService.send("getDSList").then(c => {
                    console.log("Load DataSources ...")
                    DATASOURCES.push(...c.items);
                    resolve()
                });
            }
        });

        return Promise.all([p1, p2]);
    }

    getList(dataSourceName: String, params?: any): PromisResult<any[]> {
        return new PromisResult<any[]>((resolve) => {
            this.connectService.send("getList", { name: dataSourceName, params: params }).then(c => {
                resolve(c.items);
            });
        });
    }


    getDSList(): DSItem[] {
        return DATASOURCES;
    }

    getWord(key: string): string {
        let item = VARIABLES.find(c => c.key == key)
        if (item)
            return item.word;
        return null;
    }
}