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
<<<<<<< HEAD
            icon: 'fas fa-page',
=======
            icon: 'fas fa-database',
>>>>>>> c9a146ffc5e6c5f7c415cc19351754a452b3aa7f
            category: 'Gallery',
            visible: true,
            name: 'outlet',
            designerClass: AXFOutletWidgetDesigner,
            printClass: AXFOutletWidgetPrint,
            viewClass: AXFOutletWidgetView,
            properties: [
                {
<<<<<<< HEAD
                    name: "ref",
=======
                    name: "template",
>>>>>>> c9a146ffc5e6c5f7c415cc19351754a452b3aa7f
                    category: "General",
                    title: "Template",
                    editor: "DropdownEditor",
                    options: {
<<<<<<< HEAD
                        items: [
                            {value:"10",title:"template 1"},
                            {value:"20",title:"template 2"},
                        ],
=======
                        dataSource:"template-list"
>>>>>>> c9a146ffc5e6c5f7c415cc19351754a452b3aa7f
                    }
                }
            ]
        })
    }
}

