export function drawLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

export function drawParametric(ctx, fx, fy, tarr) {
  for (let i = 0; i < tarr.length - 1; i++) {
    const x1 = fx(tarr[i]);
    const y1 = fy(tarr[i]);
    const x2 = fx(tarr[i + 1]);
    const y2 = fy(tarr[i + 1]);
    drawLine(ctx, x1, y1, x2, y2);
  }
}

export function range(low, high, N) {
  const delta: number = high - low;
  const step: number = delta / N;
  const arr: number[] = [];

  for (let i = 0; i < N + 1; i++) {
    arr.push(low + step * i);
  }

  return arr;
}

export function drawPolar(ctx, fth, tr, tarr, offset) {
  var fx = function (t) {
    return tr(t) * Math.cos(fth(t)) + offset;
  };

  var fy = function (t) {
    return tr(t) * Math.sin(fth(t)) + offset;
  };
  console.log(tarr, "<<<<");
  drawPoints(ctx, fx, fy, tarr);
}

// That's how you define the value of a pixel
export function drawPixel(ctx, x, y, r = 5) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, true);
  ctx.fillStyle = "blue";
  ctx.fill();
}

export function drawPoints(ctx, fx, fy, tarr) {
  for (let i = 0; i < tarr.length - 1; i++) {
    const x = fx(tarr[i]);
    const y = fy(tarr[i]);
    drawPixel(ctx, x, y);
  }
}

export function primeRange(n) {
  let prime = 0,
    arr = [];
  for (let i = 0; prime < n; i++) {
    if (i % 2 !== 0 && i % 3 !== 0) {
      arr.push(prime);
      prime++;
    }
  }
  return arr;
}
