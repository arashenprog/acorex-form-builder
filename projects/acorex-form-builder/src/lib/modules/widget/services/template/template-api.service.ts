
import { Injectable } from '@angular/core';
import { PromisResult } from 'acorex-ui';
import { AXFConnectService } from '../connect.service';
import { AXFWidgetService } from '../widget.service';
import { AXFTemplateModel, AFXSaveTemplateModel } from '../db/database';
import { AXFTemplateService } from './template.service';
import { Subject, Observable } from 'rxjs';



@Injectable()
export class AXFAPITemplateService extends AXFTemplateService {

    private cacheList: AXFTemplateModel[] = [];
    private statusSubject = new Subject<boolean>();

    constructor(private connectService: AXFConnectService, private widgetService: AXFWidgetService) {
        super();
    }


    loadingEvent(): Observable<boolean> {
        return this.statusSubject.asObservable();
    }


    private emitLoadingEvent(): void {
        this.statusSubject.next(this.cacheList.some(c => c.template == null));
    }

    public saveForm(prm: AFXSaveTemplateModel): PromisResult<boolean> {
        return new PromisResult((resolve) => {
            this.connectService.send('save', {
                name: prm.name,
                type: prm.type,
                description: prm.description,
                template: this.widgetService.serialize(prm.widget),
                printHtml: prm.printHtml
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

    public get(id: string): PromisResult<AXFTemplateModel> {
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
                resolve(w);
                this.emitLoadingEvent();
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
