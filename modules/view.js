export function render(array, boxes, x, o) {
  const newArr = [...array[0], ...array[1], ...array[2]];

  newArr.forEach((el, i) => {
    if (boxes[i].childNodes.length > 0) return;
    boxes[i].insertAdjacentHTML("afterbegin", el == 1 ? o : el == 2 ? x : "");
    if (boxes[i].childNodes.length == 0) return;
    boxes[i].childNodes[0].style.opacity = 1;
  });
}

export function clear(boxes) {
  boxes.forEach((el) => (el.textContent = ""));
}
