import { Injectable } from '@angular/core';
import { PromisResult, AXMathUtil, AXHtmlUtil } from 'acorex-ui';

@Injectable({ providedIn: "root" })
export class AXFConnectService {

    private messageQueue: { action: string, id: string, callback: Function }[] = [];

    constructor() {
        window.addEventListener("message", this.handMessageEvent.bind(this));
    }


    public send(action: string, options?: any): PromisResult<any> {
        // Mock Lists
        if (action == "getVarList") {
            let list: any[] = [{ key: "company-name", word: "Safetyminder" }, { key: "staff-name", word: "Arash" }]
            return PromisResult.resolve({
                items: list
            });
        }

        if (action == "getList" && options && options.name) {
            if (options.name == "ds-list") {
                let list: any[] = [
                    { value: "countries", title: "Countries" },
                    { value: "cities", title: "Cities", params: ["countryId"] }
                ]
                return PromisResult.resolve({
                    items: list
                });
            }
            if (options.name == "countries") {
                return PromisResult.resolve({
                    items: [
                        {
                            value: '1',
                            text: "Iran"
                        },
                        {
                            value: "2",
                            text: "Iraq"
                        },
                        {
                            value: "3",
                            text: "Turkey"
                        }
                    ],
                    count: 3
                });
            }
            if (options.name == "cities") {
                let list = [
                    {
                        value: '1',
                        text: "Isfahan",
                        countryId: "1"
                    },
                    {
                        value: "2",
                        text: "Tehran",
                        countryId: "1"
                    },
                    {
                        value: "3",
                        text: "Shiraz",
                        countryId: "1"
                    },
                    {
                        value: "4",
                        text: "Baghdad",
                        countryId: "2"
                    },
                    {
                        value: "5",
                        text: "Karbala",
                        countryId: "2"
                    },
                    {
                        value: "6",
                        text: "Antaliya",
                        countryId: "3"
                    },
                    {
                        value: "7",
                        text: "Analiya",
                        countryId: "3"
                    },
                    {
                        value: "8",
                        text: "Istanbul",
                        countryId: "3"
                    },
                ]
                debugger;
                return PromisResult.resolve({
                    items: list.filter(c => options.params == null || options.params.countryId == c.countryId),
                    count: 8
                });
            }
        }
        //
        return new PromisResult((resolve) => {
            window.parent.postMessage({
                action: action,
                data: options
            }, '*');
            this.messageQueue.push({
                action: action,
                callback: resolve,
                id: AXHtmlUtil.getUID()
            })
        });
    }

    private handMessageEvent(e: MessageEvent) {
        if (e.data && e.data.action) {
            let msg = this.messageQueue.find(c => c.action == e.data.action);
            if (msg) {
                msg.callback(e.data.data);
                this.messageQueue = this.messageQueue.filter(c => c.action != e.data.action);
            }
        };
    }

    ngOnDestroy(): void {
        window.removeEventListener("message", this.handMessageEvent);
    }


}