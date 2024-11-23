// drawingUtils.ts
export const drawGreyLine = (
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    lineWidth: number = 2
) => {
    ctx.strokeStyle = 'rgba(145,144,144,0.6)';
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
};

export const drawTrapezoid = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    topWidth: number,
    bottomWidth: number,
    h1: number,
    h2: number,
    color: string,
    color_change: string,
    part: string,
    imageHeight: number
) => {
    ctx.fillStyle = color;
    ctx.beginPath();

    // Draw the trapezoid based on its part
    if (part === "left") {
        // Draw the left trapezoid
        ctx.moveTo(x, y);
        ctx.lineTo(x - topWidth, y);
        ctx.lineTo(x - bottomWidth, y - h1);
        ctx.lineTo(x, y - h1);
    } else if (part === "middle") {
        // Draw the middle trapezoid with left and right parts
        ctx.moveTo(x, y);
        ctx.lineTo(x + topWidth, y);
        ctx.lineTo(x + bottomWidth, y - h1);
        ctx.lineTo(x - bottomWidth, y - h1);
        ctx.lineTo(x - topWidth, y);
        ctx.lineTo(x, y);
    } else { // Right part
        ctx.moveTo(x, y);
        ctx.lineTo(x + topWidth, y);
        ctx.lineTo(x + bottomWidth, y - h1);
        ctx.lineTo(x, y - h1);
    }

    ctx.closePath();
    ctx.fill();

    // Draw the color-change section
    ctx.fillStyle = color_change;
    ctx.beginPath();

    // Adjust the xOffsets for left and right
    const leftXOffset = -bottomWidth;
    const rightXOffset = bottomWidth;

    if (part === "middle") {
        // For the middle part, draw both sides
        ctx.moveTo(x, y - h1);
        ctx.lineTo(x + rightXOffset, y - h1);
        ctx.lineTo(x + rightXOffset, 0.1*y + imageHeight);
        ctx.lineTo(x + leftXOffset, 0.1*y + imageHeight);
        ctx.lineTo(x + leftXOffset, 0.1*y + imageHeight);
        ctx.lineTo(x + leftXOffset, y - h1);
    } else {
        // For the left and right parts
        const xOffset = part === "left" ? leftXOffset : rightXOffset;
        ctx.moveTo(x, y - h1);
        ctx.lineTo(x + xOffset, y - h1);
        ctx.lineTo(x + xOffset, 0.1*y + imageHeight);
        ctx.lineTo(x, 0.1*y + imageHeight);
    }

    ctx.closePath();
    ctx.fill();
};


export const dimColor = (hex: string, percent: number) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.floor(r * (1 - percent));
    g = Math.floor(g * (1 - percent));
    b = Math.floor(b * (1 - percent));

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};
