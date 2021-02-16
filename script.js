const text = "Ultimate TicTacToe";
const title = document.querySelector('#title');
const startButtons = document.querySelectorAll('#start');
const restartButtons = document.querySelectorAll('#restart');
const descriptionButtons = document.querySelectorAll('#description');
const settingButton = document.querySelector('nav ul li:last-child');
const container = document.querySelector('#container');
const playerBoard = document.querySelector('#player-board');
const welcome = document.querySelector('#welcome-modal');
const description = document.querySelector('#description-modal');
const setting = document.querySelector('#setting-modal');
const gameover = document.querySelector('#gameover-modal');
const winnerMessage = document.querySelector('#winner-msg');
const close = document.querySelectorAll('.close');
const playerbuttons = document.querySelectorAll('.player');
const menu = document.querySelector('#nav-links');
const icon = document.querySelector('#nav-icon');
const blue = 'rgb(65, 94, 225)';
const red = 'rgb(225, 65, 94)';

let index = 0;
let n = 0;
let n2 = 0;
let n3 = 0;
let blockCnt = 0;
let player2 = 1; // 0: 2 players, 1: NPC(Default)
let flag = true;
let box;


/***** 
	Animate game title 
*****/
function typing() {
	if (index < text.length) {
		setTimeout(function () {
			title.innerHTML += text.charAt(index);
			index++;
		}, 150);
	}
	setTimeout(typing, 150);
}
window.onload = setTimeout(typing, 150);
window.onload = setTimeout(function() {
	$('.fade-in').fadeIn(1000);
}, 3000);
window.onload = setTimeout(function() {
	welcome.style.display = 'block';
}, 4000);

/***** 
	Start the game
*****/
startButtons.forEach(function(startButton) {
	startButton.addEventListener('click', start);
});

function start() {
	init();
	startButtons[0].style.display = 'none';
	restartButtons[0].style.display = 'block';
	welcome.style.display = 'none';
}

/***** 
	Restart the game
*****/
restartButtons.forEach(function(restartButton) {
	restartButton.addEventListener('click', restart);
});

function restart() {
	if (gameover.style.display == 'block') {
		gameover.style.display = 'none';
	}
	container.innerHTML = ''
	n = 0;
	n2 = 0;
	blockCnt = 0;
	flag = true;
	init();
}

/***** 
	Create 9 small tic tac toe blocks 
*****/
function init() {

	// Create 3*3 blocks inside 3 rows
	for (let l = 0; l < 3; l++) {
		const row = document.createElement('div');
		row.classList.add('row');

		for (let i = 0; i < 3; i++) {
			const block = document.createElement('div');
			block.classList.add('block');
			block.value = 0;
			block.setAttribute('id', 'block' + n2)
			n2++;
			n3 = 0;

			for (let j = 0; j < 3; j++) {
				const boxRow = document.createElement('div');
				boxRow.classList.add('boxRow');

				for (let k = 0; k < 3; k++) {
					box = document.createElement('button');
					box.classList.add('box');
					box.classList.add('box' + n3);
					box.setAttribute('type', 'submit');
					box.setAttribute('id', 'box' + n);
					box.setAttribute('onclick', 'clicked(this)') // Check which button is clicked
					boxRow.appendChild(box);
					n++
					n3++;
				}
				block.appendChild(boxRow);
			}
			row.appendChild(block);
		}
		container.appendChild(row);
	}
	whoseTurn();
}

/***** 
	Click event handling for buttons 
*****/
function clicked(box) {
	const blocks = document.querySelectorAll('.block');

	// vs other player
	if (player2 == 0) {
		if (flag) {
			box.style.backgroundColor = blue;
			box.innerText = '◯';
		} else {
			box.style.backgroundColor = red;
			box.innerText = 'X';
		}
		box.style.border = '3px solid rgb(65, 174, 225)';
		setTimeout(function() {
			box.style.border = 'inherit';
		}, 1000);
		winningMove(box, blocks);
		selectBlocks(box.id, blocks);
		disableBox(blocks);
		flag = !flag;
		whoseTurn();
	}

	// NPC
	if (player2 == 1) {
		if (flag) {
			box.style.backgroundColor = blue;
			box.innerText = '◯';
			winningMove(box, blocks);
			selectBlocks(box.id, blocks);
			disableBox(blocks);
			flag = !flag;
			whoseTurn()
			setTimeout(function() {
				npc(blocks);
				flag = !flag;
				whoseTurn();
			}, 1000);
		}
	}
}

/***** 
	NPC
*****/

function npc(blocks) {
	let activeBlock = document.querySelector('.active');
  let activeBlocks = document.querySelectorAll('.active-all');
	let npc;

	if (activeBlock) {
		do {
			let move = Math.floor(Math.random() * 9);
			npc = activeBlock.querySelectorAll('.boxRow .box');
			npc = npc[move]
			if (npc.innerText == '') {
				break;
			}
		} while (1);
	} else if (activeBlocks) {
		let block;
		do{
			block = activeBlocks[Math.floor(Math.random() * 9)];
			if (block.style.backgroundColor == '') {
				break;
			}
		} while(1);

		do{
			npc = block.querySelectorAll('.boxRow .box');
			npc = npc[Math.floor(Math.random() * 9)];
			if (npc.innerText == '') {
				break;
			}
		} while(1);

	}
		npc.style.backgroundColor = red;
		npc.innerText = 'X';
		winningMove(npc, blocks);
		selectBlocks(npc.id, blocks);
		disableBox(blocks);
}

