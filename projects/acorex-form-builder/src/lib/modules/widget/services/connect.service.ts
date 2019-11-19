import { Injectable } from '@angular/core';
import { PromisResult } from 'acorex-ui';

@Injectable({ providedIn: "root" })
export class AXFConnectService {

    private messageQueue: { action: string, callback: Function }[] = [];

    constructor() {
        window.addEventListener("message", this.handMessageEvent.bind(this));
    }


    public send(action: string, data?: any): PromisResult<any> {
        return new PromisResult((resolve) => {
            window.parent.postMessage({
                action: action,
                data: data
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