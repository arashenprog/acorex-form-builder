import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFTextBlockWidgetDesigner } from './designer/text-block-widget.designer';
import { AXFTextBlockWidgetView } from './view/text-block-widget.view';
import { AXFTextBlockWidgetPrint } from './print/text-block-widget.print';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_TEXT_PROPERTY, AXF_NAME_PROPERTY, AXF_BOX_STYLE_PROPERTY, AXF_STYLE_GENERAL_PROPERTIES, AXF_RICH_TEXT_PROPERTY } from '../../config/general-properties';
import { AXFBoxStyleBoxSizeValue } from '../../../property-editor/editors/style/box-style/box-style.class';
import { AXFWordPipe } from '../../pipes/word.pipe';

export const COMPONENTS = [
   
    AXFTextBlockWidgetDesigner, 
    AXFTextBlockWidgetView, 
    AXFTextBlockWidgetPrint
]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFTextBlockWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: "Text Block",
            hint: "Text content element",
            icon: "fas fa-font",
            category: "Text",
            visible: true,
            name: "text",
            designerClass: AXFTextBlockWidgetDesigner,
            printClass: AXFTextBlockWidgetPrint,
            viewClass: AXFTextBlockWidgetView,
            options: {
                boxStyle: {
                    border: new AXFBoxStyleBoxSizeValue("0"),
                    padding: new AXFBoxStyleBoxSizeValue("2"),
                    margin: new AXFBoxStyleBoxSizeValue("2")
                },
                text:"Block Text",
                bgColor:"inherit",
                fontSize:"small"
            },
            properties: [
                AXF_RICH_TEXT_PROPERTY,
                AXF_NAME_PROPERTY,
                ...AXF_STYLE_GENERAL_PROPERTIES
            ]
        })//
        service.register({
            title: "Heading",
            hint: "Heading element",
            icon: "fas fa-bold",
            category: "Text",
            visible: true,
            name: "text-heading",
            designerClass: AXFTextBlockWidgetDesigner,
            printClass: AXFTextBlockWidgetPrint,
            viewClass: AXFTextBlockWidgetView,
            options: {
                boxStyle: {
                    border: new AXFBoxStyleBoxSizeValue("0"),
                    padding: new AXFBoxStyleBoxSizeValue("2"),
                    margin: new AXFBoxStyleBoxSizeValue("2")
                },
                bgColor:"inherit",
                textStyle:["bold"],
                text:"Heading Text",
                fontSize:"medium"
            },
            properties: [
                AXF_RICH_TEXT_PROPERTY,
                AXF_NAME_PROPERTY,
                ...AXF_STYLE_GENERAL_PROPERTIES
            ]
        })
        service.register({
            title: "Hint Note",
            hint: "Hint note element",
            icon: "fas fa-italic",
            category: "Text",
            visible: true,
            name: "text-hint",
            designerClass: AXFTextBlockWidgetDesigner,
            printClass: AXFTextBlockWidgetPrint,
            viewClass: AXFTextBlockWidgetView,
            options: {
                boxStyle: {
                    border: new AXFBoxStyleBoxSizeValue("0"),
                    padding: new AXFBoxStyleBoxSizeValue("2"),
                    margin: new AXFBoxStyleBoxSizeValue("2")
                },
                bgColor:"inherit",
                color:"#999999",
                text:"Hint Text",
                fontSize:"x-small"
            },
            properties: [
                AXF_RICH_TEXT_PROPERTY,
                ...AXF_STYLE_GENERAL_PROPERTIES,
                AXF_NAME_PROPERTY,
            ]
        })
        
    }
}