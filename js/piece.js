class Piece {
    constructor(pSize, pos, type, color) {
        this.pos = createVector(0, 0, 0);
        this.tpos = pos;
        this.pSize = pSize;
        this.type = type;
        this.color = color;
        this.origColor = color;
    }
    show() {
        specularMaterial(this.color);
        noStroke();
        push();
        noFill();
        stroke(this.color);
        strokeWeight(2);
        translate(this.pos.x, this.pos.y, this.pos.z);
        translate(0, -this.pSize * 1.75, 0)
        box(this.pSize * 4, this.pSize * 2, this.pSize * 4);
        pop();
    }
    move() {
        this.pos.lerp(this.tpos, 0.4);
    }
}
