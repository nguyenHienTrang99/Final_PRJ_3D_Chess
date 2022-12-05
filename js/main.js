let colorList, board, siz, rotation, rvel, cursorPiece;
let scaleSize = 1; //Do mo rong 
let camspeed = 0.2; // Toc do quay 
let a = 8; 
let b = 8; // 8 X 8
let pieces = []; // Mảng chua cac quan co 
let selected = null; 
let turn = 'white'; 
let mode = 'none';
let colorOdd = 'white'
let colorEven = 'red'

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES);
	// Tao mang mau 
	colorList = [colorOdd, colorEven];
	// Tao vecto quay . 
    rotation = createVector(0, 0, 0);
    rvel = createVector(-5, 0, 0);
    siz = floor(height /9); // Kich thuoc ca ban co 
    // Tao mảng 2 chiều hay ban co gom cac mau xen ke
	board = [
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
    ];
    let cx = (-3.5 * siz) + (5 * siz)
    let cz = (-3.5 * siz) + (4 * siz)
	// Tạo ra một đối tượng để chỉ định các quân cờ từ lớp piece gọi là ô chỉ định 
    cursorPiece = new Piece(height / 40, createVector(cx, 0, cz), 'C', 'white')
}

function preload() {
    myFont = loadFont('Reclaim.otf')
}

// Tạo hướng di chuyển trái phải lên xuống cho ô chỉ định 
function keyPressed() {
    if (keyCode == LEFT_ARROW && cursorPiece.tpos.x > (-3 * siz)) cursorPiece.tpos.x -= siz;
    if (keyCode == RIGHT_ARROW && cursorPiece.tpos.x < (3 * siz)) cursorPiece.tpos.x += siz;
    if (keyCode == UP_ARROW && cursorPiece.tpos.z > (-3 * siz)) cursorPiece.tpos.z -= siz;
    if (keyCode == DOWN_ARROW && cursorPiece.tpos.z < (3 * siz)) cursorPiece.tpos.z += siz;
}

// Tao backgroup cho không gian 3D
function draw() {
    background('#FF69B4');
	// Điều chỉnh độ sáng tối 
    ambientLight(100);
    pointLight(100, 100, 100, 0, -350, 0)
    scale(scaleSize);
	// gọi hàm từ camera.js
    rotateEverything();
    moveCamera();
	// Tạo từng ô cờ , trong không gian là box cờ , ta chạy 2 vòng lăp 8 X 8 để tạo ra bàn cờ trong không gian 3 chiều
    for (let row = 0; row < a; row += 1) {
        for (let col = 0; col < b; col += 1) {
            push();
            translate(0, siz / 2, 0);
            let x = (-3.5 * siz) + (col * siz);
            let z = (-3.5 * siz) + (row * siz);
            noStroke();
            fill(colorList[board[row][col]]);
            translate(x, 0, z);
            box(siz, siz, siz);
            pop();
        }
	}
	// gọi phương thức cho ô chỉ định 
    cursorPiece.show();
    cursorPiece.move();
}