$FileName = Read-Host -Prompt 'Input your component name'

New-Item -Path ".\projects\acorex-form-builder\src\lib\modules\widget\widgets\$($FileName)\designer\$($FileName)-widget.designer.html",".\projects\acorex-form-builder\src\lib\modules\widget\widgets\$($FileName)\designer\$($FileName)-widget.designer.scss",".\projects\acorex-form-builder\src\lib\modules\widget\widgets\$($FileName)\designer\$($FileName)-widget.designer.ts" -ItemType File -Force
Add-Content ".\projects\acorex-form-builder\src\lib\modules\widget\widgets\$($FileName)\designer\$($FileName)-widget.designer.ts" "import { Component, OnInit } from '@angular/core';

@Component({
    selector: '[axf-$($FileName)]',
    templateUrl: './$($FileName)-widget.designer.html',
    styleUrls: ['./$($FileName)-widget.designer.scss']
})
export class AXF$($FileName.substring(0,1).toupper()+$FileName.substring(1).tolower())WidgetDesigner implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
"

New-Item -Path ".\projects\acorex-form-builder\src\lib\modules\widget\widgets\$($FileName)\print\$($FileName)-widget.print.html",".\projects\acorex-form-builder\src\lib\modules\widget\widgets\$($FileName)\print\$($FileName)-widget.print.scss",".\projects\acorex-form-builder\src\lib\modules\widget\widgets\$($FileName)\print\$($FileName)-widget.print.ts" -ItemType File -Force
Add-Content ".\projects\acorex-form-builder\src\lib\modules\widget\widgets\$($FileName)\print\$($FileName)-widget.print.ts" "import { Component, OnInit } from '@angular/core';

@Component({
    selector: '[axf-$($FileName)]',
    templateUrl: './$($FileName)-widget.print.html',
    styleUrls: ['./$($FileName)-widget.print.scss']
})
export class AXF$($FileName.substring(0,1).toupper()+$FileName.substring(1).tolower())WidgetDesigner implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
"

New-Item -Path ".\projects\acorex-form-builder\src\lib\modules\widget\widgets\$($FileName)\view\$($FileName)-widget.view.html",".\projects\acorex-form-builder\src\lib\modules\widget\widgets\$($FileName)\view\$($FileName)-widget.view.scss",".\projects\acorex-form-builder\src\lib\modules\widget\widgets\$($FileName)\view\$($FileName)-widget.view.ts" -ItemType File -Force
Add-Content ".\projects\acorex-form-builder\src\lib\modules\widget\widgets\$($FileName)\view\$($FileName)-widget.view.ts" "import { Component, OnInit } from '@angular/core';

@Component({
    selector: '[axf-$($FileName)]',
    templateUrl: './$($FileName)-widget.view.html',
    styleUrls: ['./$($FileName)-widget.view.scss']
})
export class AXF$($FileName.substring(0,1).toupper()+$FileName.substring(1).tolower())WidgetDesigner implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
"

New-Item -Path ".\projects\acorex-form-builder\src\lib\modules\widget\widgets\$($FileName)\$($FileName).module.ts" -ItemType File -Force


@"
    ___    ____   ____                 
   /   |  / / /  / __ \____  ____  ___ 
  / /| | / / /  / / / / __ \/ __ \/ _ \
 / ___ |/ / /  / /_/ / /_/ / / / /  __/
/_/  |_/_/_/  /_____/\____/_/ /_/\___/ 
                                       
                                       
"@