import { Injectable } from '@angular/core';
import { AXHtmlUtil, EventService } from 'acorex-ui';

@Injectable({ providedIn: 'root' })
export class AXFConnectService {

    private messageQueue: { action: string, reqId: string, resolve: (data: any) => void, reject: () => void }[] = [];

    constructor(private eventService: EventService) {
        window.addEventListener('message', this.handMessageEvent.bind(this));

    }


    public send(action: string, options?: any): Promise<any> {
        const urlParams = new URLSearchParams(window.location.search);
        const uid = urlParams.get('uid');
        return new Promise((resolve, reject) => {
            const reqId = AXHtmlUtil.getUID();
            window.parent.postMessage({
                uid,
                action,
                data: options ? JSON.stringify(options) : null,
                reqId
            }, '*');
            this.messageQueue.push({
                action,
                resolve,
                reject,
                reqId
            });
        });
    }

    private handMessageEvent(e: MessageEvent) {
        if (e.data && e.data.action && e.data.reqId) {
            const msg = this.messageQueue.find(c => c.reqId === e.data.reqId && c.action === e.data.action);
            if (msg) {
                if (e.data.reject) {
                    if (msg.reject) {
                        msg.reject();
                    }
                } else {
                    msg.resolve((e.data && e.data.data) ? JSON.parse(e.data.data) : null);
                }
                this.messageQueue = this.messageQueue.filter(c => !(c.reqId === e.data.reqId && c.action === e.data.action));
            }
        } else if (e.data && e.data.action) {
            this.eventService.broadcast(`__${e.data.action}`, e.data.data);
        }
    }

    ngOnDestroy(): void {
        window.removeEventListener('message', this.handMessageEvent);
    }
}
