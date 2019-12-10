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
import { AXFItemsEditorModule } from '../editors/items/items.modules';
import { AXFCheckboxEditorModule } from '../editors/checkbox/checkbox.module'; 
import { AXFSignatureEditorModule } from '../editors/signature/signature.module';
import { AXFGridEditorModule } from '../editors/grid/grid.modules';
import { AXFEventEditorModule } from '../editors/event/event.module';


const WDIGET_MODULES = [
    AXFBoxStyleEditorModule,
    AXFTextEditorModule,
    AXFSelectionEditorModule,
    AXFDropdownEditorModule,
    AXFColorEditorModule,
    AXFUploadEditorModule,
    AXFItemsEditorModule,
    AXFCheckboxEditorModule,
    AXFSignatureEditorModule,
    AXFGridEditorModule,
    AXFEventEditorModule
]

@NgModule({
    declarations: [AXFEditorRendererDirective],
    imports: [CommonModule, ...WDIGET_MODULES],
    exports: [AXFEditorRendererDirective],
    providers: [AXFEditorService],
})
export class AXFEditorsModule { }