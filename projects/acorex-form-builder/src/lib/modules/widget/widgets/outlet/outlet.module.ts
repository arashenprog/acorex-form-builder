import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXFOutletWidgetDesigner } from './designer/outlet-widget.designer';
import { AXFOutletWidgetPrint } from './print/outlet-widget.print';
import { AXFOutletWidgetView } from './view/outlet-widget.view';

export const COMPONENTS = [
    AXFOutletWidgetDesigner, 
    AXFOutletWidgetView, 
    AXFOutletWidgetPrint
]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFPageOutletWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: 'Saved Template',
            hint: 'Load template from gallery',
            icon: 'fas fa-database',
            category: 'Gallery',
            visible: true,
            name: 'outlet',
            designerClass: AXFOutletWidgetDesigner,
            printClass: AXFOutletWidgetPrint,
            viewClass: AXFOutletWidgetView,
            properties: [
                {
                    name: "template",
                    category: "General",
                    title: "Template",
                    editor: "DropdownEditor",
                    options: {
                        dataSource:"template-list"
                    }
                }
            ]
        })
    }
}

