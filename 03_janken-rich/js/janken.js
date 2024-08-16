function playGame(e) {
	const user = e.target.id;
	const pc = Math.ceil(Math.random() * 10);

	if (isAnimating) {
		clearInterval(intervalId);
		const result = determineResult(pc, user);
		displayResult(result);
	} else {
		intervalId = setInterval(toggleOpacity, 100);
	}
	isAnimating = !isAnimating;
}

// 結果を判定する関数
function determineResult(pc, user) {
	let result = {};
	if(pc == 1 || pc == 4 || pc == 7) {
		result.index = 0;
		if(user == 'gu') {
			result.judgment = 'あいこ！';
		} else if(user == 'choki') {
			result.judgment = '負け！';
		} else {
			result.judgment = '勝ち！';
			
		}
	} else if(pc == 2 || pc == 5 || pc == 8) {
		result.index = 1;
		if(user == 'gu') {
			result.judgment = '勝ち！';
		} else if(user == 'choki') {
			result.judgment = 'あいこ！';
		} else {
			result.judgment = '負け！';
		}
	} else if(pc == 3 || pc == 6 || pc == 9) {
		result.index = 2;
		if(user == 'gu') {
			result.judgment = '負け！';
		} else if(user == 'choki') {
			result.judgment = '勝ち！';
		} else {
			result.judgment = 'あいこ！';
		}
	} else {
		result.index = 3;
		result.judgment = 'なんじゃこりゃ';
	}
	return result;
}

// 結果を表示する関数
function displayResult(result) {
	items.forEach(item => {
		item.style.opacity = '0';
	});
	items[result.index].style.opacity = '1';
	judgment.innerHTML = result.judgment;
}
