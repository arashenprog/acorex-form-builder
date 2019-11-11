export class AXFBoxStyleValue {
    padding: AXFBoxStyleBoxSizeValue = new AXFBoxStyleBoxSizeValue();
    border: AXFBoxStyleBoxSizeValue = new AXFBoxStyleBoxSizeValue();;
    margin: AXFBoxStyleBoxSizeValue = new AXFBoxStyleBoxSizeValue();;
}

export class AXFBoxStyleBoxSizeValue {

    constructor(top: string = "0", right?: string, bottom?: string, left?: string) {

        this.left = left ? left : top;
        this.right = right ? right : top;
        this.top = top;
        this.bottom = bottom ? bottom : top;
    }



    left: string = "0";
    right: string = "0";
    top: string = "0";
    bottom: string = "0";
}