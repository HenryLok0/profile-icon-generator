const nameInput = document.getElementById('nameInput');
const downloadBtn = document.getElementById('downloadBtn');
const changePaletteBtn = document.getElementById('changePaletteBtn');
const includeInitialsCheckbox = document.getElementById('includeInitials');
const styleSelector = document.getElementById('styleSelector');
const mainColorPicker = document.getElementById('mainColorPicker');

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
let customMainColor = mainColorPicker ? mainColorPicker.value : null;

let sketch = function(p) {
    p.setup = function() {
        let p5canvas = p.createCanvas(256, 256);
        p5canvas.parent('avatarCanvasContainer');
        p.noLoop();
        // 將主實例暴露給全域，提供預覽產生使用
        window.avatarP5 = p;

        // Event Listeners
        nameInput.addEventListener('input', () => p.redraw());
        changePaletteBtn.addEventListener('click', () => {
            currentPaletteIndex = (currentPaletteIndex + 1) % palettes.length;
            p.redraw();
        });
        includeInitialsCheckbox.addEventListener('change', () => p.redraw());
        styleSelector.addEventListener('change', () => p.redraw());
        downloadBtn.addEventListener('click', downloadAvatar);
        if (mainColorPicker) {
            mainColorPicker.addEventListener('input', () => {
                customMainColor = mainColorPicker.value;
                p.redraw();
            });
        }

        p.redraw(); // Initial draw
    };

    p.draw = function() {
        let name = nameInput.value || 'default';
        let seed = getSeed(name);
        p.randomSeed(seed);

        let currentStyle = styleSelector.value;
        let palette = palettes[currentPaletteIndex].slice();
        // 如果有自訂主色，將 palette[0] 替換為主色
        if (customMainColor) {
            palette[0] = customMainColor;
        }

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
        } else if (currentStyle === 'pixelmosaic') {
            drawPixelMosaic(p, palette);
        } else if (currentStyle === 'crystal') {
            drawCrystal(p, palette);
        } else if (currentStyle === 'inksplash') {
            drawInkSplash(p, palette);
        } else if (currentStyle === 'papercut') {
            drawPaperCut(p, palette);
        } else if (currentStyle === 'wavegrid') {
            drawWaveGrid(p, palette);
        } else if (currentStyle === 'polygonalmesh') {
            drawPolygonalMesh(p, palette);
        } else if (currentStyle === 'retroneon') {
            drawRetroNeon(p, palette);
        } else if (currentStyle === 'brushstroke') {
            drawBrushStroke(p, palette);
        } else if (currentStyle === 'bubblepop') {
            drawBubblePop(p, palette);
        } else if (currentStyle === 'metallicfoil') {
            drawMetallicFoil(p, palette);
        } else if (currentStyle === 'doodleline') {
            drawDoodleLine(p, palette);
        } else if (currentStyle === 'gradientmesh') {
            drawGradientMesh(p, palette);
        } else if (currentStyle === 'halftonedot') {
            drawHalftoneDot(p, palette);
        } else if (currentStyle === 'glitcheffect') {
            drawGlitchEffect(p, palette);
        } else if (currentStyle === 'natureleaf') {
            drawNatureLeaf(p, palette);
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
        } else if (style === 'pixelmosaic') {
            drawPixelMosaic(p, palette);
        } else if (style === 'crystal') {
            drawCrystal(p, palette);
        } else if (style === 'inksplash') {
            drawInkSplash(p, palette);
        } else if (style === 'papercut') {
            drawPaperCut(p, palette);
        } else if (style === 'wavegrid') {
            drawWaveGrid(p, palette);
        } else if (style === 'polygonalmesh') {
            drawPolygonalMesh(p, palette);
        } else if (style === 'retroneon') {
            drawRetroNeon(p, palette);
        } else if (style === 'brushstroke') {
            drawBrushStroke(p, palette);
        } else if (style === 'bubblepop') {
            drawBubblePop(p, palette);
        } else if (style === 'metallicfoil') {
            drawMetallicFoil(p, palette);
        } else if (style === 'doodleline') {
            drawDoodleLine(p, palette);
        } else if (style === 'gradientmesh') {
            drawGradientMesh(p, palette);
        } else if (style === 'halftonedot') {
            drawHalftoneDot(p, palette);
        } else if (style === 'glitcheffect') {
            drawGlitchEffect(p, palette);
        } else if (style === 'natureleaf') {
            drawNatureLeaf(p, palette);
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

    function drawPixelMosaic(p, palette) {
        // 低解析像素方塊
        const cell = p.floor(p.random(8, 16));
        const cols = p.ceil(p.width / cell);
        const rows = p.ceil(p.height / cell);
        p.noStroke();
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const c = p.color(p.random(palette));
                c.setAlpha(p.random(160, 255));
                p.fill(c);
                p.rect(x * cell, y * cell, cell, cell);
            }
        }
    }

    function drawCrystal(p, palette) {
        // 多面體切割的晶體感
        p.background(p.random(palette));
        p.noStroke();
        const center = { x: p.width/2, y: p.height/2 };
        const shardCount = p.floor(p.random(12, 20));
        for (let i = 0; i < shardCount; i++) {
            const angleA = p.random(p.TWO_PI);
            const angleB = angleA + p.random(0.2, 0.8);
            const r1 = p.random(20, 80);
            const r2 = p.random(80, 140);
            const c = p.color(p.random(palette));
            c.setAlpha(p.random(160, 230));
            p.fill(c);
            p.beginShape();
            p.vertex(center.x, center.y);
            p.vertex(center.x + Math.cos(angleA) * r1, center.y + Math.sin(angleA) * r1);
            p.vertex(center.x + Math.cos(angleB) * r2, center.y + Math.sin(angleB) * r2);
            p.endShape(p.CLOSE);
        }
    }

    function drawInkSplash(p, palette) {
        // 濃淡不一的墨水噴濺
        p.background(p.random(palette));
        p.noStroke();
        const drops = p.floor(p.random(6, 12));
        for (let i = 0; i < drops; i++) {
            const x = p.random(40, 216);
            const y = p.random(40, 216);
            const base = p.random(20, 50);
            for (let r = base; r > 0; r -= 2) {
                const c = p.color(p.random(palette));
                c.setAlpha(p.map(r, 0, base, 20, 180));
                p.fill(c);
                p.ellipse(x + p.random(-3, 3), y + p.random(-3, 3), r * 2 * p.random(0.9, 1.1), r * 2 * p.random(0.8, 1.2));
            }
            // 放射細線
            p.stroke(p.random(palette));
            p.strokeWeight(1);
            const rays = p.floor(p.random(6, 12));
            for (let k = 0; k < rays; k++) {
                const a = p.random(p.TWO_PI);
                const len = p.random(10, 40);
                p.line(x, y, x + Math.cos(a) * len, y + Math.sin(a) * len);
            }
            p.noStroke();
        }
    }

    function drawPaperCut(p, palette) {
        // 層層紙雕陰影
        p.background(palette[4]);
        p.noStroke();
        const layers = p.floor(p.random(4, 7));
        for (let i = 0; i < layers; i++) {
            const c = p.color(p.random(palette));
            c.setAlpha(220);
            p.fill(c);
            const inset = i * p.random(6, 12);
            p.beginShape();
            p.vertex(0 + inset, 0 + inset);
            p.bezierVertex(80, 10 + inset, 60, 80, 120, 60 + inset);
            p.bezierVertex(200, 80 + inset, 160, 200, 256 - inset, 256 - inset);
            p.vertex(0 + inset, 256 - inset);
            p.endShape(p.CLOSE);
        }
    }

    function drawWaveGrid(p, palette) {
        // 波浪形網格
        p.background(palette[4]);
        p.noFill();
        p.stroke(palette[0]);
        for (let y = 20; y <= 240; y += 16) {
            p.beginShape();
            for (let x = 0; x <= 256; x += 16) {
                const yy = y + Math.sin((x * 0.12) + y * 0.08) * 6;
                p.vertex(x, yy);
            }
            p.endShape();
        }
        for (let x = 20; x <= 240; x += 16) {
            p.beginShape();
            for (let y = 0; y <= 256; y += 16) {
                const xx = x + Math.sin((y * 0.12) + x * 0.08) * 6;
                p.vertex(xx, y);
            }
            p.endShape();
        }
    }

    function drawPolygonalMesh(p, palette) {
        // 交錯多邊形網
        p.background(p.random(palette));
        p.noFill();
        p.stroke(p.random(palette));
        const points = [];
        for (let i = 0; i < 30; i++) {
            points.push({ x: p.random(0, 256), y: p.random(0, 256) });
        }
        // 連線成隨機多邊形
        for (let i = 0; i < 20; i++) {
            p.beginShape();
            const start = p.floor(p.random(points.length));
            const count = p.floor(p.random(3, 7));
            for (let k = 0; k < count; k++) {
                const idx = (start + k * p.floor(p.random(1, 4))) % points.length;
                p.vertex(points[idx].x, points[idx].y);
            }
            p.endShape(p.CLOSE);
        }
        // 節點
        p.noStroke();
        for (const pt of points) {
            p.fill(p.random(palette));
            p.ellipse(pt.x, pt.y, 4, 4);
        }
    }

    function drawRetroNeon(p, palette) {
        // 霓虹線條與幾何
        p.background(10);
        p.noFill();
        const neon = p.color(p.random(palette));
        p.stroke(neon);
        p.strokeWeight(3);
        // 三角形與圓
        p.triangle(40, 200, 128, 40, 216, 200);
        p.ellipse(128, 128, 140, 140);
        // 幾條發光線
        for (let i = 0; i < 6; i++) {
            const y = 40 + i * 30;
            p.line(30, y, 226, y);
        }
        // 光暈
        p.noStroke();
        const glow = neon;
        for (let r = 160; r > 120; r -= 4) {
            const c = p.color(glow);
            c.setAlpha(p.map(r, 120, 160, 0, 60));
            p.fill(c);
            p.ellipse(128, 128, r, r);
        }
    }

    function drawBrushStroke(p, palette) {
        // 畫筆筆觸
        p.background(p.random(palette));
        p.noStroke();
        for (let i = 0; i < 12; i++) {
            const c = p.color(p.random(palette));
            c.setAlpha(180);
            p.fill(c);
            const x = p.random(20, 220);
            const y = p.random(20, 220);
            const w = p.random(40, 120);
            const h = p.random(10, 30);
            p.push();
            p.translate(x, y);
            p.rotate(p.random(-0.6, 0.6));
            p.ellipse(0, 0, w, h);
            p.pop();
        }
    }

    function drawBubblePop(p, palette) {
        // 重疊泡泡
        p.background(p.random(palette));
        p.noStroke();
        for (let i = 0; i < 20; i++) {
            const c = p.color(p.random(palette));
            c.setAlpha(p.random(60, 140));
            p.fill(c);
            const r = p.random(12, 48);
            p.ellipse(p.random(20, 236), p.random(20, 236), r * 2, r * 2);
        }
    }

    function drawMetallicFoil(p, palette) {
        // 金屬箔質感（雜訊漸層）
        const base = p.color(p.random(palette));
        p.background(base);
        for (let y = 0; y < p.height; y++) {
            for (let x = 0; x < p.width; x++) {
                const n = p.noise(x * 0.05, y * 0.05);
                const b = p.map(n, 0, 1, -40, 40);
                const c = p.color(
                    p.constrain(p.red(base) + b, 0, 255),
                    p.constrain(p.green(base) + b, 0, 255),
                    p.constrain(p.blue(base) + b, 0, 255)
                );
                p.stroke(c);
                p.point(x, y);
            }
        }
        // 高光條紋
        p.noFill();
        p.stroke(255, 120);
        for (let i = 0; i < 6; i++) {
            p.arc(128, 128, 220 - i * 20, 220 - i * 20, -0.6, 0.3);
        }
    }

    function drawDoodleLine(p, palette) {
        // 手繪塗鴉線
        p.background(p.random(palette));
        p.noFill();
        p.stroke(p.random(palette));
        p.strokeWeight(2);
        for (let i = 0; i < 12; i++) {
            p.beginShape();
            let y = p.random(10, 246);
            for (let x = 10; x <= 246; x += 12) {
                y += p.random(-6, 6);
                p.vertex(x, y);
            }
            p.endShape();
        }
        // 小圖案
        p.strokeWeight(1);
        for (let i = 0; i < 20; i++) {
            const x = p.random(20, 236);
            const y = p.random(20, 236);
            p.circle(x, y, p.random(3, 8));
            p.square(x, y, p.random(3, 8));
        }
    }

    function drawGradientMesh(p, palette) {
        // 平滑漸層網格（多層半透明橢圓）
        p.background(p.random(palette));
        p.noStroke();
        for (let i = 0; i < 30; i++) {
            let c = p.color(p.random(palette));
            c.setAlpha(80);
            p.fill(c);
            p.ellipse(p.random(0, 256), p.random(0, 256), p.random(80, 200), p.random(80, 200));
        }
    }

    function drawHalftoneDot(p, palette) {
        // 網點半色調
        p.background(p.random(palette));
        p.noStroke();
        const step = 12;
        for (let y = 6; y < 256; y += step) {
            for (let x = 6; x < 256; x += step) {
                const v = p.noise(x * 0.05, y * 0.05);
                const r = p.map(v, 0, 1, 2, 8);
                p.fill(p.random(palette));
                p.circle(x, y, r);
            }
        }
    }

    function drawGlitchEffect(p, palette) {
        // 故障位移效果
        p.background(p.random(palette));
        // 幾個彩色條帶
        for (let i = 0; i < 10; i++) {
            const y = p.random(0, 256);
            const h = p.random(4, 14);
            const dx = p.random(-12, 12);
            p.fill(p.random(palette));
            p.noStroke();
            p.rect(0 + dx, y, 256, h);
        }
        // 隨機方塊錯位
        for (let i = 0; i < 40; i++) {
            const x = p.random(0, 240);
            const y = p.random(0, 240);
            const w = p.random(6, 24);
            const h = p.random(6, 24);
            const dx = p.random(-8, 8);
            const dy = p.random(-4, 4);
            p.fill(p.random(palette));
            p.rect(x + dx, y + dy, w, h);
        }
    }

    function drawNatureLeaf(p, palette) {
        // 葉片與葉脈
        p.background(p.random(palette));
        const center = { x: 128, y: 128 };
        p.noFill();
        p.stroke(p.random(palette));
        p.strokeWeight(2);
        const leaves = p.floor(p.random(5, 9));
        for (let i = 0; i < leaves; i++) {
            const a = (p.TWO_PI / leaves) * i + p.random(-0.1, 0.1);
            const len = p.random(60, 100);
            // 葉片輪廓
            p.push();
            p.translate(center.x, center.y);
            p.rotate(a);
            p.beginShape();
            p.vertex(0, 0);
            p.bezierVertex(len * 0.3, -len * 0.2, len * 0.6, -len * 0.1, len, 0);
            p.bezierVertex(len * 0.6, len * 0.1, len * 0.3, len * 0.2, 0, 0);
            p.endShape();
            // 葉脈
            p.strokeWeight(1);
            for (let t = 0.2; t < 1; t += 0.2) {
                p.line(len * t, 0, len * t * 0.7, (t - 0.5) * len * 0.4);
            }
            p.pop();
        }
    }
};

