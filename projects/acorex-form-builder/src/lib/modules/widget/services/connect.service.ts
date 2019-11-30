import { Injectable } from '@angular/core';
import { PromisResult } from 'acorex-ui';

@Injectable({ providedIn: "root" })
export class AXFConnectService {

    private messageQueue: { action: string, callback: Function }[] = [];

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
        if (action == "getDSList") {
            let list: any[] = [{ key: "company-name", title: "Staff List" }, { key: "question-list", title: "Questions" }]
            return PromisResult.resolve({
                items: list
            });
        }
        if (action == "getList" && options && options.name) {
            if (options.name == "template-list") {
                return PromisResult.resolve({
                    items: [
                        {
                            value: '1',
                            title: "Template 1"
                        },
                        {
                            value: "2",
                            title: "Template 2"
                        }
                    ],
                    count: 2
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
                callback: resolve
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