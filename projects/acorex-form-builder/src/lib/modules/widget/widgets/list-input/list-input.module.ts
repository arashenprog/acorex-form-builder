import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_TEXT_PROPERTY, AXF_NAME_PROPERTY, AXF_BOX_STYLE_PROPERTY, AXF_STYLE_GENERAL_PROPERTIES, AXF_LABEL_PROPERTY, AXF_DS_LIST_PROPERTY, AXF_DS_MODE_PROPERTY, AXF_VALUE_CHANGE_EVENT, AXF_INIT_EVENT } from '../../config/general-properties';
import { AXFListInputWidgetDesigner } from './designer/list-input-widget.designer';
import { AXFListInputWidgetPrint } from './print/list-input-widget.print';
import { AXFListInputWidgetView } from './view/list-input-widget.view';
import { AXFBoxStyleBoxSizeValue } from '../../../property-editor/editors/style/box-style/box-style.class';
import { ContentItemsStructureEditor } from '../../../property-editor/editors/items/itemstructure.editor';

export const COMPONENTS = [AXFListInputWidgetDesigner, AXFListInputWidgetPrint, AXFListInputWidgetView]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFListInputWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: "List Input",
            hint: "List input element",
            icon: "fas fa-list",
            category: "Editors",
            visible: true,
            name: "list",
            designerClass: AXFListInputWidgetDesigner,
            printClass: AXFListInputWidgetPrint,
            viewClass: AXFListInputWidgetView,
            options: {
                boxStyle: {
                    border: new AXFBoxStyleBoxSizeValue("0"),
                    padding: new AXFBoxStyleBoxSizeValue("0"),
                    margin: new AXFBoxStyleBoxSizeValue("1")
                },
                bgColor: "#FFFFFF",
                items:{ types:[ new ContentItemsStructureEditor({id:"text",title:"Text",type:"string"})],
                        content:[]  
                    },
                mode: "single",
                direction: "horizontal",
                alignCheck: "left",
                showOther: false,
                viewType:"string"
            },
            properties: [
                {
                    name: "mode",
                    category: "General",
                    defaultValue: [],
                    title: "Mode",
                    editor: "SelectionEditor",
                    options: {
                        items: [{ value: "single", title: "Single" }, { value: "multiple", title: "Multiple" }
                            , { value: "unselectable", title: "Unselectable" }],
                        mode: "single",
                        direction: "horizontal"
                    }
                },
                {
                    name: "direction",
                    category: "General",
                    defaultValue: [],
                    title: "Direction",
                    editor: "SelectionEditor",
                    options: {
                        items: [{ value: "horizontal", title: "Horizontal" }, { value: "vertical", title: "Vertical" }],
                        mode: "single",
                        direction: "horizontal"
                    }
                },
                {
                    name: "alignCheck",
                    category: "General",
                    defaultValue: [],
                    title: "CheckBox/RadioButton Align",
                    editor: "SelectionEditor",
                    visible: (options: any) => {
                        return options.mode != "unselectable";
                    },
                    options: {
                        items: [{ value: "left", title: "Left" }, { value: "top", title: "Top" },
                        { value: "right", title: "Right" }, { value: "bottom", title: "Bottom" }],
                        mode: "single",
                        direction: "horizontal"
                    }
                },
                {
                    name: "viewType",
                    category: "General",
                    defaultValue: [],
                    title: "View Type",
                    editor: "SelectionEditor",
                    options: {
                        items: [{ value: "string", title: "Text" }, { value: "image", title: "Image" }, { value: "both", title: "Both" }],
                        mode: "single",
                        direction: "horizontal"
                    }
                },
                AXF_DS_MODE_PROPERTY,
                AXF_DS_LIST_PROPERTY,
                {
                    name: "keyField",
                    category: "Data",
                    defaultValue: "value",
                    title: "Key Field",
                    editor: "TextEditor",
                    visible: (options: any) => {
                        return options.dsMode == "ds";
                    }
                },
                {
                    name: "textField",
                    category: "Data",
                    defaultValue: "text",
                    title: "Text Field",
                    editor: "TextEditor",
                    visible: (options: any) => {
                        return options.dsMode == "ds";
                    }
                },
                {
                    name: "imageField",
                    category: "Data",
                    defaultValue: "image",
                    title: "Image Field",
                    editor: "TextEditor",
                    visible: (options: any) => {
                        return options.dsMode == "ds" && !options.viewType.includes("string");
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
                        viewType:"$viewType"
                    }
                }, 
                {
                    name: "showOther",
                    category: "General",
                    defaultValue:false,
                    title: "Show Other",
                    editor: "CheckboxEditor",
                    options: { label:"Show Other"}
                },
                AXF_BOX_STYLE_PROPERTY,
                AXF_NAME_PROPERTY,
                AXF_INIT_EVENT,
                AXF_VALUE_CHANGE_EVENT,
            ]
        })
    }
}