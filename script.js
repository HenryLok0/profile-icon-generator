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

        // Call the appropriate drawing function based on style
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
        } else { // 'organic' is the default
            drawOrganic(p, palette);
        }

        // Add initials if checked
        if (includeInitialsCheckbox.checked && name !== 'default' && name.trim().length > 0) {
            drawInitials(p, name);
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
        if (p5Canvas) {
            const link = document.createElement('a');
            link.download = `${nameInput.value || 'avatar'}-${styleSelector.value}-icon.png`;
            link.href = p5Canvas.toDataURL('image/png');
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
};

new p5(sketch);
