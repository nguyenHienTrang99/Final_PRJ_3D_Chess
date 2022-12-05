// Tạo một lớp các quân trên bàn cờ với các thuộc tính về màu , vị trí , kích thước và kiểu quân 
class Piece {
    constructor(pSize, pos, type, color) {
        this.pos = createVector(0, 0, 0);
        this.tpos = pos;
        this.pSize = pSize;
        this.type = type;
        this.color = color;
        this.origColor = color;
    }
	// Vẽ box chỉ định và các quân cờ trong phương thức show 
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
	// Qui định cách di chuyển của quân cờ
    move() {
        this.pos.lerp(this.tpos, 0.4);
    }
}