import { Injectable } from '@angular/core';

export interface AXFEditorConfig {
    name: string,
    editorClass: any
}



@Injectable({ providedIn: "root" })
export class AXFEditorService {

    static EDITOR_ITEMS: AXFEditorConfig[] = [];

  

    register(name: string, editorClass: any) {
        AXFEditorService.EDITOR_ITEMS.push({ name: name, editorClass: editorClass });
    }

    resolve(name: string): any {
        return AXFEditorService.EDITOR_ITEMS.find(c => c.name == name).editorClass
    }

}