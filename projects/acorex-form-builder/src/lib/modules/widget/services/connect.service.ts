import { Injectable } from '@angular/core';
import { PromisResult, AXMathUtil, AXHtmlUtil } from 'acorex-ui';

@Injectable({ providedIn: "root" })
export class AXFConnectService {

    private messageQueue: { action: string, id: string, callback: Function }[] = [];

    constructor() {
        window.addEventListener("message", this.handMessageEvent.bind(this));
    }


    public send(action: string, options?: any): PromisResult<any> {
        return new PromisResult((resolve) => {
            window.top.postMessage({
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
                msg.callback(e.data ? e.data.data : null);
                this.messageQueue = this.messageQueue.filter(c => c.action != e.data.action);
            }
        };
    }

    ngOnDestroy(): void {
        window.removeEventListener("message", this.handMessageEvent);
    }


}