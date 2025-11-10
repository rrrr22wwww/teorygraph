
type CompareFunction<T> = (a: T, b: T) => boolean

export class binaryHeap<T> {
    public heap: T[];
    public compare:CompareFunction<T>;
    constructor(cmpare:CompareFunction<T> ) {
        this.heap = [];
        this.compare = cmpare;
    }
    public size(): number {
        return this.heap.length;
    }
    public isEmpty() {
        return this.heap.length === 0;
    }

    public push(value: T) {
        this.heap.push(value);
        this.swapUp(this.heap.length - 1);
    }
    public delet(idx:number) {
        if (idx >= this.heap.length) return;
        this.swap(idx,this.heap.length - 1);
        this.heap.pop();
        this.swapDown(idx)
    }
    public getParent (idx:number) {
        return Math.floor((idx - 1) / 2);
    }
    public getRightChild (idx:number) {
        return (idx*2) + 2;
    }
    public getLeftChild (idx:number) {
        return (idx*2) + 1;
    }

    public shift () {
        if(this.isEmpty()) {return};
        if(this.heap.length === 1 ) {return this.heap.pop()}; 
        let firstElem = this.heap[0];
        let lastElem = this.heap[this.heap.length - 1];
        this.heap[0] = lastElem;
        this.heap.pop();
        this.swapDown(0);
        return firstElem
    }
    private swapUp(idx: number) {
        if (idx === 0) return;
        const parentIdx = this.getParent(idx);
        if (this.compare(this.heap[idx], this.heap[parentIdx])) {
            this.swap(idx, parentIdx);
            this.swapUp(parentIdx);
        }
    }
    private swapDown(idx:number) {
        if(idx == this.heap.length) return 
        const eleft = this.getLeftChild(idx);
        const eright = this.getRightChild(idx);
        let minElem = idx;
        if(eleft < this.heap.length && this.compare(this.heap[eleft] , this.heap[minElem]) ) {
            minElem = eleft;
        }
          if(eright < this.heap.length && this.compare(this.heap[eright] , this.heap[minElem]) ) {
            minElem = eright
        }
        if(minElem != idx) {
            this.swap(idx,minElem)
            this.swapDown(minElem)
        }
    }
    private swap(idx1: number, idx2: number) {
        const tmp = this.heap[idx1];
        this.heap[idx1] = this.heap[idx2];
        this.heap[idx2] = tmp;
    }
    
}