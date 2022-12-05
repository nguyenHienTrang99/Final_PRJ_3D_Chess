let colorList, board, siz, rotation, rvel, cursorPiece;
let scaleSize = 1; 
let camspeed = 0.2; 
let a = 8; 
let b = 8; // 8 X 8
let pieces = []; 
let selected = null; 
let turn = 'white'; 
let mode = 'none';
let colorOdd = 'white'
let colorEven = 'red'

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES);
    colorList = [colorOdd, colorEven];
    rotation = createVector(0, 0, 0);
    rvel = createVector(-5, 0, 0);
    siz = floor(height /9); 
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
    cursorPiece = new Piece(height / 40, createVector(cx, 0, cz), 'C', 'white')
}

function preload() {
    myFont = loadFont('Reclaim.otf')
}

function keyPressed() {
    if (keyCode == LEFT_ARROW && cursorPiece.tpos.x > (-3 * siz)) cursorPiece.tpos.x -= siz;
    if (keyCode == RIGHT_ARROW && cursorPiece.tpos.x < (3 * siz)) cursorPiece.tpos.x += siz;
    if (keyCode == UP_ARROW && cursorPiece.tpos.z > (-3 * siz)) cursorPiece.tpos.z -= siz;
    if (keyCode == DOWN_ARROW && cursorPiece.tpos.z < (3 * siz)) cursorPiece.tpos.z += siz;
}

function draw() {
    background('#FF69B4');
    ambientLight(100);
    pointLight(100, 100, 100, 0, -350, 0)
    scale(scaleSize);
    rotateEverything();
    moveCamera();
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
    cursorPiece.show();
    cursorPiece.move();
}
