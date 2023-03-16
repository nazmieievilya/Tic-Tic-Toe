const board = document.querySelector(".board");
const boxes = document.querySelectorAll(".box");
const resultBox = document.querySelector(".result");
const playerTitle = document.querySelector("h1");
const background = document.querySelector("body");
const replayBtn = document.querySelector("button");

const o = `<svg id='o' xmlns="http://www.w3.org/2000/svg" width="268" height="257" viewBox="0 0 268 257" fill="none">
<path d="M262 128.5C262 195.92 204.932 251 134 251C63.0681 251 6 195.92 6 128.5C6 61.0796 63.0681 6 134 6C204.932 6 262 61.0796 262 128.5Z" stroke="white" stroke-width="15"/>
</svg>`;
const x = `<svg id='x' xmlns="http://www.w3.org/2000/svg" width="238" height="222" viewBox="0 0 238 222" fill="none">
<line x1="7.5" y1="-7.5" x2="304.373" y2="-7.5" transform="matrix(-0.737479 0.67537 -0.685799 -0.727791 230 3)" stroke="white" stroke-width="15" stroke-linecap="round"/>
<line x1="7.5" y1="-7.5" x2="304.373" y2="-7.5" transform="matrix(0.737479 0.67537 -0.685799 0.727791 1.52588e-05 8.37018)" stroke="white" stroke-width="15" stroke-linecap="round"/>
</svg>`;

export { board, boxes, resultBox, playerTitle, background, replayBtn, o, x };
