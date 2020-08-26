import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXFButtonWidgetDesigner } from './designer/button-widget.designer';
import { AXFButtonWidgetPrint } from './print/button-widget.print';
import { AXFButtonWidgetView } from './view/button-widget.view';
import { AXF_NAME_PROPERTY, AXF_TEXT_PROPERTY, AXF_CLICK_EVENT, AXF_INIT_EVENT, AXF_VISIBLE_PROPERTY, AXF_DISPLAY_NAME_PROPERTY } from '../../config/general-properties';

export const COMPONENTS = [
    AXFButtonWidgetDesigner,
    AXFButtonWidgetView,
    AXFButtonWidgetPrint
]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFButtonWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'Button',
            hint: 'A clickable Button',
            icon: 'fas fa-play',
            category: 'Buttons',
            visible: true,
            name: 'button',
            designerClass: AXFButtonWidgetDesigner,
            printClass: AXFButtonWidgetPrint,
            viewClass: AXFButtonWidgetView,
            options: {
                text: 'Click Here',
            },
            properties: [
                AXF_TEXT_PROPERTY,
                {
                    name: 'type',
                    category: 'Style',
                    title: 'Type',
                    defaultValue: 'primary',
                    editor: 'DropdownEditor',
                    options: {
                        items: [
                            { value: 'primary', title: 'primary' },
                            { value: 'success', title: 'success' },
                            { value: 'warning', title: 'warning' },
                            { value: 'info', title: 'info' }
                        ],
                    }
                },
                {
                    name: 'size',
                    category: 'Style',
                    title: 'Size',
                    defaultValue: 'sm',
                    editor: 'DropdownEditor',
                    options: {
                        items: [
                            { value: 'xs', title: 'x-small' },
                            { value: 'sm', title: 'small' },
                            { value: 'md', title: 'medium' },
                            { value: 'lg', title: 'large' },
                            { value: 'xl', title: 'x-large' }
                        ],
                    }
                },
                AXF_VISIBLE_PROPERTY,
                AXF_NAME_PROPERTY,
                AXF_DISPLAY_NAME_PROPERTY,
                AXF_INIT_EVENT,
                AXF_CLICK_EVENT,
            ]
        })
        //
        service.register({
            title: 'Submit Button',
            hint: 'Submit the form',
            icon: 'fas fa-check',
            category: 'Buttons',
            visible: true,
            name: 'submitButton',
            designerClass: AXFButtonWidgetDesigner,
            printClass: AXFButtonWidgetPrint,
            viewClass: AXFButtonWidgetView,
            options: {
                text: 'Submit',
            },
            properties: [
                AXF_TEXT_PROPERTY,
                {
                    name: 'type',
                    category: 'Style',
                    title: 'Type',
                    defaultValue: 'success',
                    editor: 'DropdownEditor',
                    options: {
                        items: [
                            { value: 'primary', title: 'primary' },
                            { value: 'success', title: 'success' },
                            { value: 'warning', title: 'warning' },
                            { value: 'info', title: 'info' },
                            { value: 'danger', title: 'danger' }
                        ],
                    }
                },
                {
                    name: 'size',
                    category: 'Style',
                    title: 'Size',
                    defaultValue: 'sm',
                    editor: 'DropdownEditor',
                    options: {
                        items: [
                            { value: 'xs', title: 'x-small' },
                            { value: 'sm', title: 'small' },
                            { value: 'md', title: 'medium' },
                            { value: 'lg', title: 'large' },
                            { value: 'xl', title: 'x-large' }
                        ],
                    }
                },
                AXF_VISIBLE_PROPERTY,
                {
                    name: 'onClick',
                    category: 'Behavior',
                    defaultValue: 'submit()',
                    title: 'Click',
                    editor: 'EventEditor',
                    options: {
                    },
                    order: 9,
                    visible: false
                }
            ]
        })
    }
}

