import { Injectable } from '@angular/core';
import { PromisResult, AXMathUtil, AXHtmlUtil } from 'acorex-ui';

@Injectable({ providedIn: "root" })
export class AXFConnectService {

    private messageQueue: { action: string, reqId: string, callback: Function }[] = [];

    constructor() {
        window.addEventListener("message", this.handMessageEvent.bind(this));
    }


    public send(action: string, options?: any): PromisResult<any> {
        return new PromisResult((resolve) => {
            let reqId = AXHtmlUtil.getUID();
            window.top.postMessage({
                action: action,
                data: options,
                reqId: reqId
            }, '*');
            this.messageQueue.push({
                action: action,
                callback: resolve,
                reqId: reqId
            })
        });
    }

    private handMessageEvent(e: MessageEvent) {
        if (e.data && e.data.action && e.data.reqId) {
            let msg = this.messageQueue.find(c => c.reqId == e.data.reqId && c.action == e.data.action);
            if (msg) {
                msg.callback(e.data ? e.data.data : null);
                this.messageQueue = this.messageQueue.filter(c => !(c.reqId == e.data.reqId && c.action == e.data.action));
            }
        };
    }

    ngOnDestroy(): void {
        window.removeEventListener("message", this.handMessageEvent);
    }


}