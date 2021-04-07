const interval = 2.1;
const variance = 0.6;

const twiceVariance = variance * 2;
const unitDiagonal = 0.7071067811865476;
const devicePixelRatio = window.devicePixelRatio || 1;


// MDN toBlob polyfill
if (!HTMLCanvasElement.prototype.toBlob) {
 Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
  value: function (callback, type, quality) {

    var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
        len = binStr.length,
        arr = new Uint8Array(len);

    for (var i = 0; i < len; i++ ) {
     arr[i] = binStr.charCodeAt(i);
    }

    callback( new Blob( [arr], {type: type || 'image/png'} ) );
  }
 });
}

function forEach(collection, callback) {
  return Array.prototype.forEach.call(collection, callback);
}

function vary(origin) {
  return Math.random() * twiceVariance - variance + origin;
}

function createBrushStroke(color, width, height) {
  const canvas = document.createElement('canvas');
  Object.assign(canvas, {
    width: width * devicePixelRatio,
    height: height * devicePixelRatio,
  });

  const ctx = canvas.getContext('2d');

  ctx.scale(devicePixelRatio, devicePixelRatio);

  const startX = vary(1);
  const startY = vary(1);
  ctx.moveTo(startX, startY);

  let point = interval;
  let x, y;
  while (point < width - 1) {
    x = vary(point);
    y = vary(1);

    ctx.bezierCurveTo(x - 1, y, x + 1, y, x, y);
    point += interval;
  }

  x = vary(width - 1);
  y = vary(1);
  ctx.bezierCurveTo(x - unitDiagonal, y - unitDiagonal, x + unitDiagonal, y + unitDiagonal, x, y);

  point = interval;
  while (point < height - 1) {
    const y = vary(point);
    const x = vary(width - 1);

    ctx.bezierCurveTo(x, y - 1, x, y + 1, x, y);
    point += interval;
  }

  x = vary(width - 1);
  y = vary(height - 1);
  ctx.bezierCurveTo(x + unitDiagonal, y - unitDiagonal, x - unitDiagonal, y + unitDiagonal, x, y);

  point = width - 1 - interval;
  while (point > 1) {
    const x = vary(point);
    const y = vary(height - 1);

    ctx.bezierCurveTo(x + 1, y, x - 1, y, x, y);
    point -= interval;
  }

  x = vary(1);
  y = vary(1);
  ctx.bezierCurveTo(x + unitDiagonal, y + unitDiagonal, x - unitDiagonal, y - unitDiagonal, x, y);

  point = height - 1 - interval;
  while (point > 1) {
    const y = vary(point);
    const x = vary(1);

    ctx.bezierCurveTo(x, y + 1, x, y - 1, x, y);
    point -= interval;
  }

  ctx.bezierCurveTo(x - unitDiagonal, y + unitDiagonal, x + unitDiagonal, y - unitDiagonal, startX, startY);

  ctx.fillStyle = color;
  ctx.closePath();
  ctx.fill();

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      resolve(blob);
    });
  });
}

setTimeout(() => {
  forEach(document.querySelectorAll('[paintcolor]'), el => {
    const color = el.getAttribute('paintcolor') || 'rgb(255, 194, 14)';
    createBrushStroke(color, el.offsetWidth, el.offsetHeight).then(blob => {
      const imgSrc = URL.createObjectURL(blob);
      el.style.backgroundSize = '100%';
      el.style.backgroundImage = `url('${imgSrc}')`;
      el.style.backgroundColor = 'transparent';
    });
  });
}, 1000);

forEach(document.querySelectorAll('.popup'), el => {
  el.addEventListener('click', event => {
    event.preventDefault();
    window.open(el.href, 'popup', 'width=600, height=400, scrollbars=no');
  });
});

const footerEl = document.querySelector('footer');
const navEl = document.querySelector('.nav-fixed');

let pinned = false;

function handleScroll() {
  const y = window.scrollY;
  const footerRect = footerEl.getBoundingClientRect();
  const footerPivot = window.scrollY + footerRect.top - window.innerHeight;

  if (pinned) {
    if (y < footerPivot) {
      pinned = false;
      navEl.classList.remove('unpin');
    }
  } else {
    if (y && y >= footerPivot) {
      pinned = true;
      navEl.classList.add('unpin');
    }
  }
}
if (navEl) {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

