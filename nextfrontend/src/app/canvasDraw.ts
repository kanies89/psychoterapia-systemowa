// canvasDraw.ts
import { drawGreyLine, drawTrapezoid, dimColor } from './drawingUtils';

export const drawCanvas = (canvas: HTMLCanvasElement, imageHeight: number) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 700; // Base width for trapezoids
    const proportion = 0.1; // Proportion for trapezoid dimensions
    const bendHeight = window.innerHeight * 0.2; // Height for bending effect
    const colors = [
        "#1e364c",
        "#389497",
        "#eeb35b",
        "#e99b4c",
        "#e45d4d"
    ]; // Base colors
    const dimm = 0.2; // Dim factor for colors
    const colors_dimmer = colors.map((color) => dimColor(color, dimm)); // Dimmed colors for trapezoids

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw trapezoids with the specified dimensions and colors
    drawTrapezoid(ctx, canvas.width / 2, window.innerHeight, w, proportion * w, bendHeight, window.innerHeight, colors_dimmer[4], colors[4], "left", imageHeight);
    drawTrapezoid(ctx, canvas.width / 2, window.innerHeight, 0.6 * w, 0.6 * proportion * w, bendHeight, window.innerHeight, colors_dimmer[3], colors[3], "left", imageHeight);
    drawTrapezoid(ctx, canvas.width / 2, window.innerHeight, w, proportion * w, bendHeight, window.innerHeight, colors_dimmer[0], colors[0], "right", imageHeight);
    drawTrapezoid(ctx, canvas.width / 2, window.innerHeight, 0.6 * w, 0.6 * proportion * w, bendHeight, window.innerHeight, colors_dimmer[1], colors[1], "right", imageHeight);
    drawTrapezoid(ctx, canvas.width / 2, window.innerHeight, 0.2 * w, 0.2 * proportion * w, bendHeight, window.innerHeight, colors_dimmer[2], colors[2], "middle", imageHeight);

    // Draw a grey line for visual separation
    drawGreyLine(ctx, canvas.width / 2 - w * proportion, window.innerHeight - bendHeight, canvas.width / 2 + w * proportion, window.innerHeight - bendHeight);
};
