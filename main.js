const paths = []
let avgPath = []

class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    background(200);
}

function lerp2(a, b, t) {
    return new Vec(
        a.x * (1 - t) + b.x * t,
        a.y * (1 - t) + b.y * t
    );
}

function lerpPath(path, t) {
    if (path.length === 1) return path[0];
    const nPoints = path.length - 1;
    const idx = Math.floor(nPoints * t);
    const segmentStartT = idx / nPoints;
    const segmentEndT = (idx + 1) / nPoints;
    const localT = (t - segmentStartT) / (segmentEndT - segmentStartT);
    return lerp2(path[idx], path[idx + 1], localT);
}

function draw() {
    clear(200);
    avgPath = [];

    for (let i = 0; i < 1; i += 0.001) {
        const avgPos = new Vec(0, 0);

        for (const path of paths) {
            // const idx = Math.floor(path.length * i);
            // avgPos.x += path[idx].x;
            // avgPos.y += path[idx].y;
            const lerped = lerpPath(path, i);
            avgPos.x += lerped.x;
            avgPos.y += lerped.y;
        }

        avgPos.x /= paths.length;
        avgPos.y /= paths.length;

        avgPath.push(avgPos);
    }

    stroke(0);

    for (const path of paths) {
        let last = path[0];
        for (let i = 0; i < path.length; i++) {
            const current = path[i];
            line(last.x, last.y, current.x, current.y);
            last = current;
        }
    }

    stroke(255, 0, 0);

    let last = avgPath[0];
    for (let i = 0; i < avgPath.length; i++) {
        const current = avgPath[i];
        line(last.x, last.y, current.x, current.y);
        last = current;
    }
}

function mousePressed() {
    paths.push([new Vec(mouseX, mouseY)]);
}

function mouseDragged() {
    paths[paths.length - 1].push(new Vec(mouseX, mouseY));
}
