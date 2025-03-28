let seaweeds = []; // 儲存水草的屬性陣列
const seaweedCount = 100; // 水草數量
const colors = ['#cdb4db', '#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff']; // 調色盤
let iframe; // 儲存 iframe 元素

function setup() {  
  // 初始值設定
  let canvas = createCanvas(windowWidth, windowHeight); // 畫布大小為視窗的
  canvas.position(0, 0); // 將畫布置於視窗的頂層
  canvas.style('z-index', '1'); // 將畫布層級設為 1，確保在 iframe 上方
  canvas.style('pointer-events', 'none'); // 禁用畫布的滑鼠事件，讓 iframe 可操作

  // 建立 iframe
  iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.style('border', 'none');
  iframe.size(windowWidth, windowHeight); // 設定 iframe 寬高為視窗大小
  iframe.position(0, 0); // 將 iframe 置於視窗的頂層
  iframe.style('z-index', '-1'); // 將 iframe 層級設為 -1，確保在畫布下方

  // 初始化水草屬性
  initializeSeaweeds();
}

function initializeSeaweeds() {
  seaweeds = []; // 清空水草陣列
  for (let i = 0; i < seaweedCount; i++) {
    seaweeds.push({
      x: random(width), // 水草的水平位置
      height: random(200, 330), // 水草的高度（調高範圍）
      color: color(random(colors) + '80'), // 從調色盤中隨機選擇顏色，加入透明度（80 表示約 50% 透明）
      thickness: random(15, 35), // 水草的粗細（隨機範圍調整）
      swayFactor: random(0.02, 0.08), // 降低搖晃的頻率，讓變化更平滑
      swayAmplitude: random(20, 40), // 水草搖晃的幅度（增加弧度範圍）
      phaseOffset: random(TWO_PI) // 搖晃的相位偏移，讓每條水草的搖晃不同步
    });
  }
}

function draw() {
  clear(); // 清除畫布，讓背景透明

  for (let i = 0; i < seaweeds.length; i++) { // 繪製每條水草
    let seaweed = seaweeds[i]; // 取得水草屬性

    // 波浪型搖動：從底部到頂部逐漸改變搖晃
    beginShape();
    strokeWeight(seaweed.thickness); // 設定水草的粗細
    stroke(seaweed.color); // 設定水草的顏色
    noFill();  // 不填滿顏色

    // 使用 curveVertex 讓曲線更平滑
    curveVertex(seaweed.x, height); // 起始點，固定在底部
    for (let y = 0; y <= seaweed.height; y += 100) { // 增加步長，減少節點數量
      let sway = sin(frameCount * seaweed.swayFactor + seaweed.phaseOffset + y * 0.05) * seaweed.swayAmplitude;  // 搖晃的幅度
      let x = seaweed.x + sway;  // 水平位置加上搖晃
      let currentY = height - y;  // 高度由底部往上遞減
      curveVertex(x, currentY); // 繪製平滑曲線的頂點
    }
    curveVertex(seaweed.x, height - seaweed.height); // 終點，固定在頂部

    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 調整畫布大小
  iframe.size(windowWidth, windowHeight); // 調整 iframe 大小
  iframe.position(0, 0); // 調整 iframe 位置
  initializeSeaweeds(); // 重新初始化水草屬性
}
