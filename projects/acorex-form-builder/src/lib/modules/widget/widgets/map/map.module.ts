import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_NAME_PROPERTY, AXF_VALUE_CHANGE_EVENT, AXF_TAG_PROPERTY, AXF_DISPLAY_NAME_PROPERTY } from '../../config/general-properties';
import { AXFMapInputWidgetDesigner } from './designer/map-input-widget.designer';
import { AXFMapInputWidgetPrint } from './print/map-input-widget.print';
import { AXFMapInputWidgetView } from './view/map-input-widget.view';
import { AgmCoreModule } from '@agm/core';

export const COMPONENTS = [AXFMapInputWidgetDesigner, AXFMapInputWidgetPrint, AXFMapInputWidgetView]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule, AgmCoreModule.forRoot({
        apiKey: 'AIzaSyADC-43jIomCbaCICNpeDr5EBgUxJ49XxM'
      })],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFMapWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: "Map",
            hint: "Map element",
            icon: "fas fa-map-marker",
            category: "Editors",
            visible: true,
            name: "map",
            designerClass: AXFMapInputWidgetDesigner,
            printClass: AXFMapInputWidgetPrint,
            viewClass: AXFMapInputWidgetView,
            options: {
                height: 100,
                width: 150,
            },
            properties: [
                {
                    name: "width",
                    category: "General",
                    defaultValue: "",
                    title: "Width (px)",
                    editor: "TextEditor"
                },
                {
                    name: "height",
                    category: "General",
                    defaultValue: "",
                    title: "Height (px)",
                    editor: "TextEditor"
                }, 
                AXF_NAME_PROPERTY, 
                AXF_DISPLAY_NAME_PROPERTY,
                AXF_TAG_PROPERTY,
                AXF_VALUE_CHANGE_EVENT,
            ]
        })
    }
}