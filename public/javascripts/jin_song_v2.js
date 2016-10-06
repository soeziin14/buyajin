var Board, answerBoard;
var xsize = 16;
var ysize = 16;

var dead = 0;
var alive = 1;

var auto = true;
var intervalID;

var BoardSetup = "";
Main();

function Neighbors(Board, x, y)
{
	var n = 0;
	for(var dx=-1;dx <= 1; dx++)
	{
		for(var dy=-1;dy <= 1; dy++)
		{
			if (!(dx === 0 && dy === 0)) {

				var ax = x+dx;
	    		var ay = y+dy;
	    		
	    		if (ax < 0) ax = ax + xsize;
	    		if (ay < 0) ay = ay + ysize;

	    		if (ax > (xsize-1)) ax = ax - xsize;
	    		if (ay > (ysize-1)) ay = ay - xsize;
	    		
				if(Board[ax][ay]==alive) n++;
			}
		}
	}
	return n;
}

function Kill(Board,x,y)
{
	if(Board[x][y] == alive)
		Board[x][y] = dead;
}

function MakeLive(Board,x,y)
{
	if(Board[x][y] == dead)
		Board[x][y] = alive;
}


function SorryNoHope(Board,x,y) {

	Board[x][y] = noHope;
}

function NextStep(Board)
{
	for(var x = 0; x < xsize; x++)
	{
		for(var y = 0; y < ysize; y++)
		{
			var p = Neighbors(Board,x,y);
			if (p === 3) {
				MakeLive(answerBoard,x,y);
			}

			if ( p ===2 ) {
				if (Board[x][y] == alive) {
					MakeLive(answerBoard,x,y);
				}
			}
			if ( (p<2) || (p>3) ) {
				Kill(answerBoard, x, y);
			}
		}
	}

	for(var x = 0; x < xsize; x++)
	{
		for(var y = 0; y < ysize; y++)
		{
			Board[x][y] = answerBoard[x][y];
		}
	}
}

function DrawBoard(Board)
{
	var container = document.getElementById("board");
	container.innerHTML = '';//clear previous childs
	for(var y = 0; y < ysize; y++)
	{
		for(var x = 0; x < xsize; x++){
			var temp = document.createElement('div');

			if (Board[x][y] == alive) {
				temp.className = "square";
				temp.style.background = "#33FF99";
			} else {
				temp.className = "square";
				temp.style.background = "#FF3333";
			}
			container.appendChild(temp);
		}
	}
}

function setBoardSetup(style) {

	BoardSetup = style;
	Main();
}

function Automatic() {

	function process() {

		NextStep(Board);
		DrawBoard(Board);
	}

	if (auto) {
		intervalID = window.setInterval(process, 300);
		auto = false;
	} else {
		clearInterval(intervalID);
		auto = true;
	}
}

function Main()
{
	if (!BoardSetup) 
		BoardSetup = "blinker";
    // *** Change this variable to choose a different baord setup from below
	Board = new Array(xsize);
	answerBoard = new Array(xsize);
	for(var x = 0; x < xsize; ++x)
	{
		Board[x] = new Array(ysize);
		answerBoard[x] = new Array(ysize);

		for(var y = 0; y < ysize; ++y) {
			Board[x][y] = 0;
			answerBoard[x][y] = 0;
		}
	}
	
	if(BoardSetup == "blinker")
	{
	    Board[1][0] = 1;
	    Board[1][1] = 1;
	    Board[1][2] = 1;
    }
    else if(BoardSetup == "glider")
    {
	    Board[2][0] = 1;
	    Board[2][1] = 1;
	    Board[2][2] = 1;
	    Board[1][2] = 1;
	    Board[0][1] = 1;
    }
    else if(BoardSetup == "flower")
    {
        Board[4][6] = 1;
        Board[5][6] = 1;
        Board[6][6] = 1;
        Board[7][6] = 1;
        Board[8][6] = 1;
        Board[9][6] = 1;
        Board[10][6] = 1;
        Board[4][7] = 1;
        Board[6][7] = 1;
        Board[8][7] = 1;
        Board[10][7] = 1;
        Board[4][8] = 1;
        Board[5][8] = 1;
        Board[6][8] = 1;
        Board[7][8] = 1;
        Board[8][8] = 1;
        Board[9][8] = 1;
        Board[10][8] = 1;
    }
    
	DrawBoard(Board);
}
