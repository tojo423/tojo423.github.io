class Actor {
  constructor(teamId, name, type, posX, posY, rot) {
    this.teamId = teamId;
    this.name = name;
    this.type = type;
    this.posX = posX;
    this.posY = posY;
    this.rot = rot;
  }
  static parse(set) {
    const comps = set.split(",");
    const teamId = parseInt(comps[0]);
    const name = comps[1];
    const type = comps[2];
    const posX = parseFloat(comps[3]) / 1000;
    const posY = parseFloat(comps[4]) / 1000;
    const rot = parseFloat(comps[5]);
    return new Actor(teamId, name, type, posX, posY, rot);
  }
}

class ActorCollection {
  constructor(actors) {
    this.actors = actors || [];
  }
}

async function* makeTextFileLineIterator(fileURL) {
  const utf8Decoder = new TextDecoder("utf-8");
  const response = await fetch(fileURL);
  const reader = response.body.getReader();
  let { value: chunk, done: readerDone } = await reader.read();
  chunk = chunk ? utf8Decoder.decode(chunk) : "";

  const re = /\n|\r|\r\n/gm;
  let startIndex = 0;
  let result;

  for (;;) {
    let result = re.exec(chunk);
    if (!result) {
      if (readerDone) {
        break;
      }
      let remainder = chunk.substr(startIndex);
      ({ value: chunk, done: readerDone } = await reader.read());
      chunk = remainder + (chunk ? utf8Decoder.decode(chunk) : "");
      startIndex = re.lastIndex = 0;
      continue;
    }
    yield chunk.substring(startIndex, result.index);
    startIndex = re.lastIndex;
  }
  if (startIndex < chunk.length) {
    // last line didn't end in a newline char
    yield chunk.substr(startIndex);
  }
}

function drawTriangle(ctx, x, y, width, strokeColor, fillColor, rotation) {
  const height = width * Math.cos(Math.PI / 6);
  const angleRad = (Math.PI / 180) * rotation;

  ctx.translate(x, y);
  ctx.rotate(angleRad);
  ctx.translate(-x, -y);

  const hWidth = width / 2;
  const hHeight = height / 2;

  ctx.beginPath();
  ctx.moveTo(x - hWidth, y + hHeight);
  ctx.lineTo(x + hWidth, y + hHeight);
  ctx.lineTo(x, y - height);
  ctx.closePath();

  ctx.lineWidth = 1;
  ctx.strokeStyle = strokeColor;
  ctx.stroke();

  ctx.fillStyle = fillColor;
  ctx.fill();

  ctx.resetTransform();
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

class Radar {
  constructor() {
    const canvas = document.getElementById("radar");
    this.canvas = canvas;
    this.image = document.getElementById("radar-img");
    this.ctx = canvas.getContext("2d");

    this.leaderColor = "#ffb703";
    this.allyColor = "#99d98c";
    this.botColor = "#4895ef";
    this.teamColors = [];

    this.updateInterval = 1000;
    this.isStarted = false;
  }
  drawMap() {
    const canvas = this.canvas;
    const ctx = this.ctx;
    const image = this.image;
    ctx.drawImage(
      image,
      0,
      0,
      canvas.width,
      canvas.width,
      0,
      0,
      image.width,
      image.height
    );
  }
  async update() {
    const canvas = this.canvas;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.drawMap();

    const url = "http://dreamlo.com/lb/60aa0b288f40bb64ec965c93/pipe";
    const actorColl = new ActorCollection();
    for await (let line of makeTextFileLineIterator(url)) {
      const actor = Actor.parse(line);
      actorColl.actors.push(actor);
    }

    console.log(this.teamColors);

    if (actorColl) {
      const actors = actorColl.actors;
      for (let i = 0; i < actors.length; i++) {
        const actor = actors[i];
        const mapPosX = canvas.width * actor.posX;
        const mapPosY = canvas.height * actor.posY;

        let fillColor = null;
        switch (actor.type) {
          case "l":
            fillColor = this.leaderColor;
            break;
          case "e":
            const teamId = actor.teamId;
            fillColor = this.teamColors[teamId] || randomColor();
            this.teamColors[teamId] = fillColor;
            break;
          case "a":
            fillColor = this.allyColor;
            break;
          case "b":
            fillColor = this.botColor;
            break;
        }

        drawTriangle(
          ctx,
          mapPosX,
          mapPosY,
          10,
          "#000000",
          fillColor,
          actor.rot
        );
      }
    }
  }
  start() {
    if (this.isStarted) return;
    this.isStarted = true;
    setInterval(() => {
      this.update().then();
    }, this.updateInterval);
  }
}

const elem = document.getElementById("radar");
const panzoom = Panzoom(elem, {
  maxScale: 20,
});
panzoom.pan(10, 10);
panzoom.zoom(2, { animate: true, contain: "outside" });
elem.parentElement.addEventListener("wheel", panzoom.zoomWithWheel);

const radar = new Radar();

window.onload = function () {
  radar.drawMap();
};

radar.start();
