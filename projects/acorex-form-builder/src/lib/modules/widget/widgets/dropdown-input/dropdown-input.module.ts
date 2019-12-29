import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_TEXT_PROPERTY, AXF_NAME_PROPERTY, AXF_BOX_STYLE_PROPERTY, AXF_STYLE_GENERAL_PROPERTIES, AXF_LABEL_PROPERTY, AXF_DS_MODE_PROPERTY, AXF_DS_LIST_PROPERTY, AXF_VALUE_CHANGE_EVENT, AXF_INIT_EVENT, AXF_ITEM_DATASOURCE_PROPERTY } from '../../config/general-properties';
import { AXFDropdownInputWidgetDesigner } from './designer/dropdown-input-widget.designer';
import { AXFDropdownInputWidgetPrint } from './print/dropdown-input-widget.print';
import { AXFDropdownInputWidgetView } from './view/dropdown-input-widget.view';
import { AXFBoxStyleBoxSizeValue } from '../../../property-editor/editors/style/box-style/box-style.class';

export const COMPONENTS = [AXFDropdownInputWidgetDesigner, AXFDropdownInputWidgetPrint, AXFDropdownInputWidgetView]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFDropdownInputWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: "Dropdown",
            hint: "Dropdown element",
            icon: "fas fa-caret-square-down",
            category: "Editors",
            visible: true,
            name: "dropdown",
            designerClass: AXFDropdownInputWidgetDesigner,
            printClass: AXFDropdownInputWidgetPrint,
            viewClass: AXFDropdownInputWidgetView,
            options: {
                boxStyle: {
                    border: new AXFBoxStyleBoxSizeValue("0"),
                    padding: new AXFBoxStyleBoxSizeValue("0"),
                    margin: new AXFBoxStyleBoxSizeValue("1")
                },
                bgColor: "#FFFFFF",
                mode:"single"
            },
            properties: [ 
                {
                    name: "mode",
                    category: "General",
                    title: "Mode",
                    editor: "SelectionEditor",
                    options: {
                        items: [{ value: "single", title: "Single" }, { value: "multiple", title: "Multiple" }],
                        mode: "single",
                        direction: "horizontal"
                    }
                },
                {
                    name: "allowSearch",
                    category: "General",
                    defaultValue:false,
                    title: "Allow Search",
                    editor: "CheckboxEditor",
                    options: { label:"Allow Search"}
                },
                AXF_ITEM_DATASOURCE_PROPERTY,
                AXF_BOX_STYLE_PROPERTY,
                AXF_NAME_PROPERTY,
                AXF_INIT_EVENT,
                AXF_VALUE_CHANGE_EVENT,
            ]
        })
    }
}