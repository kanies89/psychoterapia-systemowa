// cloud.ts

function getRandomPoints(x: number, y: number, maxDistance: number, count: number): [number, number][] {
    const points: [number, number][] = [];

    for (let i = 0; i < count; i++) {
        // Generate random angle and distance
        const angle = Math.random() * 2 * Math.PI; // Random angle in radians
        const distance = Math.random() * maxDistance; // Random distance up to maxDistance

        // Calculate new point coordinates
        const newX = x + Math.cos(angle) * distance;
        const newY = y + Math.sin(angle) * distance;

        points.push([newX, newY]);
    }

    return points;
}

const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fillStyle = "#FFFFFF"; // Cloud color
    ctx.fill();
    ctx.strokeStyle = "#FFFFFF"; // Border color
    ctx.lineWidth = 2;
    ctx.stroke();
};

const drawCloud = (
    ctx: CanvasRenderingContext2D,
    cloudWidth: number,
    cloudHeight: number,

) => {
    if (typeof window !== "undefined") {
        const canvas = document.getElementById("myCanvas") as HTMLCanvasElement | null;
        if (canvas) {
            const radius = 15; // Corner radius for rounded rectangles
            const centerX: number = canvas.width / 2;
            const centerY: number = canvas.height / 2 + 0.4 * window.innerHeight;
            const maxDistance = window.innerHeight / window.innerWidth * window.innerWidth * 0.6; // Maximum distance to distort
            const count = 36; // Number of points to generate

            const randomPoints = getRandomPoints(centerX, centerY, maxDistance, count);
            console.log(randomPoints);

            for (let i = 0; i < randomPoints.length; i++) {
                const [randomX, randomY] = randomPoints[i];

                // Calculate the distance from the center
                const distance = Math.sqrt(Math.pow(randomX - centerX, 2) + Math.pow(randomY - centerY, 2));

                // Scale cloud dimensions proportionally based on distance
                const scale = 1 - (distance / maxDistance);
                const scaledWidth = cloudWidth * scale / randomX;
                const scaledHeight = cloudHeight * scale / randomY;

                // Draw the cloud at the random position with scaled dimensions
                drawRoundedRect(
                    ctx,
                    randomX - scaledWidth / 2,
                    randomY - scaledHeight / 2,
                    scaledWidth,
                    scaledHeight,
                    radius * (randomX/randomY)
                );
            }
        }
    }
};


export const initializeCanvas = () => {
    // Check if the window object is defined
    if (typeof window !== "undefined") {
        const canvas = document.getElementById("myCanvas") as HTMLCanvasElement | null;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                canvas.width = window.innerWidth; // Set canvas width to window width
                canvas.height = window.innerHeight; // Set canvas height to window height

                // Define cloud position and dimensions
                const cloudX = canvas.width / 2 - 150;
                const cloudY = canvas.height / 2 - 100;
                const cloudWidth = 300;
                const cloudHeight = 150;

                // Draw cloud and text
                drawCloud(ctx, cloudX, cloudY);
            }
        }
    } else {
        console.warn("window is not defined; skipping canvas initialization.");
    }
};

