import { Injectable } from '@angular/core';
import { PromisResult, AXMathUtil, AXHtmlUtil, EventService } from 'acorex-ui';

@Injectable({ providedIn: 'root' })
export class AXFConnectService {

    private messageQueue: { action: string, reqId: string, callback: Function }[] = [];

    constructor(private eventService: EventService) {
        window.addEventListener('message', this.handMessageEvent.bind(this));

    }


    public send(action: string, options?: any): Promise<any> {
        const urlParams = new URLSearchParams(window.location.search);
        const uid = urlParams.get('uid');
        return new Promise((resolve) => {
            let reqId = AXHtmlUtil.getUID();
            window.parent.postMessage({
                uid: uid,
                action: action,
                data: options ? JSON.stringify(options) : null,
                reqId: reqId
            }, '*');
            this.messageQueue.push({
                action: action,
                callback: resolve,
                reqId: reqId
            });
        });
    }

    private handMessageEvent(e: MessageEvent) {
        if (e.data && e.data.action && e.data.reqId) {
            let msg = this.messageQueue.find(c => c.reqId == e.data.reqId && c.action == e.data.action);
            if (msg) {
                msg.callback((e.data && e.data.data) ? JSON.parse(e.data.data) : null);
                this.messageQueue = this.messageQueue.filter(c => !(c.reqId == e.data.reqId && c.action == e.data.action));
            }
        }
        else if (e.data && e.data.action) {
            this.eventService.broadcast(`__${e.data.action}`, e.data.data);
        }
    }

    ngOnDestroy(): void {
        window.removeEventListener('message', this.handMessageEvent);
    }
}