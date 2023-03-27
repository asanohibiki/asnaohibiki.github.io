'use strict'

//idの設定
const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");
const resetButton = document.getElementById("reset-btn");
const time = document.getElementById("time");
const mazeFrame = document.getElementById("maze-frame");

//使用する変数の初期化
let startTime;
let stopTime = 0;
let timeOutID;
let flg = false;

//ボタンの無効化
startButton.disabled = false;
stopButton.disabled = true;
resetButton.disabled = true;

function displayTime() {
  const currentTime = new Date(Date.now() - startTime + stopTime);
  const h = String(currentTime.getHours() - 9).padStart(2, '0');
  const m = String(currentTime.getMinutes()).padStart(2, '0');
  const s = String(currentTime.getSeconds()).padStart(2, '0');
  const ms = String(currentTime.getMilliseconds()).padStart(3, '0');

  time.textContent = h + ":" + m + ":" + s + "." + ms;
  timeOutID = setTimeout(displayTime, 10);
}

startButton.addEventListener('click', function () {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = true;
  flg = true;
  startTime = Date.now();
  displayTime();
});

stopButton.addEventListener('click', function () {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
  flg = false;
  clearTimeout(timeOutID);
  stopTime += (Date.now() - startTime);
});

resetButton.addEventListener('click', function () {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
  flg = false;
  time.textContent = '00:00:00.000';
  stopTime = 0;
  human.x = 0;
  human.y = 0;
  human.move = 0;
});

//canvasの設定
const canvas = document.getElementById('canvas');
canvas.width = 640;		//canvasの横幅（よこはば）
canvas.height = 640;	//canvasの縦幅（たてはば）

//コンテキストを取得
const ctx = canvas.getContext('2d');

//humanオブジェクトを作成
const human = new Object();
human.img = new Image();
human.img.src = 'asnaohibiki.github.io/stand_businessman_top.png';
human.x = 0;
human.y = 0;
human.move = 0;

//マップチップのImageオブジェクトを作る
const mapchip = new Image();
mapchip.src = 'asnaohibiki.github.io/map.png';

//スタート、ゴールオブジェクトを作成
// const startPos = new Object();
// const goalPos = new Object();
const startPos = new Image();
const goalPos= new Image();
startPos.src = "asnaohibiki.github.io/start.png";
goalPos.src = "asnaohibiki.github.io/goal.png";

//キーボードのオブジェクトを作成
const key = new Object();
key.up = false;
key.down = false;
key.right = false;
key.left = false;
key.push = '';

//マップの作成（さくせい）
function makeMap() {

}
let map = [
  [2, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0],
  [0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0],
  [0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0],
  [1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1],
  [0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 3]
]

//メインループ
function main() {
    //塗りつぶす色を指定
    ctx.fillStyle = "rgb( 0, 0, 0 )";
    //塗りつぶす
    ctx.fillRect(0, 0, 640, 640);

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === 0) { 
          ctx.drawImage(mapchip, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);
        } else if (map[y][x] === 1) {
         ctx.drawImage(mapchip, 32, 0, 32, 32, 32 * x, 32 * y, 32, 32);
        } else if (map[y][x] === 2) {
          ctx.drawImage(startPos, 0, 0, 32, 3, 32 * x, 32 * y, 32 , 32)
        } else if (map[y][x] === 3) {
          ctx.drawImage(goalPos, 0, 0, 32, 3, 32 * x, 32 * y, 32 , 32)
        }
      }
    }

    //画像を表示
    ctx.drawImage(human.img, human.x, human.y);

    addEventListener("keydown", keydownfunc, false);
    addEventListener("keyup", keyupfunc, false);

    if (human.move === 0 && flg === true) {
      if (key.left === true) {
        let x = human.x / 32;
        let y = human.y / 32;
        x--;
        if (map[y][x] === 0 || map[y][x] === 2) {
          human.move = 32;
          key.push = 'left';
        }
      }
      if (key.up === true) {
        let x = human.x / 32;
        let y = human.y / 32;
        if (y > 0) {
          y--;
          if (map[y][x] === 0 || map[y][x] === 2) {
            human.move = 32;
            key.push = 'up';
          }
        }
      }
      if (key.right === true) {
        let x = human.x / 32;
        let y = human.y / 32;
        x++;
        if (map[y][x] === 0 || map[y][x] === 2) {
          human.move = 32;
          key.push = 'right';
        }
      }
      if (key.down === true) {
        let x = human.x / 32;
        let y = human.y / 32;
        if (y < 19) {
          y++;
          if (map[y][x] === 3) {
            startButton.disabled = false;
            stopButton.disabled = true;
            resetButton.disabled = true;
            window.alert(`おめでとう！${time.innerText}でゴールだよ！`)
            flg = false;
            time.textContent = '00:00:00.000';
            stopTime = 0;
            human.x = 0;
            human.y = 0;
            human.move = 0;
          } else if (map[y][x] === 0 || map[y][x] === 2) {
            human.move = 32;
            key.push = 'down';
          }
        }
      }
    }

    //human.moveが0より大きい場合は、4pxずつ移動を続ける
    if (human.move > 0) {
      human.move -= 4;
      if (key.push === 'left') human.x -= 4;
      if (key.push === 'up') human.y -= 4;
      if (key.push === 'right') human.x += 4;
      if (key.push === 'down') human.y += 4;
    }

    requestAnimationFrame(main);
  }
  //ページと依存している全てのデータが読み込まれたら、メインループ開始
  addEventListener('load', main(), false);

  //キーボードが押されたときに呼び出される関数
  function keydownfunc(event) {
    let key_code = event.keyCode;
    if (key_code === 37) key.left = true;
    if (key_code === 38) key.up = true;
    if (key_code === 39) key.right = true;
    if (key_code === 40) key.down = true;
    // event.preventDefault();		//方向キーでブラウザがスクロールしないようにする
  }

  //キーボードが放されたときに呼び出される関数
  function keyupfunc(event) {
    let key_code = event.keyCode;
    if (key_code === 37) key.left = false;
    if (key_code === 38) key.up = false;
    if (key_code === 39) key.right = false;
    if (key_code === 40) key.down = false;
  }
