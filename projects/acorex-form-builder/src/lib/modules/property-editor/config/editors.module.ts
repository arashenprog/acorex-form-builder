import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFEditorRendererDirective } from '../renderrer/editor-renderer.directive';
import { AXFEditorService } from '../services/editor.service';
import { AXFTextEditorModule } from '../editors/text/text.module';
import { AXFBoxStyleEditorModule } from '../editors/style/box-style/box-style.module';
import { AXFSelectionEditorModule } from '../editors/selection/selection.module';
import { AXFDropdownEditorModule } from '../editors/dropdown/dropdown.module';
import { AXFColorEditorModule } from '../editors/color/color.module';
import { AXFUploadEditorModule } from '../editors/upload/upload.module';
import { AXFCheckboxEditorModule } from '../editors/checkbox/checkbox.module';
import { AXFSignatureEditorModule } from '../editors/signature/signature.module';
import { AXFEventEditorModule } from '../editors/event/event.module';
import { AXFDataSourceEditorModule } from '../editors/data-source/data-source.module';
import { AXFValidationEditorModule } from '../editors/validation/validation.module';
import { AXFActionEditorModule } from '../editors/action/action.module';

const WDIGET_MODULES = [
    AXFBoxStyleEditorModule,
    AXFTextEditorModule,
    AXFSelectionEditorModule,
    AXFDropdownEditorModule,
    AXFColorEditorModule,
    AXFUploadEditorModule,
    AXFCheckboxEditorModule,
    AXFSignatureEditorModule,
    AXFEventEditorModule,
    AXFDataSourceEditorModule,
    AXFValidationEditorModule,
    AXFActionEditorModule
]

@NgModule({
    declarations: [AXFEditorRendererDirective],
    imports: [CommonModule, ...WDIGET_MODULES],
    exports: [AXFEditorRendererDirective],
    providers: [AXFEditorService],
})
export class AXFEditorsModule {

 }