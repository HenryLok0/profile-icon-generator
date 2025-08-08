const nameInput = document.getElementById('nameInput');
const downloadBtn = document.getElementById('downloadBtn');
const changePaletteBtn = document.getElementById('changePaletteBtn');
const includeInitialsCheckbox = document.getElementById('includeInitials');
const styleSelector = document.getElementById('styleSelector');

// Professional color palettes
const palettes = [
    ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'],
    ['#8ecae6', '#219ebc', '#023047', '#ffb703', '#fb8500'],
    ['#390099', '#9e0059', '#ff0054', '#ff5400', '#ffbd00'],
    ['#2d00f7', '#6a00f4', '#a100f2', '#b100e8', '#bc00dd'],
    ['#006466', '#065a60', '#0b525b', '#144552', '#1b3a4b', '#212f45', '#272640', '#312244', '#3e1f47', '#4d194d'],
    ['#0d47a1', '#1976d2', '#42a5f5', '#90caf9', '#e3f2fd'], // Blueprint palette
    ['#5d4037', '#795548', '#a1887f', '#d7ccc8', '#efebe9'], // Strata palette
    ['#212121', '#424242', '#616161', '#9e9e9e', '#eeeeee']  // Weave palette
];
let currentPaletteIndex = 0;

let sketch = function(p) {
    p.setup = function() {
        let p5canvas = p.createCanvas(256, 256);
        p5canvas.parent('avatarCanvasContainer');
        p.noLoop();
        
        // Event Listeners
        nameInput.addEventListener('input', () => p.redraw());
        changePaletteBtn.addEventListener('click', () => {
            currentPaletteIndex = (currentPaletteIndex + 1) % palettes.length;
            p.redraw();
        });
        includeInitialsCheckbox.addEventListener('change', () => p.redraw());
        styleSelector.addEventListener('change', () => p.redraw());
        downloadBtn.addEventListener('click', downloadAvatar);
        
        p.redraw(); // Initial draw
    };

    p.draw = function() {
        let name = nameInput.value || 'default';
        let seed = getSeed(name);
        p.randomSeed(seed);

        let currentStyle = styleSelector.value;
        let palette = palettes[currentPaletteIndex];

        if (currentStyle === 'geometric') {
            drawGeometric(p, palette);
        } else if (currentStyle === 'cosmic') {
            drawCosmic(p, palette);
        } else if (currentStyle === 'circuit') {
            drawCircuit(p, palette);
        } else if (currentStyle === 'burst') {
            drawBurst(p, palette);
        } else if (currentStyle === 'blueprint') {
            drawBlueprint(p, palette);
        } else if (currentStyle === 'strata') {
            drawStrata(p, palette);
        } else if (currentStyle === 'weave') {
            drawWeave(p, palette);
        } else if (currentStyle === 'minimalist') {
            drawMinimalist(p, palette);
        } else if (currentStyle === 'monogram') {
            drawMonogram(p, palette);
        } else if (currentStyle === 'gradientring') {
            drawGradientRing(p, palette);
        } else if (currentStyle === 'techgrid') {
            drawTechGrid(p, palette);
        } else if (currentStyle === 'softshadow') {
            drawSoftShadow(p, palette);
        } else if (currentStyle === 'abstractblocks') {
            drawAbstractBlocks(p, palette);
        } else if (currentStyle === 'signature') {
            drawSignature(p, palette);
        } else {
            drawOrganic(p, palette);
        }

        if (includeInitialsCheckbox.checked && name !== 'default' && name.trim().length > 0 && !['monogram','signature'].includes(currentStyle)) {
            drawInitials(p, name);
        }
    };

    p.drawStylePreview = function(style, palette) {
        if (style === 'geometric') {
            drawGeometric(p, palette);
        } else if (style === 'cosmic') {
            drawCosmic(p, palette);
        } else if (style === 'circuit') {
            drawCircuit(p, palette);
        } else if (style === 'burst') {
            drawBurst(p, palette);
        } else if (style === 'blueprint') {
            drawBlueprint(p, palette);
        } else if (style === 'strata') {
            drawStrata(p, palette);
        } else if (style === 'weave') {
            drawWeave(p, palette);
        } else if (style === 'minimalist') {
            drawMinimalist(p, palette);
        } else if (style === 'monogram') {
            drawMonogram(p, palette);
        } else if (style === 'gradientring') {
            drawGradientRing(p, palette);
        } else if (style === 'techgrid') {
            drawTechGrid(p, palette);
        } else if (style === 'softshadow') {
            drawSoftShadow(p, palette);
        } else if (style === 'abstractblocks') {
            drawAbstractBlocks(p, palette);
        } else if (style === 'signature') {
            drawSignature(p, palette);
        } else {
            drawOrganic(p, palette);
        }
    };

    function drawOrganic(p, palette) {
        // Create a gradient background
        let color1 = p.color(p.random(palette));
        let color2 = p.color(p.random(palette));
        while (color2.toString() === color1.toString()) {
            color2 = p.color(p.random(palette));
        }
        for (let i = 0; i <= p.height; i++) {
            let inter = p.map(i, 0, p.height, 0, 1);
            let c = p.lerpColor(color1, color2, inter);
            p.stroke(c);
            p.line(0, i, p.width, i);
        }

        // Draw organic, flowing waves
        p.noFill();
        let waveCount = p.floor(p.random(3, 7));
        for (let i = 0; i < waveCount; i++) {
            p.stroke(p.random(palette));
            p.strokeWeight(p.random(2, 6));
            p.beginShape();
            let yOffset = p.random(-50, 50);
            for (let x = -10; x < p.width + 10; x += 10) {
                let y = p.height / 2 + yOffset + p.sin(x * p.random(0.01, 0.05) + p.random(p.TWO_PI)) * p.random(20, 60);
                p.curveVertex(x, y);
            }
            p.endShape();
        }
    }

    function drawGeometric(p, palette) {
        let bgColor = p.random(palette);
        p.background(bgColor);

        p.translate(p.width / 2, p.height / 2);
        p.strokeWeight(2);

        let layers = p.floor(p.random(3, 6));
        for (let i = layers; i > 0; i--) {
            let size = (p.width / layers) * i * 0.8;
            let layerColor = p.random(palette);
            while(layerColor === bgColor) {
                layerColor = p.random(palette);
            }
            
            p.fill(layerColor);
            p.stroke(p.random(palette));

            let sides = p.floor(p.random(3, 9));
            let startAngle = p.random(p.TWO_PI);
            
            p.beginShape();
            for (let j = 0; j < sides; j++) {
                let angle = startAngle + p.map(j, 0, sides, 0, p.TWO_PI);
                let x = p.cos(angle) * size / 2;
                let y = p.sin(angle) * size / 2;
                p.vertex(x, y);
            }
            p.endShape(p.CLOSE);
        }
        p.resetMatrix();
    }

    function drawCosmic(p, palette) {
        p.background(0); // Deep space background
        
        // Draw stars
        for (let i = 0; i < 200; i++) {
            p.fill(p.random(150, 255), p.random(150, 255), p.random(200, 255), p.random(100, 255));
            p.noStroke();
            p.ellipse(p.random(p.width), p.random(p.height), p.random(1, 3));
        }

        // Draw a nebula
        p.translate(p.width / 2, p.height / 2);
        let nebulaColor1 = p.color(p.random(palette));
        let nebulaColor2 = p.color(p.random(palette));
        nebulaColor1.setAlpha(10);
        nebulaColor2.setAlpha(10);

        for (let i = 0; i < 500; i++) {
            let x = p.random(-p.width, p.width);
            let y = p.random(-p.height, p.height);
            let size = p.random(20, 100);
            let inter = p.map(p.dist(0, 0, x, y), 0, p.width/2, 0, 1);
            let c = p.lerpColor(nebulaColor1, nebulaColor2, inter);
            p.fill(c);
            p.ellipse(x, y, size, size);
        }
        p.resetMatrix();
    }

    function drawInitials(p, name) {
        let initials = getInitials(name);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(80);
        p.textFont('Montserrat');
        p.textStyle(p.BOLD);
        
        // Determine a contrasting text color
        let bgColor = p.get(p.width/2, p.height/2); // Get color from center of canvas
        let textColor = p.brightness(p.color(bgColor)) > 50 ? p.color(0, 0, 0, 200) : p.color(255, 255, 255, 200);
        let strokeColor = p.brightness(p.color(bgColor)) > 50 ? p.color(255, 255, 255, 150) : p.color(0, 0, 0, 150);

        p.stroke(strokeColor);
        p.strokeWeight(3);
        p.fill(textColor);
        p.text(initials, p.width / 2, p.height / 2);
    }

    function getInitials(name) {
        const parts = name.trim().split(' ');
        if (parts.length > 1) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        } else if (parts[0].length > 1) {
            return (parts[0][0] + parts[0][1]).toUpperCase();
        } else {
            return parts[0].toUpperCase();
        }
    }

    function getSeed(str) {
        let seed = 0;
        for (let i = 0; i < str.length; i++) {
            seed += str.charCodeAt(i);
        }
        return seed;
    }