/***** 
	To change the background/border of selected blocks 
*****/
function selectBlocks(box, blocks) {
	let selectedBlock;
	// Deselect blocks
	blocks.forEach(function (block) {
		block.classList.remove('active');
		block.classList.remove('active-all');
	});

	// Select blocks
	switch (box) {
		case 'box0': case 'box9': case 'box18': case 'box27': case 'box36': case 'box45': case 'box54': case 'box63': case 'box72':
			selectedBlock = blocks[0]	
			break;
		case 'box1': case 'box10': case 'box19': case 'box28': case 'box37': case 'box46': case 'box55': case 'box64': case 'box73':
			selectedBlock = blocks[3]
			break;
		case 'box2': case 'box11': case 'box20': case 'box29': case 'box38': case 'box47': case 'box56': case 'box65': case 'box74':
			selectedBlock = blocks[6]
			break;
		case 'box3': case 'box12': case 'box21': case 'box30': case 'box39': case 'box48': case 'box57': case 'box66': case 'box75':
			selectedBlock = blocks[1]
			break;
		case 'box4': case 'box13': case 'box22': case 'box31': case 'box40': case 'box49': case 'box58': case 'box67': case 'box76':
			selectedBlock = blocks[4]
			break;
		case 'box5': case 'box14': case 'box23': case 'box32': case 'box41': case 'box50': case 'box59': case 'box68': case 'box77':
			selectedBlock = blocks[7]
			break;
		case 'box6': case 'box15': case 'box24': case 'box33': case 'box42': case 'box51': case 'box60': case 'box69': case 'box78':
			selectedBlock = blocks[2]
			break;
		case 'box7': case 'box16': case 'box25': case 'box34': case 'box43': case 'box52': case 'box61': case 'box70': case 'box79':
			selectedBlock = blocks[5]
			break;
		case 'box8': case 'box17': case 'box26': case 'box35': case 'box44': case 'box53': case 'box62': case 'box71': case 'box80':
			selectedBlock = blocks[8]
			break;
		default: console.log('Something went wrong, clicked box ' + box);
			break;
	}

	if (selectedBlock.style.backgroundColor != '') {
		blocks.forEach(function (block) {
			block.classList.add('active-all');
		});
		selectedBlock.classList.remove('active');
	} else {
		selectedBlock.classList.add('active');
	}

}

/***** 
	Set all boxes inside none active blocks disbled.
*****/
function disableBox(blocks) {

	blocks.forEach(function (block) {
		if (block.classList.contains('active') || block.classList.contains('active-all')) {
			block.querySelectorAll('.boxRow').forEach(function (boxRow) {
				boxRow.querySelectorAll('.box').forEach(function (activeBox) {
					if (activeBox.innerText != '') {
						activeBox.disabled = true;
					} else {
						activeBox.disabled = false;
					}
				});
			});
		} else {
			block.querySelectorAll('.boxRow').forEach(function (boxRow) {
				boxRow.querySelectorAll('.box').forEach(function (disabledBox) {
					disabledBox.disabled = true;
				});
			});
		}
	});
}

/***** 
	Set all boxes inside taken block disbled.
*****/
function disableBlock(selectedBlock) {
	if (selectedBlock.classList.contains('active')) {
		selectedBlock.querySelectorAll('.boxRow').forEach(function (boxRow) {
			boxRow.querySelectorAll('.box').forEach(function (box) {
				box.disabled = true;
				box.style.backgroundColor = 'inherit';
			});
		});
	}
	blockCnt++;
}

/*****
	Draw for small TTT
*****/
function draw(selectedBlock) {
	selectedBlock.querySelectorAll('.boxRow').forEach(function (boxRow) {
		boxRow.querySelectorAll('.box').forEach(function (box) {
		if (box.innerText != '') {
			selectedBlock.style.zIndex = 1000;
			selectedBlock.style.backgroundColor = 'yellow';
			selectedBlock.innerHTML = '<p>-</p>';
			disableBlock(selectedBlock);
		} 
	});
});
}

