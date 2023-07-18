const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

const radial = (t: number, feather = 5) => {
  const invT = lerp(1, 0, t)
  return `
  position: fixed;
  z-index: 9;
  -webkit-mask-image: radial-gradient( #0000 ${invT * 100}%, #ffff ${(invT * 100) + feather}%);
  mask-image: radial-gradient( #0000 ${invT * 100}%, #ffff ${(invT * 100) + feather}%);
  -webkit-mask-size: 100vmax 100vmax;
  mask-size: 100vmax 100vmax;
  mask-position: 50% 50%;
`
}

const diamond = (t: number, feather = 5) => {
  const invT = lerp(1, 0, t)
  return `
  position: fixed;
  z-index: 9;
  -webkit-mask-image: radial-gradient( #0000 ${invT * 100}%, #ffff ${(invT * 100) + feather}%);
  mask-image: radial-gradient( #0000 ${invT * 100}%, #ffff ${(invT * 100) + feather}%);
  -webkit-mask-size: 100vw 100vh;
  mask-size: 100vw 100vh;
  mask-position: 50% 50%;
`
}

const topToBottom = (t: number, feather = 5) => {
  const invT = lerp(1, 0, t)
  return `
  position: fixed;
  z-index: 9;
  -webkit-mask-image: linear-gradient( #0000 ${invT * 100}%, #ffff ${(invT * 100) + feather}%);
  mask-image: linear-gradient( #0000 ${invT * 100}%, #ffff ${(invT * 100) + feather}%);
  -webkit-mask-size: 100vmax 100vmax;
  mask-size: 100vmax 100vmax;
  mask-position: 50% 50%;
`
}

const bottomToTop = (t: number, feather = 5) => {
  return `
  position: fixed;
  z-index: 9;
  -webkit-mask-image: linear-gradient( #ffff ${t * 100}%, #0000 ${(t * 100) + feather}%);
  mask-image: linear-gradient( #ffff ${t * 100}%, #0000 ${(t * 100) + feather}%);
  -webkit-mask-size: 100vmax 100vmax;
  mask-size: 100vmax 100vmax;
  mask-position: 50% 50%;
`
}

const leftToRight = (t: number, feather = 5) => {
  return `
  position: fixed;
  z-index: 9;
  -webkit-mask-image: linear-gradient(to left,  #ffff ${t * 100}%, #0000 ${(t * 100) + feather}%);
  mask-image: linear-gradient(to left,  #ffff ${t * 100}%, #0000 ${(t * 100) + feather}%);
  -webkit-mask-size: 100vmax 100vmax;
  mask-size: 100vmax 100vmax;
  mask-position: 50% 50%;
`
}

const rightToLeft = (t: number, feather = 5) => {
  return `
  position: fixed;
  z-index: 9;
  -webkit-mask-image: linear-gradient(to right,  #ffff ${t * 100}%, #0000 ${(t * 100) + feather}%);
  mask-image: linear-gradient(to right,  #ffff ${t * 100}%, #0000 ${(t * 100) + feather}%);
  -webkit-mask-size: 100vmax 100vmax;
  mask-size: 100vmax 100vmax;
  mask-position: 50% 50%;
`
}

const angled = (t: number, angle: number, feather = 5) => {
  return `
  position: fixed;
  z-index: 9;
  -webkit-mask-image: linear-gradient(${angle}deg,  #ffff ${t * 100}%, #0000 ${(t * 100) + feather}%);
  mask-image: linear-gradient(${angle}deg,  #ffff ${t * 100}%, #0000 ${(t * 100) + feather}%);
  -webkit-mask-size: 100vmax 100vmax;
  mask-size: 100vmax 100vmax;
  mask-position: 50% 50%;
`
}

const wipe = (t: number, angle = 0) => {
  // 0 state
  // all white
  // 0.5 state
  // white black white
  // 1 state
  // black
  const whiteLeft = lerp(0, 0.5, t)
  const whiteRight = lerp(1, 0.5, t)

  return `
  position: fixed;
  z-index: 9;
  -webkit-mask-image: linear-gradient(${angle}deg, #ffff ${whiteLeft * 100}%, #0000, #ffff ${whiteRight * 100}%);
  mask-image: linear-gradient(${angle}deg, #ffff ${whiteLeft * 100}%, #0000, #ffff ${whiteRight * 100}%);
  -webkit-mask-size: 100vmax 100vmax;
  mask-size: 100vmax 100vmax;
  mask-position: 50% 50%;
`
}

export function mask(node, {
  delay = 0,
  duration = 400,
  type = 'radial',
  feather = 5
}) {
  return {
    delay,
    duration,
    css: t => {
      switch (type) {
        case ('radial'):
          return radial(t, feather)
        case ('topToBottom'):
          return topToBottom(t, feather)
        case ('bottomToTop'):
          return bottomToTop(t, feather)
        case ('leftToRight'):
          return leftToRight(t, feather)
        case ('rightToLeft'):
          return rightToLeft(t, feather)
        case ('topRightToBottomLeft'):
          return angled(t, 45, feather)
        case ('topLeftToBottomRight'):
          return angled(t, -45, feather)
        case ('bottomLeftToTopRight'):
          return angled(t, -135, feather)
        case ('bottomRightToTopLeft'):
          return angled(t, 135, feather)
        // Broken
        case ('wipeVertical'):
          return wipe(t)
        case ('wipeHorizontal'):
          return wipe(t, 90)
        case ('diamond'):
          return diamond(t, feather)
      }
    }
  };
}


export function typewriter(node, { delay = 0, speed = 50 }) {
  const textNodes = getAllTextNodes(node);
  if (!textNodes.length) {
    throw new Error(`This transition only works on elements with text nodes`);
  }

  let totalLength = 0;
  const ranges = textNodes.map(textNode => {
    const range = [totalLength, totalLength + textNode.textContent.length];
    totalLength += textNode.textContent.length;
    const text = textNode.textContent;
    textNode.textContent = '';
    return { textNode, range, text };
  });

  let currentRangeIndex = 0;
  function getCurrentRange(i) {
    while (ranges[currentRangeIndex].range[1] < i && currentRangeIndex < ranges.length) {
      const { textNode, text } = ranges[currentRangeIndex];
      textNode.textContent = text;		// finish typing up the last node
      currentRangeIndex++;
    }
    return ranges[currentRangeIndex];
  }
  const duration = totalLength * speed;

  return {
    delay,
    duration,
    tick: t => {
      const progress = ~~(totalLength * t);
      const { textNode, range, text } = getCurrentRange(progress);
      const [start, end] = range;
      const textLength = ((progress - start) / (end - start)) * text.length;
      textNode.textContent = text.slice(0, textLength);
    },
  };
}

function getAllTextNodes(node) {
  if (node.nodeType === 3) {
    return [node];
  } else if (node.hasChildNodes()) {
    let list = [];
    for (let child of node.childNodes) {
      getAllTextNodes(child).forEach(textNode => list.push(textNode));
    }
    return list;
  }
  return [];
}