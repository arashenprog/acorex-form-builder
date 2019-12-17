
import { Injectable } from '@angular/core';
import { PromisResult, AXHtmlUtil } from 'acorex-ui';
import { AXFConnectService } from '../connect.service';
import { AXFWidgetService, WidgetConfig } from '../widget.service';
import { AXFDatabase, AXFTemplateModel } from '../db/database';
import { AXFTemplateService } from './template.service';



@Injectable()
export class AXFDBTemplateService extends AXFTemplateService {
    private _db: AXFDatabase;
    constructor(private widgetService: AXFWidgetService) {
        super();
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
                    console.error(c);
                    resolve(false);
                })
        })
    }

    public saveForm(name: string, type: "form" | "widget", widget: WidgetConfig, description?: string): PromisResult<boolean> {
        return new PromisResult((resolve) => {

            this._db.templates
                .where({ name: name })
                .first()
                .then((c) => {
                    if (c) {
                        this._db.templates.delete(c.id).then(g => {
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
                                    console.error(c);
                                    resolve(false);
                                })
                        })
                            .catch((c) => {
                                console.error(c);
                                resolve(false);
                            })
                    }
                    else {
                        this._db.templates
                            .put({
                                id: new Date().getTime(),
                                template: this.widgetService.serialize(widget),
                                name: name,
                                type: type
                            })
                            .then((c) => {
                                resolve(true);
                            }).catch((c) => {
                                console.error(c);
                                resolve(false);
                            })
                    }
                })
                .catch((c) => {
                    console.error(c);
                    resolve(false);
                })
        })
    }

    public get(id: string): PromisResult<AXFTemplateModel> {
        return new PromisResult((resolve) => {
            this._db.templates
                .get(Number(id))
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