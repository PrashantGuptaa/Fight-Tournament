const MOVEMENT = 1;
const BOTTOM = "bottom",
  TOP = "top",
  LEFT = "left",
  RIGHT = "right";

const TIMEOUT = 10;
const VERTICAL_DIRECTION = [TOP, BOTTOM];
const HORIZONTAL_DIRECTION = [LEFT, RIGHT];

const CONTAINER_WIDTH = 300,
  CONTAINER_HEIGHT = 600;
const BLOCK_HEIGHT = 40;
const BLOCK_WIDTH = BLOCK_HEIGHT;

const maxTop = 0;
const maxBottom = CONTAINER_HEIGHT - BLOCK_HEIGHT;

const elem = document.getElementById("pt");
const maxleft = elem.offsetLeft;
const maxRight = CONTAINER_WIDTH - BLOCK_WIDTH;

const appendPx = (unit) => `${unit}px`;

const GROUP1 = "Bull";

const createGroup = (teamSize, groupName) => {
  const containerElem = document.getElementById("container");
  for (let i = 0; i < teamSize; i++) {
    const blockElem = document.createElement("div");
    blockElem.style.width = appendPx(BLOCK_WIDTH);
    blockElem.style.height = appendPx(BLOCK_HEIGHT);
    blockElem.style.transition = `${(TIMEOUT + 10) / 1000}s ease-in-out`;
    blockElem.style.top = `0px`;

    blockElem.style.borderRadius = `${appendPx(BLOCK_HEIGHT / 2)}`;
    // blockElem.style.postion = `absolute`;

    blockElem.setAttribute("class", `${groupName} block complete-center`);
    const num = i + 1,
      groupWithNumber = `${groupName}-${num}`;
    blockElem.setAttribute("id", groupWithNumber);
    blockElem.innerHTML = num;
    containerElem.appendChild(blockElem);
  }
};

(function intiateBoard() {
  const containerElem = document.getElementById("container");
  containerElem.style.height = appendPx(CONTAINER_HEIGHT);
  containerElem.style.width = appendPx(CONTAINER_WIDTH);
  createGroup(6, GROUP1);
})();

const handleStart = () => {
  randomMovement();
  setInterval(randomMovement, TIMEOUT);
};

const randomMovement = () => {
  const group1Elems = document.getElementsByClassName(GROUP1);
  for (const elem of group1Elems) {
    moveVertically(elem);
    moveHorizontally(elem);
  }
};

const moveHorizontally = (elem) => {
  const leftGap = breakUnit(elem.style.left);

  const canMoveLeft = leftGap - MOVEMENT >= maxleft;
  const canMoveRight = leftGap + MOVEMENT <= maxRight;
  const horizontalMovement = HORIZONTAL_DIRECTION[randomIntFromInterval()];
  genericMovementFn(
    horizontalMovement,
    LEFT,
    canMoveLeft,
    canMoveRight,
    leftGap,
    elem
  );
};

const moveVertically = (elem) => {
  const topGap = breakUnit(elem.style.top);
  const canMoveTop = topGap - MOVEMENT >= maxTop;
  const canMoveBottom = topGap + MOVEMENT <= maxBottom;

  const verticalMovement = VERTICAL_DIRECTION[randomIntFromInterval()];
  genericMovementFn(
    verticalMovement,
    TOP,
    canMoveTop,
    canMoveBottom,
    topGap,
    elem
  );
};

const genericMovementFn = (
  direction,
  conditionalDirection,
  dir1Bool,
  dir2Bool,
  gapValue,
  elem
) => {
  // const movementDir = direction
  let movementValue = "0px";
  if (dir1Bool && dir2Bool) {
    if (direction === conditionalDirection) {
      movementValue = movementUnit(gapValue, false);
    } else {
      movementValue = movementUnit(gapValue, true);
    }
  } else if (dir1Bool) {
    movementValue = movementUnit(gapValue, false);
  } else {
    movementValue = movementUnit(gapValue, true);
  }
  elem.style[conditionalDirection] = movementValue.toString();
};

const breakUnit = (unit = "0px") => {
  const strUnit = unit.toString();
  return parseInt(strUnit.split("px")[0]);
};

const movementUnit = (unit, addition) => {
  const unitLen = unit ? breakUnit(unit) : 0;
  return addition ? unitLen + MOVEMENT + "px" : unitLen - MOVEMENT + "px";
};

function randomIntFromInterval() {
  // min and max included
  const num = Math.floor(Math.random() * 10);
  return num < 5 ? 0 : 1;
}
