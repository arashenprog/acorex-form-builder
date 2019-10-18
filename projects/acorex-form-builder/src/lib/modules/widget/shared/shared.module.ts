import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetPickerComponent } from './widget-picker/widget-picker.component';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetRendererDirective } from './widget-renderer/widget-renderer.directive';
import { AXFWidgetEditorComponent } from './widget-editor/widget-editor.component';
import { AXFEditorsModule } from '../../property-editor/config/editors.module';
import { AXFWidgetToolboxComponent } from './widget-toolbox/widget-toolbox.component';

@NgModule({
    declarations: [AXFWidgetPickerComponent, AXFWidgetRendererDirective, AXFWidgetEditorComponent, AXFWidgetToolboxComponent],
    imports: [CommonModule, ACoreXUIModule, AXFEditorsModule],
    exports: [AXFWidgetPickerComponent, AXFWidgetRendererDirective, AXFWidgetEditorComponent, AXFWidgetToolboxComponent, AXFEditorsModule],
    entryComponents: [AXFWidgetPickerComponent, AXFWidgetEditorComponent,AXFWidgetToolboxComponent],
    providers: [],
})
export class AXFWidgetSharedModule { }