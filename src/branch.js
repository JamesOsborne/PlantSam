class Branch {
    constructor(begin = createVector(0, 0), end = createVector(0, 0)) {
        this.begin = begin;
        this.end = end;
    }

    draw() {
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }
}