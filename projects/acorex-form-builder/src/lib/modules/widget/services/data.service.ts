import { Injectable } from '@angular/core';
import { AXFConnectService } from './connect.service';
import { PromisResult } from 'acorex-ui';
import { AXFFormService } from './form.service';

// export interface VarItem {
//     value: string, text: any;
// }


// const VARIABLES: VarItem[] = [];

@Injectable({ providedIn: "root" })
export class AXFDataService {

    private vars: any = {};

    constructor(private connectService: AXFConnectService, private formService: AXFFormService) {

    }

    init(): Promise<any> {
        let p1 = new Promise((resolve) => {
            this.connectService.send("getVarList").then(c => {
                console.log("Load Variables ...", c)
                this.vars = c;
                resolve()
            });
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
        return this.resolvePropName(key, this.vars)
    }

    private resolvePropName(path, obj = self, separator = '.'): any {
        let properties = Array.isArray(path) ? path : path.split(separator)
        return properties.reduce((prev, curr) => prev && prev[curr], obj)
    }
}