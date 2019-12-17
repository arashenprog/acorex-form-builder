
import { Injectable } from '@angular/core';
import { PromisResult, AXHtmlUtil } from 'acorex-ui';
import { AXFConnectService } from '../connect.service';
import { AXFWidgetService, WidgetConfig } from '../widget.service';
import { AXFDatabase, AXFTemplateModel } from '../db/database';
import { AXFTemplateService } from './template.service';



@Injectable()
export class AXFAPITemplateService extends AXFTemplateService {
    constructor(private connectService: AXFConnectService, private widgetService: AXFWidgetService) {
        super();
    }


    public checkExists(name: string): PromisResult<boolean> {
        return new PromisResult((resolve) => {
            resolve(false);
        })
    }

    public saveForm(name: string, type: "form" | "widget", widget: WidgetConfig, description?: string): PromisResult<boolean> {
        return new PromisResult((resolve) => {
            this.connectService.send("save", {
                name: name,
                type: type,
                description: description,
                template: this.widgetService.serialize(widget)
            }).then(() => {
                resolve(true);
            })
        })
    }

    public get(id: string): PromisResult<AXFTemplateModel> {
        return new PromisResult((resolve) => {
            this.connectService.send("load", {
                id: id,
            }).then((c) => {
                resolve({
                    id: id,
                    name: c.name,
                    template: c.widgets,
                    type: "form"
                });
            })
        })
    }

    public getFormList(): PromisResult<AXFTemplateModel[]> {
        return new PromisResult((resolve) => {
            this.connectService.send("getFormList", {
            }).then((c) => {
                resolve(c.items);
            })
        })
    }

    public getWidgetList(): PromisResult<AXFTemplateModel[]> {
        return new PromisResult((resolve) => {
            this.connectService.send("getWidgetList", {
            }).then((c) => {
                resolve(c.items);
            })
        })
    }



}