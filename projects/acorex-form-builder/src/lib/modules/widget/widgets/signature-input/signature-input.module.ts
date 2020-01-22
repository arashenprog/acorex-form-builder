import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_ITEM_DATASOURCE_PROPERTY, AXF_DS_LIST_PROPERTY } from '../../config/general-properties';
import { AXFSignatureInputWidgetDesigner } from './designer/signature-input-widget.designer';
import { AXFSignatureInputWidgetPrint } from './print/signature-input-widget.print';
import { AXFSignatureInputWidgetView } from './view/signature-input-widget.view';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignaturePadPage } from './signaturepad.page';

export const COMPONENTS = [AXFSignatureInputWidgetDesigner, AXFSignatureInputWidgetPrint, AXFSignatureInputWidgetView,
    SignaturePadPage]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule, SignaturePadModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFSignatureInputWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: "Signature Box",
            hint: "Signature box element",
            icon: "fas fa-file-signature",
            category: "Editors",
            visible: true,
            name: "signature",
            designerClass: AXFSignatureInputWidgetDesigner,
            printClass: AXFSignatureInputWidgetPrint,
            viewClass: AXFSignatureInputWidgetView,
            options: {
                height: 100,
                width: 150,
            },
            properties: [
                {
                    name: "width",
                    category: "General",
                    defaultValue: "",
                    title: "Width (px)",
                    editor: "TextEditor"
                },
                {
                    name: "height",
                    category: "General",
                    defaultValue: "",
                    title: "Height (px)",
                    editor: "TextEditor"
                },
                {
                    name: "supervisior",
                    category: "General",
                    defaultValue:false,
                    title: "Supervisior",
                    editor: "CheckboxEditor",
                    options: { label:"Supervisior"}
                }
            ]
        })
    }
}