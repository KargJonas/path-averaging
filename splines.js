class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const path = [
    new Vec(200, 100),
    new Vec(400, 200),
    new Vec(450, 400),
    new Vec(250, 500),
    new Vec(100, 300),
];

function lerp2(a, b, t) {
    return new Vec(
        a.x * (1 - t) + b.x * t,
        a.y * (1 - t) + b.y * t
    );
}

// This was hard work..
function lerpPath(path, t) {
    if (path.length === 1) return path[0];
    const nPoints = path.length - 1;
    const idx = Math.floor(nPoints * t);
    const segmentStartT = idx / nPoints;
    const segmentEndT = (idx + 1) / nPoints;
    const localT = (t - segmentStartT) / (segmentEndT - segmentStartT);
    return lerp2(path[idx], path[idx + 1], localT);
}

function drawSpline(path) {
    fill(0, 0, 255);
    noStroke();

    let last = path[0];
    for (let t = 0; t < 1; t += 0.01) {
        const current = lerpPath(path, t);
        // line(last.x, last.y, current.x, current.y);
        circle(current.x, current.y, 6);
        // last = current;
    }
}

function setup() {
    createCanvas(innerWidth, innerHeight);
}

function draw() {
    clear();
    stroke(0);

    let last = path[0];
    for (const point of path) {
        line(last.x, last.y, point.x, point.y);
        last = point;
    }

    fill(255);
    for (const point of path) circle(point.x, point.y, 10);

    stroke(255, 0, 0);
    drawSpline(path, 100);
}


function mouseClicked() {
    path.push(new Vec(mouseX, mouseY));
}

function rgbHash(x) {
    return [
        (sin(x * 1.9898) + 1) * 255,
        (sin(x * 7.233) + 1) * 255,
        (sin(x * 4.543) + 1) * 255
    ]
}