function downloadAvatar() {
    const p5Canvas = document.querySelector('#avatarCanvasContainer canvas');
    const sizeSelect = document.getElementById('downloadSize');
    const size = sizeSelect ? parseInt(sizeSelect.value) : 256;
    if (p5Canvas) {
        // 建立離屏 canvas 並重繪
        const offCanvas = document.createElement('canvas');
        offCanvas.width = size;
        offCanvas.height = size;
        const ctx = offCanvas.getContext('2d');
        // 取得原 canvas 圖像並縮放
        ctx.drawImage(p5Canvas, 0, 0, p5Canvas.width, p5Canvas.height, 0, 0, size, size);
        const link = document.createElement('a');
        link.download = `${nameInput.value || 'avatar'}-${styleSelector.value}-${size}x${size}.png`;
        link.href = offCanvas.toDataURL('image/png');
        link.click();
    }
}

    function drawCircuit(p, palette) {
        // Circuit board style: lines and nodes
        p.background(p.random(palette));
        let nodeCount = p.floor(p.random(8, 16));
        let nodes = [];
        for (let i = 0; i < nodeCount; i++) {
            let angle = p.random(p.TWO_PI);
            let radius = p.random(60, 120);
            let x = p.width / 2 + Math.cos(angle) * radius;
            let y = p.height / 2 + Math.sin(angle) * radius;
            nodes.push({x, y});
        }
        // Draw connections
        p.strokeWeight(2);
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if (p.random() < 0.25) {
                    p.stroke(p.random(palette));
                    p.line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                }
            }
        }
        // Draw nodes
        for (let node of nodes) {
            p.fill(p.random(palette));
            p.stroke(255);
            p.ellipse(node.x, node.y, p.random(8, 16));
        }
    }

    function drawBurst(p, palette) {
        // Burst style: radiating lines from center
        let bgColor = p.random(palette);
        p.background(bgColor);
        let burstCount = p.floor(p.random(16, 32));
        let centerX = p.width / 2;
        let centerY = p.height / 2;
        let maxLen = p.width / 2 * p.random(0.8, 1.1);
        p.strokeWeight(p.random(2, 5));
        for (let i = 0; i < burstCount; i++) {
            let angle = p.map(i, 0, burstCount, 0, p.TWO_PI) + p.random(-0.1, 0.1);
            let len = maxLen * p.random(0.7, 1.0);
            p.stroke(p.random(palette));
            p.line(centerX, centerY, centerX + Math.cos(angle) * len, centerY + Math.sin(angle) * len);
        }
        // Add burst dots
        for (let i = 0; i < burstCount; i++) {
            let angle = p.map(i, 0, burstCount, 0, p.TWO_PI) + p.random(-0.1, 0.1);
            let len = maxLen * p.random(0.7, 1.0);
            p.fill(p.random(palette));
            p.noStroke();
            p.ellipse(centerX + Math.cos(angle) * len, centerY + Math.sin(angle) * len, p.random(8, 16));
        }
    }

    function drawBlueprint(p, palette) {
        // Blueprint style: grid lines and schematic shapes
        p.background(palette[4]); // Lightest color for background
        p.stroke(palette[0]); // Darkest color for lines
        p.strokeWeight(1);

        // Draw grid
        for (let i = 0; i < p.width; i += 20) {
            p.line(i, 0, i, p.height);
            p.line(0, i, p.width, i);
        }

        // Draw some schematic circles
        p.noFill();
        p.strokeWeight(2);
        for (let i = 0; i < p.floor(p.random(3, 6)); i++) {
            p.stroke(p.random(palette.slice(0, 4)));
            let x = p.random(p.width);
            let y = p.random(p.height);
            let r = p.random(20, 80);
            p.ellipse(x, y, r, r);
        }
    }

    function drawStrata(p, palette) {
        // Strata style: layered, earthy look
        p.noStroke();
        let y = 0;
        while (y < p.height) {
            let layerHeight = p.random(10, 40);
            p.fill(p.random(palette));
            p.rect(0, y, p.width, layerHeight);
            y += layerHeight;
        }

        // Add some texture
        for (let i = 0; i < 5000; i++) {
            let x = p.random(p.width);
            let y = p.random(p.height);
            let c = p.get(x, y);
            p.stroke(p.red(c) * 0.9, p.green(c) * 0.9, p.blue(c) * 0.9, 50);
            p.point(x, y);
        }
    }

    function drawWeave(p, palette) {
        // Weave style: interlocking lines
        p.background(palette[4]);
        p.strokeWeight(p.random(4, 8));

        // Horizontal lines
        for (let y = 0; y < p.height; y += 20) {
            p.stroke(p.random(palette.slice(0, 4)));
            p.line(0, y, p.width, y);
        }
        // Vertical lines
        for (let x = 0; x < p.width; x += 20) {
            p.stroke(p.random(palette.slice(0, 4)));
            p.line(x, 0, x, p.height);
        }
    }

    function drawMinimalist(p, palette) {
        // 極簡主義：柔和背景+簡單線條，根據名字隨機
        p.background(palette[3]);
        let name = nameInput.value || 'A';
        p.randomSeed(getSeed(name));
        p.noFill();
        p.stroke(palette[0]);
        p.strokeWeight(4);
        // 幾條平行線，位置隨名字變化
        for (let i = 1; i <= 3; i++) {
            let x = p.random(30, 80) + i * p.random(30, 50);
            let y1 = p.random(30, 60);
            let y2 = p.random(120, 180);
            p.line(x, y1, x, y2);
        }
        // 幾個圓形色塊，位置與大小隨名字變化
        p.noStroke();
        p.fill(palette[1]);
        p.ellipse(p.random(40, 100), p.random(40, 100), p.random(30, 50), p.random(30, 50));
        p.fill(palette[2]);
        p.ellipse(p.random(120, 180), p.random(120, 180), p.random(20, 40), p.random(20, 40));
    }

    function drawMonogram(p, palette) {
        // Monogram：大字母+幾何背景，顏色和位置隨名字隨機
        p.background(palette[4]);
        p.noStroke();
        // 幾何色塊（隨機顏色與位置）
        let seed = getSeed(nameInput.value || 'A');
        p.randomSeed(seed);
        p.fill(p.random(palette));
        p.rect(p.random(10, 60), p.random(10, 80), p.random(100, 160), p.random(40, 80), 20);
        p.fill(p.random(palette));
        p.ellipse(p.random(60, 140), p.random(100, 180), p.random(60, 100), p.random(30, 60));
        // 大寫字母
        let initials = getInitials(nameInput.value || 'A');
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(100);
        p.textFont('Montserrat');
        p.fill(p.random(palette));
        p.text(initials, p.width / 2, p.height / 2);
    }

    function drawGradientRing(p, palette) {
        // 漸層圓環，現代感，根據名字隨機
        let name = nameInput.value || 'A';
        p.randomSeed(getSeed(name));
        p.background(palette[3]);
        p.noFill();
        // 隨名字改變顏色、圓環數量、粗細
        let colorA = p.color(palette[p.floor(p.random(palette.length))]);
        let colorB = p.color(palette[p.floor(p.random(palette.length))]);
        while (colorB.toString() === colorA.toString()) {
            colorB = p.color(palette[p.floor(p.random(palette.length))]);
        }
        let ringCount = p.floor(p.random(5, 10));
        let minR = p.random(30, 50);
        let maxR = p.random(70, 100);
        for (let i = 0; i < ringCount; i++) {
            let r = p.map(i, 0, ringCount-1, maxR, minR);
            let c = p.lerpColor(colorA, colorB, i/(ringCount-1));
            p.stroke(c);
            p.strokeWeight(p.random(6, 12));
            p.ellipse(p.width/2, p.height/2, r*2, r*2);
        }
    }

    function drawTechGrid(p, palette) {
        // 科技感網格
        p.background(palette[4]);
        p.stroke(palette[0]);
        p.strokeWeight(2);
        for (let x = 30; x < p.width; x += 30) {
            p.line(x, 0, x, p.height);
        }
        for (let y = 30; y < p.height; y += 30) {
            p.line(0, y, p.width, y);
        }
        // 點陣
        p.noStroke();
        for (let i = 0; i < 20; i++) {
            p.fill(p.random(palette));
            p.ellipse(p.random(p.width), p.random(p.height), p.random(6, 14));
        }
    }

    function drawSoftShadow(p, palette) {
        // 柔和陰影，根據名字隨機
        let name = nameInput.value || 'A';
        p.randomSeed(getSeed(name));
        p.background(palette[p.floor(p.random(palette.length))]);
        p.noStroke();
        let centerX = p.random(100, 156);
        let centerY = p.random(100, 156);
        let baseR = p.random(60, 100);
        // 多層柔影圓，顏色、位置、大小隨名字
        for (let i = 0; i < 3; i++) {
            let offsetX = p.random(-20, 20) + i * p.random(5, 15);
            let offsetY = p.random(-20, 20) + i * p.random(5, 15);
            let r = baseR - i * p.random(10, 25);
            let c = p.color(palette[p.floor(p.random(palette.length))]);
            c.setAlpha(80);
            p.fill(c);
            p.ellipse(centerX + offsetX, centerY + offsetY, r, r);
        }
        // 主圓
        let mainC = p.color(palette[p.floor(p.random(palette.length))]);
        p.fill(mainC);
        p.ellipse(centerX, centerY, baseR * p.random(0.7, 1.1), baseR * p.random(0.7, 1.1));
    }

    function drawAbstractBlocks(p, palette) {
        // 抽象色塊
        p.background(palette[4]);
        for (let i = 0; i < 5; i++) {
            p.fill(p.random(palette));
            p.rect(p.random(20, 180), p.random(20, 180), p.random(30, 60), p.random(20, 50), 10);
        }
    }

    function drawSignature(p, palette) {
        // 仿手寫簽名
        p.background(palette[3]);
        p.stroke(palette[0]);
        p.strokeWeight(4);
        p.noFill();
        p.beginShape();
        let seed = getSeed(nameInput.value || 'A');
        p.randomSeed(seed);
        for (let x = 40; x < 200; x += 20) {
            let y = 120 + p.random(-30, 30);
            p.curveVertex(x, y);
        }
        p.endShape();
        // 加上名字首字母
        let initials = getInitials(nameInput.value || 'A');
        p.textAlign(p.RIGHT, p.BOTTOM);
        p.textSize(40);
        p.textFont('Montserrat');
        p.fill(palette[1]);
        p.text(initials, 190, 190);
    }
};

