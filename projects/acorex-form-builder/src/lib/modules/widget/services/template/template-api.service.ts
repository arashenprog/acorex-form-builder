
import { Injectable } from '@angular/core';
import { PromisResult, AXHtmlUtil } from 'acorex-ui';
import { AXFConnectService } from '../connect.service';
import { AXFWidgetService, WidgetConfig } from '../widget.service';
import { AXFTemplateModel } from '../db/database';
import { AXFTemplateService } from './template.service';
import { Subject, Observable } from 'rxjs';



@Injectable()
export class AXFAPITemplateService extends AXFTemplateService {

    private cacheList: AXFTemplateModel[] = [];
    private statusSubject = new Subject<boolean>();

    constructor(private connectService: AXFConnectService, private widgetService: AXFWidgetService) {
        super();
    }


    public checkExists(name: string): PromisResult<boolean> {
        return new PromisResult((resolve) => {
            resolve(false);
        });
    }


    loadingEvent(): Observable<boolean> {
        return this.statusSubject.asObservable();
    }


    private emitLoadingEvent(): void {
        this.statusSubject.next(this.cacheList.some(c => c.template == null));
    }

    public saveForm(name: string, type: 'form' | 'widget', widget: WidgetConfig, description?: string): PromisResult<boolean> {
        return new PromisResult((resolve) => {
            this.connectService.send('save', {
                name,
                type,
                description,
                template: this.widgetService.serialize(widget)
            }).then(() => {
                resolve(true);
            });
        });
    }

    public load(): PromisResult<AXFTemplateModel> {
        const w: AXFTemplateModel = {
            id: 'ffffffffffff',
            name: '',
            type: 'form',
        };
        this.cacheList.push(w);
        this.emitLoadingEvent();
        return new PromisResult((resolve) => {
            this.connectService.send('load').then((c) => {
                w.name = c.name;
                w.template = c.widgets;
                resolve(w);
                this.emitLoadingEvent();
            });
        });
    }

    public get(id: string, findName?: boolean): PromisResult<AXFTemplateModel> {
        if (this.cacheList.some(c => c.id === id && c.template)) {
            const tpl = this.cacheList.find(c => c.id === id && c.template);
            // clone
            const clone = JSON.parse(JSON.stringify(tpl));
            return PromisResult.resolve(clone);
        }
        const w: AXFTemplateModel = {
            id,
            name: '',
            type: 'widget',
        };
        this.cacheList.push(w);
        this.emitLoadingEvent();
        //
        return new PromisResult((resolve) => {
            this.connectService.send('load', {
                id,
            }).then((c) => {
                w.template = c.widgets;
                w.name = c.name;
                // if (!w.name && findName) {
                //     this.getWidgetList().then(ll => {
                //         const ww = ll.find(i => i.id === id);
                //         console.log('map widget', ww, ll, id);
                //         if (ww) {
                //             w.name = ww.name;
                //         }
                //         resolve(w);
                        
                //         this.emitLoadingEvent();
                //     });
                // } else {
                    resolve(w);
                    this.emitLoadingEvent();
                // }
            });
        });
    }

    public getFormList(): PromisResult<AXFTemplateModel[]> {
        return new PromisResult((resolve) => {
            this.connectService.send('getFormList', {
            }).then((c) => {
                resolve(c.items);
            });
        });
    }

    public getWidgetList(): PromisResult<AXFTemplateModel[]> {
        return new PromisResult((resolve) => {
            this.connectService.send('getWidgetList', {
            }).then((c) => {
                resolve(c.items);
            });
        });
    }
}
