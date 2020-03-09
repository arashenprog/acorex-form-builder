import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_NAME_PROPERTY, AXF_BOX_STYLE_PROPERTY, AXF_VALUE_CHANGE_EVENT, AXF_INIT_EVENT, AXF_ITEM_DATASOURCE_PROPERTY, AXF_VISIBLE_PROPERTY } from '../../config/general-properties';
import { AXFListInputWidgetDesigner } from './designer/list-input-widget.designer';
import { AXFListInputWidgetPrint } from './print/list-input-widget.print';
import { AXFListInputWidgetView } from './view/list-input-widget.view';
import { AXFBoxStyleBoxSizeValue } from '../../../property-editor/editors/style/box-style/box-style.class';

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
            title: "Data List",
            hint: "Data list element",
            icon: "fas fa-list",
            category: "Editors",
            visible: true,
            name: "list",
            designerClass: AXFListInputWidgetDesigner,
            printClass: AXFListInputWidgetPrint,
            viewClass: AXFListInputWidgetView,
            options: {
                mode: "single",
                direction: "horizontal",
                alignCheck: "left",
                viewType: "text",
                printMode:"allItems",
                alignCheckNew:"ItopCleftSright"
            },
            properties: [
                {
                    name: "mode",
                    category: "General",
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
                    title: "Direction",
                    editor: "SelectionEditor",
                    options: {
                        items: [{ value: "horizontal", title: "Horizontal" }, { value: "vertical", title: "Vertical" }],
                        mode: "single",
                        direction: "horizontal"
                    }
                },
                {
                    name: "columns",
                    category: "General",
                    title: "Columns",
                    editor: "TextEditor",
                    defaultValue:1,
                    visible: (options: any) => {
                        return options.direction == "horizontal";
                    }
                },
                {
                    name: "viewType",
                    category: "General",
                    title: "View Type",
                    editor: "SelectionEditor",
                    options: {
                        items: [{ value: "text", title: "Text" }, { value: "image", title: "Image" }, { value: "both", title: "Both" }],
                        mode: "single",
                        direction: "horizontal",
                    }
                },
                {
                    name: "alignCheck",
                    category: "General",
                    title: "CheckBox/RadioButton Align",
                    editor: "SelectionEditor",
                    visible: (options: any) => {
                        return options.mode != "unselectable" && options.viewType != "both";
                    },
                    options: {
                        items: [{ value: "left", title: "Left" }, { value: "top", title: "Top" },
                        { value: "right", title: "Right" }, { value: "bottom", title: "Bottom" }],
                        mode: "single",
                        direction: "horizontal"
                    }
                },
                {
                    name: "alignCheckNew",
                    category: "General",
                    title: "Alignment",
                    editor: "SelectionEditor",
                    visible: (options: any) => {
                        return options.mode != "unselectable" && options.viewType == "both";
                    },
                    options: {
                        items: [
                            { value: "ItopCleftSright", title: "Image:top-CheckBox:left-Title:right" },  
                            { value: "ItopCrightSleft", title: "Image:top-CheckBox:right-Title:left" }, 
                            { value: "IbottomCleftSright", title: "Image:bottom-CheckBox:left-Title:right" }, 
                            { value: "IbottomCrightSleft", title: "Image:bottom-CheckBox:right-Title:left" },
                            { value: "StopImiddleCbottom", title: "Image:middle-CheckBox:bottom-Title:top" }, 
                            { value: "ItopSmiddleCbottom", title: "Image:top-CheckBox:bottom-Title:middle" },
                            { value: "CtopSmiddleIbottom", title: "Image:bottom-CheckBox:top-Title:middle" }, 
                            { value: "CtopImiddleSbottom", title: "Image:middle-CheckBox:top-Title:bottom" } 
                            // ,{ value: "StopCleftIright", title: "StopCleftIright" }, 
                            // { value: "StopCrightIleft", title: "StopCrightIleft" },
                            // { value: "CleftIrightSbottom", title: "CleftIrightSbottom" }, 
                            // { value: "CrightIleftSbottom", title: "CrightIleftSbottom" }                        
                        ],
                        mode: "single",
                        direction: "vertical"
                    }
                }, 
                {
                    name: "printMode",
                    category: "General",
                    title: "Print Mode",
                    editor: "SelectionEditor",
                    options: {
                        items: [ { value: "allItems", title: "All Items" },{ value: "onlySelected", title: "Only Selected" }],
                        mode: "single",
                        direction: "horizontal",
                    }
                },
                AXF_ITEM_DATASOURCE_PROPERTY,
                //AXF_BOX_STYLE_PROPERTY,
                AXF_VISIBLE_PROPERTY,
                AXF_NAME_PROPERTY,
                AXF_INIT_EVENT,
                AXF_VALUE_CHANGE_EVENT,
            ]
        })
    }
}