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
	judgment.innerHTML = '...';
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

function buttonReset() {
	buttonAll.forEach(buttonAll => {
		buttonAll.disabled = false;
	});
}

function randomNumber() {
	const n = Math.ceil(Math.random() * 12);
	rouletteItems[n].classList.add('done');
	setTimeout(() =>{
		rouletteItems[n].classList.remove('done');}, 2000)
}

function rouletteStart(disabledTime) {
	const duration = disabledTime - 3000; // 指定した期間より3秒引いた時間だけ回る
	const factor = 1.1; // 遅延を増加させる
	let currentDelay = 10; // 最初の表示時間
	let previousIndex = -1; // 最初はclassを削除するif文に入らない
	let index = 0;

	function loop() {
		if (previousIndex >= 0) {
			rouletteItems[previousIndex].classList.remove('active');
		}
		rouletteItems[index].classList.add('active');
		previousIndex = index;
		index = (index + 1) % rouletteItems.length;

		if (currentDelay < duration) {
			setTimeout(loop, currentDelay);
			currentDelay *= factor; // 遅延時間を増加
		} else {
				// ルーレットを終了
				setTimeout(() => {
					rouletteItems[previousIndex].classList.remove('active');
					randomNumber();
				}, currentDelay);
			}
		}
	
		loop();
	}

function judgmentLose() {
	judgment.innerHTML = 'ポン！ズコー！';
}

function judgmentDraw() {
	judgment.innerHTML = 'あいこでしょ！';
}

function judgmentWin() {
	disabledTime = 3500;

	buttonDisabled();
	rouletteStart(disabledTime)
	judgment.innerHTML = 'ポン！やっぴー！';
	setTimeout(() => {
		buttonReset()}, disabledTime);
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
				judgmentDrae();
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
