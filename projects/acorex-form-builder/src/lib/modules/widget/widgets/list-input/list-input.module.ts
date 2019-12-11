import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_TEXT_PROPERTY, AXF_NAME_PROPERTY, AXF_BOX_STYLE_PROPERTY, AXF_STYLE_GENERAL_PROPERTIES, AXF_LABEL_PROPERTY, AXF_DS_LIST_PROPERTY, AXF_DS_MODE_PROPERTY } from '../../config/general-properties';
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
                items:{ types:[ new ContentItemsStructureEditor({id:"text",title:"Text",type:"string"}),
                                new ContentItemsStructureEditor({id:"image",title:"Image",type:"image"})],
                        content:[] 
                    },
                mode: "single",
                direction: "horizontal",
                fillBy: "manualList",
                value: [1],
                alignCheck: "left",
                showOther: false
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
                    //visible:false,
                    options: {
                        items: [{ value: "left", title: "Left" }, { value: "top", title: "Top" },
                        { value: "right", title: "Right" }, { value: "bottom", title: "Bottom" }],
                        mode: "single",
                        direction: "horizontal"
                    }
                },
                {
                    name: "fillBy",
                    category: "General",
                    defaultValue: [],
                    title: "Fill By",
                    editor: "SelectionEditor",
                    options: {
                        items: [{ value: "manualList", title: "Manual List" }, { value: "databaseList", title: "Database List" }],
                        mode: "single",
                        direction: "horizontal"
                    }
                },
                AXF_DS_MODE_PROPERTY,
                AXF_DS_LIST_PROPERTY,
                {
                    name: "items",
                    category: "Data",
                    defaultValue: {},
                    title: "Items",
<<<<<<< HEAD
                    editor: "ItemsEditor"
                }, 
                {
                    name: "showOther",
                    category: "General",
                    defaultValue:false,
                    title: "Show Other",
                    editor: "CheckboxEditor",
                    options: { label:"Show Other"}
=======
                    editor: "ItemsEditor",
                    visible: (options: any) => {
                        return options.dsMode == "manual"
                    },
                    options: {
                        imagable: true,
                        otherable: true
                    }
>>>>>>> 9d146ed811848b4b6a02ed1d694453fd5aaadbc1
                },
                AXF_BOX_STYLE_PROPERTY,
                AXF_NAME_PROPERTY,
            ]
        })
    }
}