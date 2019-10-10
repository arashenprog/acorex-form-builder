import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetPickerComponent } from './widget-picker/widget-picker.component';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetRendererDirective } from './widget-renderer/widget-renderer.directive';

@NgModule({
    declarations: [AXFWidgetPickerComponent,AXFWidgetRendererDirective],
    imports: [ CommonModule,ACoreXUIModule],
    exports: [AXFWidgetPickerComponent,AXFWidgetRendererDirective],
    entryComponents:[AXFWidgetPickerComponent],
    providers: [],
})
export class AXFWidgetSharedModule {}