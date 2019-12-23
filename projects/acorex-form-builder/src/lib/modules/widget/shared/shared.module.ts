import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFWidgetPickerComponent } from './widget-picker/widget-picker.component';
import { ACoreXUIModule } from 'acorex-ui';
import { AXFWidgetRendererDirective } from './widget-renderer/widget-renderer.directive';
import { AXFEditorsModule } from '../../property-editor/config/editors.module';
import { AXFWidgetToolboxComponent } from './widget-toolbox/widget-toolbox.component';
import { AXFWidgetPropPanelComponent } from './widget-prop-panel/widget-prop-panel.component';
import { AXFWordPipe } from '../pipes/word.pipe';

@NgModule({
    declarations: [AXFWordPipe, AXFWidgetPickerComponent, AXFWidgetRendererDirective, AXFWidgetToolboxComponent, AXFWidgetPropPanelComponent],
    imports: [CommonModule, ACoreXUIModule, AXFEditorsModule],
    exports: [AXFWordPipe, AXFWidgetPickerComponent, AXFWidgetRendererDirective, AXFWidgetToolboxComponent, AXFWidgetPropPanelComponent, AXFEditorsModule],
    entryComponents: [AXFWidgetPickerComponent, AXFWidgetToolboxComponent],
    providers: [],
})
export class AXFWidgetSharedModule { }