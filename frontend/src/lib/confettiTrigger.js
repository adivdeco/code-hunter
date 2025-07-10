// // lib/utils/confettiTrigger.ts
import confetti from "canvas-confetti";

// export function triggerSideCannonsConfetti() {
//     const end = Date.now() + 2 * 1000; // 3 seconds
//     const colors = [
//         "#a786ff", "#fd8bbc", "#eca184", "#f8deb1",
//         "#00e0ff", "#7fff00", "#ffcc00", "#ff6f61",
//         "#c3f584", "#f47fff", "#ffae42", "#72f1b8"
//     ];



//     const frame = () => {
//         if (Date.now() > end) return;

//         confetti({
//             particleCount: 12,
//             angle: 60,
//             spread: 55,
//             startVelocity: 60,
//             origin: { x: 0, y: 0.5 },
//             colors,
//         });

//         confetti({
//             particleCount: 12,
//             angle: 120,
//             spread: 55,
//             startVelocity: 60,
//             origin: { x: 1, y: 0.5 },
//             colors,
//         });

//         requestAnimationFrame(frame);
//     };

//     frame();
// }

export function triggerSideCannonsConfetti() {
    const end = Date.now() + 4 * 1000; // 4 seconds
    const colors = [
        "#a786ff", "#fd8bbc", "#eca184", "#f8deb1",
        "#00e0ff", "#7fff00", "#ffcc00", "#ff6f61",
        "#c3f584", "#f47fff", "#ffae42", "#72f1b8"
    ];


    let lastFireTime = 0;
    const interval = 150; // milliseconds between bursts

    const frame = () => {
        const now = Date.now();
        if (now > end) return;

        if (now - lastFireTime >= interval) {
            lastFireTime = now;

            confetti({
                particleCount: 12,
                angle: 60,
                spread: 55,
                startVelocity: 60,
                origin: { x: 0, y: 0.5 },
                colors,
            });

            confetti({
                particleCount: 12,
                angle: 120,
                spread: 55,
                startVelocity: 60,
                origin: { x: 1, y: 0.5 },
                colors,
            });
        }

        requestAnimationFrame(frame);
    };

    frame();
}
