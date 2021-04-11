import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFQuestionInputWidgetDesigner } from './designer/question-widget.designer';
import { AXFQuestionInputWidgetView } from './view/question-widget.view';
import { AXFQuestionInputWidgetPrint } from './print/question-widget.print';
import { AXFWidgetService } from '../../services/widget.service';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetSharedModule } from '../../shared/shared.module';
import { AXF_NAME_PROPERTY, AXF_VISIBLE_PROPERTY, AXF_FONT_PROPERTY, AXF_TAG_PROPERTY, AXF_ANSWER_PROPERTY } from '../../config/general-properties';
import { AXFBoxStyleBoxSizeValue } from '../../../property-editor/editors/style/box-style/box-style.class';

export const COMPONENTS = [
   
    AXFQuestionInputWidgetDesigner, 
    AXFQuestionInputWidgetView, 
    AXFQuestionInputWidgetPrint
]

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ACoreXUIModule, AXFWidgetSharedModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    providers: [],
})
export class AXFQuestionWidgetModule {
    constructor(service: AXFWidgetService) {
        service.register({
            title: "Question",
            hint: "Question element",
            icon: "fas fa-font",
            category: "Editors",
            visible: true,
            name: "question",
            designerClass: AXFQuestionInputWidgetDesigner,
            printClass: AXFQuestionInputWidgetPrint,
            viewClass: AXFQuestionInputWidgetView,
            options: {
                fontSize:"small" 
            },
            properties: [
                AXF_ANSWER_PROPERTY,
                AXF_NAME_PROPERTY,
                AXF_VISIBLE_PROPERTY,
                AXF_FONT_PROPERTY,
                AXF_TAG_PROPERTY, 
            ]
        })        
    }
}