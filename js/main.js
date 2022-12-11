let colorList, board, siz, rotation, rvel, cursorPiece, myFont;
let scaleSize = 1
let camspeed = 0.3;
let a = 8;
let b = 8;
let pieces = [];
let selected = null;
let turn = 'white';
let mode = 'none';

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	angleMode(DEGREES);
	rotation = createVector(0, 0, 0);
	rvel = createVector(-5, 0, 0);
	colorList = ['red', 'white'];
	siz = floor(height / 10);
	order = [
		['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
		['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
		['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
		['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
		['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
		['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
		['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
		['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
	];
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
	cursorPiece = new Piece(height / 40, createVector(cx, 0, cz), 'C','white')
	for (let row = 0; row < a; row += 1) {
		for (let col = 0; col < b; col += 1) {
			if (order[row][col] != 'X') {
				let x = (-3.5 * siz) + (col * siz)
				let z = (-3.5 * siz) + (row * siz)
				let pos = createVector(x, 0, z)
				let pieceColor = 'red';
				if (row < 2) pieceColor = 'yellow';
				else pieceColor = 'white';
				pieces.push(new Piece(height / 30.75, pos, order[row][col], pieceColor));
			}
		}
	}
}

function preload() {
	myFont = loadFont('Reclaim.otf') 
}

function showMoves(type) {
	if (type == 'F') {
		for (let piece of pieces) {
			piece.type = 'N';
		}
	}
}

function keyPressed() {
	if (turn != 'END') {
		if (keyCode == 32) {
			for (let p of pieces) {
				p.color = p.origColor;
				if (p.tpos.x == cursorPiece.tpos.x && p.tpos.z == cursorPiece.tpos.z && p.color == turn) {
					if ((turn == 'white' && p.color == 'white') || (turn == 'yellow' && p.color == 'yellow')) {
						selected = p;
						p.color = 'blue';
						showMoves(p.type);
					}
					
				}
			}
		}

		if (keyCode == 13 && selected) {
			if (whosThere() == null) {
				selected.color = selected.origColor;
				selected.tpos.x = cursorPiece.tpos.x;
				selected.tpos.z = cursorPiece.tpos.z;
				switchTurn();

			}
			else if (whosThere().origColor != turn) {
				if (whosThere().type == 'K' && whosThere().origColor == 'white') mode = 'yellow';
				else if (whosThere().type == 'K' && whosThere().origColor == 'yellow') mode = 'white';
				whosThere().tpos.x = width / 2
				selected.color = selected.origColor;
				selected.tpos.x = cursorPiece.tpos.x;
				selected.tpos.z = cursorPiece.tpos.z;
				switchTurn();
			}
			selected.color = selected.origColor;
			selected = null;
		}

		if (keyCode == LEFT_ARROW && cursorPiece.tpos.x > (-3 * siz)) cursorPiece.tpos.x -= siz;
		if (keyCode == RIGHT_ARROW && cursorPiece.tpos.x < (3 * siz)) cursorPiece.tpos.x += siz;
		if (keyCode == UP_ARROW && cursorPiece.tpos.z > (-3 * siz)) cursorPiece.tpos.z -= siz;
		if (keyCode == DOWN_ARROW && cursorPiece.tpos.z < (3 * siz)) cursorPiece.tpos.z += siz;

		switch (mode) {

			case 'yellow':
				textFont(myFont);
				textSize(siz);
				text('YELLOW WINS!',width/2,height/2);
				print('Yellow Wins!');
				turn = 'END';
				break

			case 'white':
				print('White Wins!');
				turn = 'END';
				break
		}
	}

}

function switchTurn() {

	if (turn == 'white') {
		turn = 'yellow';
		cursorPiece.color = 'yellow'
	} else {
		turn = 'white';
		cursorPiece.color = 'white'
	}

}

function whosThere() {
	for (let piece of pieces) {
		if (piece.tpos.x == cursorPiece.tpos.x && piece.tpos.z == cursorPiece.tpos.z) return piece;
	}
	return null;
}

function draw() {
	background(255,20,147);
	ambientLight(120)
	pointLight(100, 100, 100,windowHeight, -windowWidth, windowHeight)
	scale(scaleSize);
	rotateEverything();
	moveCamera();
	for (let row = 0; row < a; row += 1) {
		for (let col = 0; col < b; col += 1) {
			push();
			translate(0, siz / 4, 0);
			let x = (-3.5 * siz) + (col * siz);
			let z = (-3.5 * siz) + (row * siz);
			noStroke();
			fill(colorList[board[row][col]]);
			translate(x, 0, z);
			box(siz, siz / 2, siz);
			pop();
		}
	}

	cursorPiece.show();
	cursorPiece.move();
	for (let piece of pieces) {
		piece.show();
		piece.move();
	}
}