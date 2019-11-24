import { Component, OnInit } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';
import { ClosingAction } from 'acorex-ui/lib/components/nav/popup/popup.events';
///
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
// import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';


// ClassicEditor
//     .create(document.querySelector('#editor'), {
//         plugins: [Essentials, Paragraph, Bold, Italic, Alignment],     // <--- MODIFIED
//         toolbar: ['bold', 'italic', 'alignment']
//     })
//     .then(editor => {
//         console.log('Editor was initialized', editor);
//     })
//     .catch(error => {
//         console.error("Error from :", error.stack);
//     });


// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// ClassicEditor
//     .create( document.querySelector( '#editor' ), {
//         // Look, ma! No plugins!
//     } )
//     .then( editor => {
//         console.log( 'Editor was initialized', editor );
//     } )
//     .catch( error => {
//         console.error( error.stack );
//     } );


@Component({
    template: `
        <ckeditor [editor]="Editor" [data]="data" (change)="onChange($event)"></ckeditor>
    `,
})
export class AXFRichTextComponent extends AXBasePageComponent {



    public Editor = ClassicEditor;
    public data: string;

    constructor() {
        super();
    }


    public onChange({ editor }: ChangeEvent) {
        this.data = editor.getData();
    }

    onClosing(e: ClosingAction) {
        e.data = this.data;
        e.resolve();
    }


}
