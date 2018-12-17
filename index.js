
const RADIUS = 5;
const TAU = Math.PI * 2;
const N_BALLS = 1000;

function random(a, b) {
    return a + Math.random() * (b - a);
}

class Vector {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    /** @param {Vector} v */
    add(v) {
        this.x += v.x;
        this.y += v.y;
    }
}

class Ball {

    constructor (x, y) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(random(-2, 2), random(-2, 2));
        this.color = `hsl(${random(0, 360)}, 100%, 60%)`;
        this.radius = RADIUS;
        this.radiusAngleOffset = random(0, TAU);
    }
}

class App {

    constructor () {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 800;
        this.canvas.height = 600;

        document.body.appendChild(this.canvas);

        /** @type {CanvasRenderingContext2D} */
        this.ctx = this.canvas.getContext("2d");

        /** @type {Ball[]} */
        this.balls = Array.from(Array(N_BALLS), () =>
            new Ball(
                random(RADIUS, this.canvas.width - 2 * RADIUS),
                random(RADIUS, this.canvas.height - 2 * RADIUS)
            )
        );

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.updateFn = this.update.bind(this);
        requestAnimationFrame(this.updateFn);
    }

    update(t) {
        const c = this.canvas;
        const ctx = this.ctx;

        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.fillRect(0, 0, c.width, c.height);

        for (const ball of this.balls) {
            ctx.fillStyle = ball.color;
            ball.radius = RADIUS + (RADIUS / 2) * Math.sin(t / 100 + ball.radiusAngleOffset);

            ball.pos.add(ball.vel);
            if (ball.pos.x >= c.width - ball.radius || ball.pos.x < ball.radius) ball.vel.x *= -1;
            if (ball.pos.y >= c.height - ball.radius || ball.pos.y < ball.radius) ball.vel.y *= -1;

            ctx.beginPath();
            ctx.arc(ball.pos.x, ball.pos.y, ball.radius, 0, TAU);
            ctx.fill();
        }

        requestAnimationFrame(this.updateFn);
    }
}

new App();
