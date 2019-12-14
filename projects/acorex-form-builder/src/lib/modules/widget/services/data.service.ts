import { Injectable } from '@angular/core';
import { AXFConnectService } from './connect.service';
import { PromisResult } from 'acorex-ui';
import { AXFFormService } from './form.service';

export interface VarItem {
    key: string, word: any;
}


const VARIABLES: VarItem[] = [];

@Injectable()
export class AXFDataService {

    constructor(private connectService: AXFConnectService,private formService:AXFFormService) {

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
                    if(typeof p.value==="string" && p.value.match(/\$([a-zA-Z1-9])+/))
                    {
                        keyValObject[p.name] = this.formService.getValue(p.value.substring(1));
                    }
                    else
                    {
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
        let item = VARIABLES.find(c => c.key == key)
        if (item)
            return item.word;
        return null;
    }
}