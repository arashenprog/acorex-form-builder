import { Injectable } from '@angular/core';
import { AXFConnectService } from './connect.service';
import { PromisResult } from 'acorex-ui';
import { AXFFormService } from './form.service';

export interface VarItem {
    value: string, text: any;
}


const VARIABLES: VarItem[] = [];

@Injectable()
export class AXFDataService {

    constructor(private connectService: AXFConnectService, private formService: AXFFormService) {

    }

    init(): Promise<any> {
        let p1 = new Promise((resolve) => {
            if (!VARIABLES.length) {
                this.connectService.send("getVarList").then(c => {
                    console.log("Load Variables ...")
                    if (c && c.items)
                        VARIABLES.push(...c.items);
                    resolve()
                });
            }
        });
        return Promise.all([p1]);
    }

    getList(dataSourceName: String, params?: any): PromisResult<any[]> {
        return new PromisResult<any[]>((resolve) => {
            debugger;
            let keyValObject = {}
            if (params) {
                params.forEach(p => {
                    if (typeof p.value === "string" && p.value.match(/\$([a-zA-Z1-9])+/)) {
                        keyValObject[p.name] = this.formService.getValue(p.value.substring(1));
                    }
                    else {
                        keyValObject[p.name] = p.value;
                    }
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
        let item = VARIABLES.find(c => c.value == key)
        if (item)
            return item.text;
        return null;
    }
}