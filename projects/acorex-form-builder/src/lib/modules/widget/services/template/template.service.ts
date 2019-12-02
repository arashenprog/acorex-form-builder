
import { Injectable } from '@angular/core';
import { PromisResult, AXHtmlUtil } from 'acorex-ui';
import { AXFConnectService } from '../connect.service';
import { AXFWidgetService, WidgetConfig } from '../widget.service';
import { AXFDatabase, AXFTemplateModel } from '../db/database';



@Injectable()
export class AXFTemplateService {
    private _db: AXFDatabase;
    constructor(private connectService: AXFConnectService, private widgetService: AXFWidgetService) {
        this._db = new AXFDatabase();
    }


    public checkExists(name: string): PromisResult<boolean> {
        return new PromisResult((resolve) => {
            this._db.templates
                .where({ name: name })
                .count()
                .then((c) => {
                    resolve(c > 0);
                })
                .catch((c) => {
                    resolve(false);
                })
        })
    }

    public saveForm(name: string, type: "form" | "widget", widget: WidgetConfig, description?: string): PromisResult<boolean> {
        return new PromisResult((resolve) => {
            this._db.templates
                .add({
                    id: new Date().getTime(),
                    template: this.widgetService.serialize(widget),
                    name: name,
                    type: type
                })
                .then((c) => {
                    resolve(true);
                }).catch((c) => {
                    resolve(false);
                })
        })
    }

    public get(id: number): PromisResult<AXFTemplateModel> {
        return new PromisResult((resolve) => {
            this._db.templates
                .get(id)
                .then((c) => {
                    resolve(c);
                });
        })
    }



    public getFormList(): PromisResult<AXFTemplateModel[]> {
        return new PromisResult((resolve) => {
            this._db.templates
                .where({ type: "form" })
                .toArray()
                .then((result) => {
                    resolve(result);
                });
        })
    }

    public getWidgetList(): PromisResult<AXFTemplateModel[]> {

        return new PromisResult((resolve) => {
            this._db.templates
                .where({ type: "widget" })
                .toArray()
                .then((result) => {
                    resolve(result);
                });
        })
    }



}