/*****
	Winning validation for small TTT
*****/
function winningMove(box, blocks) {
	let array = [];
	let blockId = box.parentNode.parentNode.id;
	let selectedBlock = document.querySelector('#' + blockId);
	const conditions = [
		['box0', 'box1', 'box2'],
		['box3', 'box4', 'box5'],
		['box6', 'box7', 'box8'],
		['box0', 'box3', 'box6'],
		['box1', 'box4', 'box7'],
		['box2', 'box5', 'box8'],
		['box0', 'box4', 'box8'],
		['box2', 'box4', 'box6']
	];

	selectedBlock.querySelectorAll('.boxRow').forEach(function (boxRow) {
		boxRow.querySelectorAll('.box').forEach(function (box) {
			if (box.innerText != '') {
				if (array.indexOf(box.classList[1] == -1)) {
					array.push([box.classList[1], box.innerText]);
				}
			}
		});
	});

	let player1Array = array.filter(function (selected) {
		return selected[1] == '◯';
	}).map(function (selected) {
		return selected[0];
	}).toString();

	let player2Array = array.filter(function (selected) {
		return selected[1] == 'X';
	}).map(function (selected) {
		return selected[0];
	}).toString();

	// Check if conditions are included in the arrays
	conditions.forEach(function (condition) {
	  if (condition.every(function(i) {
			if(player1Array.includes(i)) {
				return true;
			}
		})) {
			selectedBlock.style.zIndex = 1000;
			selectedBlock.style.backgroundColor = blue;
			selectedBlock.innerHTML = '<p>◯</p>';
			disableBlock(selectedBlock);
		}

	  if (condition.every(function(i) {
			if(player2Array.includes(i)) {
				return true;
			}
		})) {
			selectedBlock.style.zIndex = 1000;
			selectedBlock.style.backgroundColor = red;
			selectedBlock.innerHTML = '<p>X</p>';
			disableBlock(selectedBlock);
		}

		if (array.length == 9 && (!player1Array.includes(condition.toString()) || !player2Array.includes(condition.toString()))) {
			draw(selectedBlock);
		}
	});

	// Execute once 3 blocks are taken
	if (blockCnt >= 3) {
		winTheGame(blocks);
	}
}

/***** 
	Winning validation for big TTT 
*****/
function winTheGame(blocks) {
	let player1Array = []; 
	let player2Array = [];
	const conditions = [
		['block0', 'block1', 'block2'],
		['block3', 'block4', 'block5'],
		['block6', 'block7', 'block8'],
		['block0', 'block3', 'block6'],
		['block1', 'block4', 'block7'],
		['block2', 'block5', 'block8'],
		['block0', 'block4', 'block8'],
		['block2', 'block4', 'block6']
	];

	blocks.forEach(function(block) {
		if (block.style.backgroundColor == blue) {
			player1Array.push(block.id);
			player1Array.toString();
		}

		if (block.style.backgroundColor == red) {
			player2Array.push(block.id);
			player2Array.toString();
		}
	});

	conditions.forEach(function(condition) {
		if (condition.every(function(i) {
			if (player1Array.includes(i)) {
				return true;
			}
		})) {
			gameover.style.display = 'block';
			gameover.style.zIndex = 9999;
			winnerMessage.innerHTML = 'プレイヤー１の勝ち！';
		}

		if (condition.every(function(i) {
			if (player2Array.includes(i)) {
				return true;
			}
		})) {
			gameover.style.display = 'block';
			gameover.style.zIndex = 9999;
			winnerMessage.innerHTML = 'プレイヤー２の勝ち！';
		}

		if (player1Array.length + player2Array.length == 9 && (!player1Array.includes(condition.toString()) || !player2Array.includes(condition.toString()))) {
			gameover.style.display = 'block';
			gameover.style.zIndex = 9999;
			winnerMessage.innerHTML = 'ひきわけ';
		}
	});

}

/***** 
	Modal and other contents
*****/

descriptionButtons.forEach(function(descriptionButton) {
	descriptionButton.onclick = function() {
		if (welcome.style.display == 'block') {
			welcome.style.display = 'none';
		}
		description.style.display = 'block';
	}
});

settingButton.onclick = function () {
	setting.style.display = 'block';
}

// Select player in setting
playerbuttons.forEach(function (button) {
	button.onclick = function (event) {
		if (event.target.name == 'player') {
			player2 = 0; // vs other player
		}

		if (event.target.name == 'npc') {
			player2 = 1; // NPC
		}
		setting.style.display = 'none';
	}
});

close.forEach(function (close) {
	close.onclick = function (event) {
		if (event.target.id == 'close-welcome') {
			welcome.style.display = 'none';
		}

		if (event.target.id == 'close-description') {
			description.style.display = 'none';
		}

		if (event.target.id == 'close-setting') {
			setting.style.display = 'none';
		}

		if (event.target.id == 'close-gameover') {
			gameover.style.display = 'none';
			restart();
		}
	}
});

window.onclick = function (event) {
	if (event.target == welcome) {
		welcome.style.display = 'none';
	}

	if (event.target == description) {
		description.style.display = 'none';
	}

	if (event.target == setting) {
		setting.style.display = 'none';
	}

	if (event.target == gameover) {
		gameover.style.display = 'none';
		restart();
	}
}

function whoseTurn() {
	if (flag == true) {
		playerBoard.innerHTML = '<p><span style="color: rgb(65, 94, 225);">&#9711;</span>のターン</p>';
	} else if (flag == false) {
		playerBoard.innerHTML = '<p><span style="color: rgb(225, 65, 94);">&times;</span>のターン</p>';
	}
}

function hamburgerMenu() {
	if (menu.style.right == '20px') {
		menu.style.right = '-80px'
		icon.setAttribute('class', 'fa fa-bars');					
	} else {
		menu.style.right = '20px'
		icon.setAttribute('class', 'fa fa-times');
	}
}
