//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go라는 버튼을 누름
//만약 유저가 랜덤번호를 맞추면, 맞췄습니다
//랜덤번호<유저번호 down
//랜덤번호>유저번호 up
//reset버튼을 누르면 게임 리셋
//5번의 기회를 다 쓰면 게임이 끝난다(더이상 추측 불가, 버튼 disabled)
//유저가 1~100범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깍지 않는다.

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultText = document.getElementById("result-text"); // 수정: result-text 요소 선택
let resetButton = document.getElementById("reset-button");
let chances = 3;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];
let rightAnswer = document.getElementById("right-answer");
let resultAreaImg = document.getElementById("main-img");

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function() {
    userInput.value = "";
});

function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log("정답", computerNum);
    rightAnswer.textContent = `정답:${computerNum}`;
}

function play() {
    const userValue = userInput.value;
    if (userValue < 1 || userValue > 100) {
        resultText.textContent = "1과 100사이 숫자를 입력해주세요";
        return;
    }

    if (history.includes(userValue)) {
        resultText.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.";
        return;
    }

    chances--;
    chanceArea.textContent = `남은 기회:${chances}번`;
    console.log("chance", chances);

    if (userValue < computerNum) {
        resultAreaImg.src = "image/up.png";
        resultText.textContent = "UP!!";
    } else if (userValue > computerNum) {
        resultAreaImg.src = "image/down.png";
        resultText.textContent = "DOWN!!";
    } else {
        resultAreaImg.src="image/right.png"
        resultText.textContent = "맞추셨습니다!!";
        gameOver = true;
    }

    history.push(userValue);
    console.log(history);

    if (userValue != computerNum && chances < 1) {
        gameOver = true;
    }

    if (gameOver) {
        playButton.disabled = true;
        if (userValue != computerNum) {
            resultAreaImg.src="image/gameover.png"
        }
    }
}

function reset() {
    // user input창이 깨끗하게 정리되고
    userInput.value = "";
    // 새로운 번호가 생성되고
    pickRandomNum();
    // 기회:3번
    chances = 3;
    chanceArea.textContent = `남은기회:${chances}번`;
    // go버튼 활성화
    playButton.disabled = false;
    // 배열 비우기
    history = [];
    // 게임 상태 초기화
    gameOver = false;

    resultAreaImg.src = "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2864400/header.jpg?t=1711018815";

    resultText.textContent = "과연 정답은 무엇일까?!?!";
}

pickRandomNum();