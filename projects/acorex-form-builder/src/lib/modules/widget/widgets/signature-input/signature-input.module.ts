import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_ITEM_DATASOURCE_PROPERTY } from '../../config/general-properties';
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
                dataSource: {
                    mode: "manual",
                    dataSource: {},
                    columns: [
                        {
                            fieldName: "name",
                            title: "Name",
                            type: "string",
                            fillByUser: false,
                        },
                        {
                            fieldName: "date",
                            title: "Date",
                            type: "date",
                            fillByUser: true,
                        },
                        {
                            fieldName: "signature",
                            title: "Signature",
                            type: "signature",
                            fillByUser: true,
                        }
                    ],
                    dataItems: [
                        {
                            date: new Date().getTime(),
                            name: "Item 1",
                            signature: ""
                        }
                    ] 
                },
                status:"single",
                showType:"table"
                 //     SignatureType:"supervisor",
                    //     StaffNumber:1,
                    //     ShowType:["item"],
                    //     Items:[{ value:1,text: "Name",signature:"" }, 
                    //            { value:2,Text: "Date",Type:"Date",Visible:true},
                    //            { Value:3,Text: "Signature",Type:"Signature",Visible:true}],
            },
            properties: [
                {
                    name: "status",
                    category: "General",
                    title: "Status",
                    editor: "SelectionEditor",
                    options: {
                        items: [{ value: "single", title: "Single" }, { value: "multiple", title: "Multiple" }],
                        mode: "single",
                        direction: "horizontal"
                    }
                },
                {
                    name: "showType",
                    category: "General",
                    title: "Show Type",
                    editor: "SelectionEditor",
                    options: {
                        items: [{ value: "table", title: "Table" }, { value: "item", title: "Item" }],
                        mode: "single",
                        direction: "horizontal"
                    }
                },
                AXF_ITEM_DATASOURCE_PROPERTY
            ]
        })
    }
}