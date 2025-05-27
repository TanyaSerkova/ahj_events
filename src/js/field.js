export default class Field {
    constructor(el){
        if (!el){
            throw new Error('Не передан элемент');
        }
        this.element = el;
        this.generateCells();
        this.currentCellIndex = null;
        this.currentElement = null;
    }
}