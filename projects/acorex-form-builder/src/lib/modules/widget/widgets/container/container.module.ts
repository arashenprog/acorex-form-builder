import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFContainerWidgetDesigner } from './designer/container-widget.designer';
import { AXFContainerWidgetPrint } from './print/container-widget.print';
import { AXFContainerWidgetView } from './view/container-widget.view';
import { AXFWidgetService } from '../../services/widget.service';
import { AXFTextEditorComponent } from '../../../property-editor/editors/text/text.editor';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';

export const COMPONENTS = [AXFContainerWidgetDesigner, AXFContainerWidgetPrint, AXFContainerWidgetView]


@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule,ACoreXUIModule,AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFContainerWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: "Container",
            hint: "Container element",
            icon: "fas fa-square",
            category: "Layout",
            visible: false,
            name: "container",
            designerClass: AXFContainerWidgetDesigner,
            printClass: AXFContainerWidgetPrint,
            viewClass: AXFContainerWidgetView,
            properties: [
                {
                    name: "size",
                    category: "Style",
                    defaultValue: 1,
                    title: "Size",
                    editor: AXFTextEditorComponent,
                }
            ]
        })
    }

}