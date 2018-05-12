class Branch {
    constructor(begin = createVector(0, 0), length = 0, angle = 0) {
        this.begin = begin;
        this.length = length;
        this.angle = angle;
    }

    get end() {
        let x = this.begin.x;
        let y = this.begin.y;

        let endX = x + (this.length * Math.cos(this.angle));
        let endY = y + (this.length * Math.sin(this.angle));

        return createVector(endX, endY);
    }
}