new p5(sketch);

// ===== Demo Gallery（全部風格預覽）=====
document.addEventListener('DOMContentLoaded', function() {
    const demoSection = document.getElementById('demoSection');
    const demoGrid = document.getElementById('demoGrid');
    const showDemoBtn = document.getElementById('showDemoBtn');
    const closeDemoBtn = document.getElementById('closeDemoBtn');

    if (!demoSection || !demoGrid) return;

    const styleList = Array.from(styleSelector.options).map(o => ({
        value: o.value,
        labelEN: o.dataset.en || o.textContent,
        labelZH: o.dataset.zh || o.textContent
    }));

    function currentLang() {
        const mainTitle = document.getElementById('mainTitle');
        return mainTitle && mainTitle.textContent === mainTitle?.dataset?.zh ? 'zh' : 'en';
    }

    function isOpen() { return demoSection.style.display !== 'none'; }

    function renderAllPreviews() {
        demoGrid.innerHTML = '';
        const prev = {
            style: styleSelector.value,
            paletteIndex: currentPaletteIndex,
            customColor: customMainColor,
            include: includeInitialsCheckbox.checked
        };
        includeInitialsCheckbox.checked = false;

        const tasks = styleList.map(s => {
            const card = document.createElement('div');
            card.className = 'demo-card';
            card.setAttribute('data-style', s.value);

            const thumb = document.createElement('div');
            thumb.className = 'demo-thumb';
            const off = document.createElement('canvas');
            off.width = 128; off.height = 128;
            thumb.appendChild(off);

            const title = document.createElement('h3');
            title.textContent = currentLang() === 'zh' ? s.labelZH : s.labelEN;

            card.appendChild(thumb);
            card.appendChild(title);
            demoGrid.appendChild(card);
            return { s, off };
        });

        const p = window.avatarP5;
        let i = 0;
        function step() {
            if (i >= tasks.length) {
                styleSelector.value = prev.style;
                includeInitialsCheckbox.checked = prev.include;
                currentPaletteIndex = prev.paletteIndex;
                customMainColor = prev.customColor;
                p.redraw();
                return;
            }
            const { s, off } = tasks[i];
            styleSelector.value = s.value;
            p.redraw();
            requestAnimationFrame(() => {
                const ctx = off.getContext('2d');
                ctx.drawImage(p.canvas, 0, 0, 256, 256, 0, 0, 128, 128);
                i += 1;
                step();
            });
        }
        step();
    }

    if (showDemoBtn) {
        showDemoBtn.addEventListener('click', () => {
            demoSection.style.display = 'block';
            renderAllPreviews();
        });
    }
    if (closeDemoBtn) {
        closeDemoBtn.addEventListener('click', () => {
            demoSection.style.display = 'none';
            demoGrid.innerHTML = '';
        });
    }

    // 當名稱或配色變更且 Demo 開啟時，自動重繪預覽
    nameInput.addEventListener('input', () => { if (isOpen()) renderAllPreviews(); });
    changePaletteBtn.addEventListener('click', () => { if (isOpen()) setTimeout(renderAllPreviews, 0); });
    if (mainColorPicker) mainColorPicker.addEventListener('input', () => { if (isOpen()) renderAllPreviews(); });
});

