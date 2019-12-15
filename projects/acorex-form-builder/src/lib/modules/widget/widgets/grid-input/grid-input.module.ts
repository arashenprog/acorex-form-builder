import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_TEXT_PROPERTY, AXF_NAME_PROPERTY, AXF_BOX_STYLE_PROPERTY, AXF_STYLE_GENERAL_PROPERTIES, AXF_LABEL_PROPERTY, AXF_DS_MODE_PROPERTY, AXF_DS_LIST_PROPERTY } from '../../config/general-properties';
import { AXFGridInputWidgetDesigner } from './designer/grid-input-widget.designer';
import { AXFGridInputWidgetPrint } from './print/grid-input-widget.print';
import { AXFGridInputWidgetView } from './view/grid-input-widget.view';
import { AXFBoxStyleBoxSizeValue } from '../../../property-editor/editors/style/box-style/box-style.class'; 
import { ContentItemsStructureEditor } from '../../../property-editor/editors/items/itemstructure.editor';

export const COMPONENTS = [AXFGridInputWidgetDesigner, AXFGridInputWidgetPrint, AXFGridInputWidgetView]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS], 
    providers: [],
})
export class AXFGridInputWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: "Grid Input",
            hint: "Grid input element",
            icon: "fas fa-table",
            category: "Editors",
            visible: true,
            name: "grid",
            designerClass: AXFGridInputWidgetDesigner,
            printClass: AXFGridInputWidgetPrint,
            viewClass: AXFGridInputWidgetView,
            options: {
                boxStyle: {
                    border: new AXFBoxStyleBoxSizeValue("1"),
                    padding: new AXFBoxStyleBoxSizeValue("0"),
                    margin: new AXFBoxStyleBoxSizeValue("1")
                },
                bgColor: "#FFFFFF",
                data:{columns:[new ContentItemsStructureEditor({id:"text",title:"Text", type: "string",isDs:true})]},  
                header:"",
                footer:"",
                items:{content:[]}
            },
            properties: [  
                {
                    name: "header",
                    category: "General",
                    defaultValue: "",
                    title: "Header Text",
                    editor: "TextEditor"
                },
                {
                    name: "footer",
                    category: "General",
                    defaultValue: "",
                    title: "Footer Text",
                    editor: "TextEditor"
                },                 
                AXF_DS_MODE_PROPERTY,
                AXF_DS_LIST_PROPERTY,
                {
                    name: "data",
                    category: "Data",
                    defaultValue: {},
                    title: "Column Management",
                    editor: "GridEditor" , 
                    options:{
                        dsMode:"$dsMode"
                    }
                },  
                {
                    name: "items",
                    category: "Data",
                    defaultValue: {},
                    title: "Items",
                    editor: "ItemsEditor",
                    visible: (options: any) => {
                        return options.dsMode == "manual";
                    },
                    options:{
                        columnInstance:"$data"
                    }
                },               
                AXF_BOX_STYLE_PROPERTY,
                AXF_NAME_PROPERTY,
            ]
        })
    }
}