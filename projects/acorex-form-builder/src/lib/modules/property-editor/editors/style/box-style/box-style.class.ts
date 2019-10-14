export class AXFBoxStyleValue {
    padding: AXFBoxStyleBoxSizeValue = new AXFBoxStyleBoxSizeValue();
    border: AXFBoxStyleBoxSizeValue = new AXFBoxStyleBoxSizeValue();;
    margin: AXFBoxStyleBoxSizeValue = new AXFBoxStyleBoxSizeValue();;
}

export class AXFBoxStyleBoxSizeValue {

    constructor(value: string = "0") {
        this.left = value;
        this.right = value;
        this.top = value;
        this.bottom = value;
    }

    left: string = "0";
    right: string = "0";
    top: string = "0";
    bottom: string = "0";
}