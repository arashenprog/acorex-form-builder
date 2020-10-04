import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFRepeaterWidgetDesigner } from './designer/repeater-widget.designer';
import { AXFRepeaterWidgetView } from './view/repeater-widget.view';
import { AXFRepeaterWidgetPrint } from './print/repeater-widget.print';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXFTextEditorComponent } from '../../../property-editor/editors/text/text.editor';
import { AXF_STYLE_GENERAL_PROPERTIES, AXF_BG_COLOR_PROPERTY, AXF_BOX_STYLE_PROPERTY, AXF_HORIZONTAL_ALIGNMENT_PROPERTY, AXF_VERTICAL_ALIGNMENT_PROPERTY, AXF_DS_LIST_PROPERTY, AXF_NAME_PROPERTY, AXF_VALUE_CHANGE_EVENT, AXF_TAG_PROPERTY, AXF_DISPLAY_NAME_PROPERTY, AXF_VISIBLE_PROPERTY } from '../../config/general-properties';
import { AXFBoxStyleBoxSizeValue } from '../../../property-editor/editors/style/box-style/box-style.class';

export const COMPONENTS = [AXFRepeaterWidgetDesigner, AXFRepeaterWidgetView, AXFRepeaterWidgetPrint]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFRepeaterlWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'Repeater',
            hint: 'Repeater container element',
            icon: 'fa fa-sync',
            category: 'Layout',
            visible: true,
            name: 'repeater',
            designerClass: AXFRepeaterWidgetDesigner,
            printClass: AXFRepeaterWidgetPrint,
            container: true,
            draggable: false,
            viewClass: AXFRepeaterWidgetView,
            options: {
                boxStyle: {
                    border: new AXFBoxStyleBoxSizeValue('1'),
                    padding: new AXFBoxStyleBoxSizeValue('0'),
                    margin: new AXFBoxStyleBoxSizeValue('5', '0', '5', '0')
                },
                bgColor: 'inherit',
                dataSource: {
                    mode: 'manual',
                    dataSource: {},
                    columns: [],
                    dataItems: []
                },
            },
            properties: [
                {
                    name: 'showHeader',
                    category: 'General',
                    defaultValue: false,
                    title: 'Show Header',
                    editor: 'CheckboxEditor',
                    options: { label: 'Show Header' }
                },
                AXF_BG_COLOR_PROPERTY,
                AXF_DS_LIST_PROPERTY,
                AXF_BOX_STYLE_PROPERTY,
                AXF_NAME_PROPERTY,
                AXF_DISPLAY_NAME_PROPERTY,
                AXF_TAG_PROPERTY,
                AXF_VISIBLE_PROPERTY,
                AXF_VALUE_CHANGE_EVENT,
                {
                    name: 'allowAdd',
                    category: 'General',
                    defaultValue: false,
                    title: 'Allow Add Item',
                    editor: 'CheckboxEditor',
                    options: { label: 'Allow Add Item' },
                    visible: (options: any) => {
                        if (options.dataSource && options.dataSource.mode == 'manual')
                            return true;
                        else
                            return false;
                    }
                }
            ]
        })
    }
}