// ===== 語言切換功能 =====
document.addEventListener('DOMContentLoaded', function() {
    const langSwitchBtn = document.getElementById('langSwitchBtn');
    let currentLang = 'en'; // 預設英文

    function setLang(lang) {
        currentLang = lang;
        const mainTitle = document.getElementById('mainTitle');
        if (mainTitle) mainTitle.textContent = mainTitle.dataset[lang];
        const descText = document.getElementById('descText');
        if (descText) descText.textContent = descText.dataset[lang];
        if (nameInput) nameInput.placeholder = nameInput.dataset[lang];
        const styleLabel = document.getElementById('styleLabel');
        if (styleLabel) styleLabel.textContent = styleLabel.dataset[lang];
        for (const opt of styleSelector.options) {
            if (opt.dataset[lang]) opt.textContent = opt.dataset[lang];
        }
        if (changePaletteBtn) changePaletteBtn.textContent = changePaletteBtn.dataset[lang];
        const initialsLabel = document.getElementById('initialsLabel');
        if (initialsLabel) initialsLabel.childNodes[1].textContent = initialsLabel.dataset[lang];
        if (downloadBtn) downloadBtn.textContent = downloadBtn.dataset[lang];
        // 新增元件的多語系
        const showDemoBtn = document.getElementById('showDemoBtn');
        if (showDemoBtn && showDemoBtn.dataset[lang]) showDemoBtn.textContent = showDemoBtn.dataset[lang];
        const demoTitle = document.getElementById('demoTitle');
        if (demoTitle && demoTitle.dataset[lang]) demoTitle.textContent = demoTitle.dataset[lang];
        const demoHint = document.getElementById('demoHint');
        if (demoHint && demoHint.dataset[lang]) demoHint.textContent = demoHint.dataset[lang];
        const closeDemoBtn = document.getElementById('closeDemoBtn');
        if (closeDemoBtn && closeDemoBtn.dataset[lang]) closeDemoBtn.textContent = closeDemoBtn.dataset[lang];
    }

    if (langSwitchBtn) {
        langSwitchBtn.addEventListener('click', function() {
            setLang(currentLang === 'en' ? 'zh' : 'en');
            // 若 Demo 開啟，重繪標題文字與縮圖標籤
            const demoSection = document.getElementById('demoSection');
            if (demoSection && demoSection.style.display !== 'none') {
                const event = new Event('click');
                // 觸發一次重繪
                setTimeout(() => {
                    const showDemoBtn = document.getElementById('showDemoBtn');
                    showDemoBtn?.dispatchEvent(event);
                }, 0);
            }
        });
    }
    setLang('en');
});
