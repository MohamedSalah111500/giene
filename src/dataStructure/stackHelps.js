export class Stack {
    constructor(maxSize) {
        this.items = [];
        this.count = 0;
        this.pointer = maxSize - 1;
        this.maxSize = maxSize;
    }

    // add element to top of stack 
    push(element) {
        if (this.size() === this.maxSize) {
            this.items.push(element);
            this.items.shift();

        } else {
            this.items[this.count] = element;
            this.count += 1;

        }
        console.log(`you push ${this.items[this.count - 1]} from postions ${this.count - 1} `)
        console.log("list " , this.items)
        return this.items[this.count - 1];
    }

    // return top element in stack and remove it 
    // return undefined if stack is empty !
    pop() {
        if (this.count === 0) return undefined
        let deleteItem = this.items[this.count - 1];

        this.count -= 1
        return deleteItem
    }


    undo() {

        if (this.pointer >= 0 && this.pointer < this.size()) {
            console.log("undo ", this.items[this.pointer], "pointer => ", this.pointer)
            if (this.pointer === 0) return false
            this.pointer -= 1
        }
    }
    redo() {

        if (this.pointer >= 0 && this.pointer < this.size() ) {
            console.log("redo ", this.items[this.pointer], "pointer => ", this.pointer)
            if (this.pointer === this.size() - 1)  return false
            this.pointer += 1
        }



    }






    // check top element in stack 
    peek() {
        return this.items[this.count - 1]
    }

    // check if stack is empty 
    isEmpty() {
        return this.count === 0
    }

    // check size of stack 
    size() {
        return this.count
    }

    // check size of stack 
    clearStack() {
        this.items = [];
        this.count = 0
        return this.items
    }
}


export const callsHistory = new Stack(3);