new p5(sketch);

// ===== 語言切換功能 =====
document.addEventListener('DOMContentLoaded', function() {
    const langSwitchBtn = document.getElementById('langSwitchBtn');
    let currentLang = 'en'; // 預設英文

    function setLang(lang) {
        currentLang = lang;
        // 標題
        const mainTitle = document.getElementById('mainTitle');
        if (mainTitle) mainTitle.textContent = mainTitle.dataset[lang];
        // 說明
        const descText = document.getElementById('descText');
        if (descText) descText.textContent = descText.dataset[lang];
        // 輸入框 placeholder
        if (nameInput) nameInput.placeholder = nameInput.dataset[lang];
        // Style 標籤
        const styleLabel = document.getElementById('styleLabel');
        if (styleLabel) styleLabel.textContent = styleLabel.dataset[lang];
        // Style 選單
        for (const opt of styleSelector.options) {
            if (opt.dataset[lang]) opt.textContent = opt.dataset[lang];
        }
        // Palette 按鈕
        if (changePaletteBtn) changePaletteBtn.textContent = changePaletteBtn.dataset[lang];
        // Include Initials 標籤
        const initialsLabel = document.getElementById('initialsLabel');
        if (initialsLabel) initialsLabel.childNodes[1].textContent = initialsLabel.dataset[lang];
        // Download 按鈕
        if (downloadBtn) downloadBtn.textContent = downloadBtn.dataset[lang];
    }

    if (langSwitchBtn) {
        langSwitchBtn.addEventListener('click', function() {
            setLang(currentLang === 'en' ? 'zh' : 'en');
        });
    }
    // 頁面載入時預設英文
    setLang('en');
});
