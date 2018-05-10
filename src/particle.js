class Particle {
    constructor(pos = createVector(0, 0)) {
        this.pos = pos;
        this.originalPos = createVector(pos.x, pos.y);
        this.alpha = 255;
    }

    draw() {
        push();
        noStroke();
        fill(0, this.alpha);
        ellipse(this.pos.x, this.pos.y, 10);
        pop();
    }

    update() {
        this.pos.x = random(this.originalPos.x - 10, this.originalPos.x + 10);
        this.pos.y = random(this.originalPos.y - 10, this.originalPos.y + 10)
        this.alpha -= 5;
    }
}