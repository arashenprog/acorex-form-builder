import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXFSignatureInputWidgetDesigner } from './designer/signature-input-widget.designer';
import { AXFSignatureInputWidgetPrint } from './print/signature-input-widget.print';
import { AXFSignatureInputWidgetView } from './view/signature-input-widget.view';
import { SignaturePadModule } from 'angular2-signaturepad';

export const COMPONENTS = [AXFSignatureInputWidgetDesigner, AXFSignatureInputWidgetPrint, AXFSignatureInputWidgetView]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule,SignaturePadModule],
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
                height:100,
                width:150 ,
                info:{ 
                    SignatureType:"supervisor",
                    StaffNumber:1,
                    ShowType:["item"],
                    Items:[{ Value:1,Text: "Name",Type:"String",Visible:true }, 
                           { Value:2,Text: "Date",Type:"Date",Visible:true},
                           { Value:3,Text: "Signature",Type:"Signature",Visible:true}],
                 }
            },
            properties: [ 
                {
                    name: "width",
                    category: "General",
                    defaultValue: "100",
                    title: "Width (px)",
                    editor: "TextEditor"
                },
                {
                    name: "height",
                    category: "General",
                    defaultValue: "100",
                    title: "Height (px)",
                    editor: "TextEditor"
                }     , 
                {
                    name: "info",
                    category: "General",
                    defaultValue: {},
                    title: "Info",
                    editor: "SignatureEditor" 
                }
            ]
        })
    }
}