const items = document.querySelectorAll('.ganken-item');
let index = 0;
let isAnimating = true;
let intervalId;
const button = document.querySelector('.button_start');
const buttonAll = document.querySelectorAll('.button_start');
const gu = document.querySelector('#gu');
const choki = document.querySelector('#choki');
const par = document.querySelector('#par');
const judgment = document.querySelector('#judgment');
const rouletteItems = document.querySelectorAll('.roulette-item'); // .roulette-item の要素をすべて取得

function opacity0() {
	items.forEach(item => {
		item.style.opacity = '0';
	});
}

function toggleOpacity() {
	items.forEach(item => {
		item.style.opacity = '0';
	});
	if (index == 3) {
		index = (index + 1) % items.length;
	}
	items[index].style.opacity = '1';
	index = (index + 1) % items.length;
}

function buttonDisabled() {
	buttonAll.forEach(buttonAll => {
		buttonAll.disabled = true;
	});
}

function buttonRestart() {
	buttonAll.forEach(buttonAll => {
		buttonAll.disabled = false;
	});
}

function judgmentLose() {
	judgment.innerHTML = '負け！';
}

function judgmentDraw() {
	judgment.innerHTML = 'あいこ！';
}

function judgmentWin() {
	const duration = 10000; // 10秒
	const factor = 1.2; // 遅延を増加させる
	let currentDelay = 100; // 最初の表示時間
	let previousIndex = -1; // 最初は前回のインデックスがない状態

	buttonDisabled();
	judgment.innerHTML = '勝ち！';

	rouletteItems.forEach((item, index) => {
		setTimeout(() => {
			if (previousIndex >= 0) {
				rouletteItems[previousIndex].classList.remove('active');
			}
			item.classList.add('active');
			previousIndex = index;
		}, currentDelay);
		currentDelay *= factor;
	});

	setTimeout(() => {
		if (previousIndex >= 0) {
			rouletteItems[previousIndex].classList.remove('active');
		}
	}, duration);
}


function playGame(e) {
	const user = e.target.id;
	const pc = Math.ceil(Math.random() * 10);
	
	if (isAnimating) {
		clearInterval(intervalId);
		if(pc == 1 || pc == 4 || pc == 7) {
			//PCがグーの時
			opacity0();
			items[0].style.opacity = '1';
			index = 0;
			if(user == 'gu') {
				judgmentDraw();
			} else if(user == 'choki') {
				judgmentLose();
			} else {
				judgmentWin();
			}
		} else if(pc == 2 || pc == 5 || pc == 8) {
			//PCがチョキの時
			opacity0();
			items[1].style.opacity = '1';
			index = 1;
			if(user == 'gu') {
				judgmentWin();
			} else if(user == 'choki') {
				judgmentDraw();
			} else {
				judgmentLose();
			}
		} else if(pc == 3 || pc == 6 || pc == 9) {
			//PCがパーの時
			opacity0();
			items[2].style.opacity = '1';
			index = 2;
			if(user == 'gu') {
				judgmentLose();
			} else if(user == 'choki') {
				judgmentWin();
			} else {
				judgmentDraw();
			}
		} else {
			//PCがビッグボスした時
			opacity0();
			items[3].style.opacity = '1';
			index = 3;
			judgment.innerHTML = 'なんじゃこりゃ';
		}
	} else {
		intervalId = setInterval(toggleOpacity, 100);
	}
	isAnimating = !isAnimating;
}

// アニメーションを開始
intervalId = setInterval(toggleOpacity, 100);

// ボタンクリックでストップイベントが発火
gu.addEventListener('click', playGame);
choki.addEventListener('click', playGame);
par.addEventListener('click', playGame);
