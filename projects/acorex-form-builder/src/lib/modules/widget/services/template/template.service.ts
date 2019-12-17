
import { Injectable } from '@angular/core';
import { PromisResult, AXHtmlUtil } from 'acorex-ui';
import { AXFConnectService } from '../connect.service';
import { AXFWidgetService, WidgetConfig } from '../widget.service';
import { AXFDatabase, AXFTemplateModel } from '../db/database';



export abstract class AXFTemplateService {

    abstract checkExists(name: string): PromisResult<boolean>;

    abstract saveForm(name: string, type: "form" | "widget", widget: WidgetConfig, description?: string): PromisResult<boolean>;

    abstract get(id: string): PromisResult<AXFTemplateModel>;

    abstract getFormList(): PromisResult<AXFTemplateModel[]>;

    abstract getWidgetList(): PromisResult<AXFTemplateModel[]>;

}