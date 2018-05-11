class ParticleEmitter {
    constructor(pos = createVector(0, 0)) {
        this.pos = pos;
        this.particles = [];
    }

    emit() {
        if (this.particles.length >= 3) {
            this.particles.splice(0, 1);    
        }
        let particle = new Particle(createVector(
            this.pos.x + random(-10, 10),
            this.pos.y + random(-10, 10)
        ));
        this.particles.push(particle);
    }

    draw() {
        for (let particle of this.particles) {
            particle.draw();
            particle.update();
        }
    }
}