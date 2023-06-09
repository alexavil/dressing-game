export const messageBoxType = {
  OK: 0,
  YesNo: 1,
  TextPrompt: 2,
};

export const TextBoxButtonType = {
  OK: 1,
  YesNo: 2,
};

export const page = document.body;

export const maxHeight = screen.availHeight;
export const maxWidth = screen.availWidth;

export function playSound(soundPath) {
  let sound = new Audio(soundPath);
  sound.play();
  return sound;
}

export function stopSound(sound) {
  sound.pause();
}

export function playMusic(musicPath, looped) {
  let music = new Audio(musicPath);
  music.loop = looped;
  music.play();
  return music;
}

export function stopMusic(music) {
  music.pause();
}

export function playVideo(videoid) {
  let video = document.getElementById(videoid);
  video.play();
  return video;
}

export function pauseVideo(video) {
  video.pause();
}

export function playCutScene(videoid, file) {
  //Spawn a video
  createElement("video", videoid, "video", page);
  let video = document.getElementById(videoid);
  video.src = file;
  video.style.width = "100%";
  video.style.height = "100%";
  video.style.position = "fixed";
  video.style.top = "0";
  video.style.left = "0";
  video.style.zIndex = "18";
  video.style.objectFit = "fill";
  video.style.objectPosition = "center";
  video.style.backgroundColor = "black";
  playVideo(videoid);
  //Wait for the video to finish and then remove it
  video.onended = function () {
    skipCutScene(videoid);
  };
}

export function skipCutScene(videoid) {
  let video = document.getElementById(videoid);
  video.pause();
  video.currentTime = 0;
  video.remove();
}

export function checkConnection() {
  let networkstatus = navigator.onLine;
  console.log(networkstatus);
  if (networkstatus === false) {
    displayMessageBox(
      "It appears you're offline. Please check your internet connection.",
      messageBoxType.OK
    );
  }
}

export function displayMessageBox(message, type) {
  switch (type) {
    case messageBoxType.OK:
      alert(message);
      break;
    case messageBoxType.YesNo: {
      let result = confirm(message);
      if (result) {
        return true;
      } else {
        return false;
      }
    }
    case messageBoxType.TextPrompt: {
      let result = prompt(message);
      if (result) {
        return result;
      } else {
        return false;
      }
    }
  }
}

export function setPageBackground(image) {
  //Do you think we could spawn an image and resize it to the viewport?
  createElement("img", "background", "background", page);
  let background = document.getElementById("background");
  background.src = image;
  background.style.width = "100%";
  background.style.height = "100%";
  background.style.position = "absolute";
  background.style.top = "0";
  background.style.left = "0";
  background.style.zIndex = "-1";
}

export function setElementStyleProperty(element, property, value) {
  element.style[property] = value;
}

export function setElementProperty(element, property, value) {
  element[property] = value;
}

export function createElement(elementName, id, className, parent) {
  let element = document.createElement(elementName);
  element.id = id;
  element.className = className;
  parent.appendChild(element);
  return getElement(id);
}

export function getElement(id) {
  return document.getElementById(id);
}

export function removeElement(element) {
  element.parentNode.removeChild(element);
}

export function setElementPosition(element, x, y) {
  element.style.left = x + "px";
  element.style.top = y + "px";
}

export function setElementSize(element, width, height) {
  element.style.width = width + "px";
  element.style.height = height + "px";
}

export function setElementLayer(element, layer) {
  element.style.zIndex = layer;
}

export function hideElement(element) {
  element.style.display = "none";
}

export function showElement(element, display) {
  element.style.display = display;
}

export function setElementId(element, id) {
  element.id = id;
}

export function unloadAllStyleSheets() {
  let allStyles = Array.from(document.styleSheets);
  allStyles.forEach((style) => {
    style.disabled = true;
  });
}

export async function loadStyleSheet(file) {
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = file;
  document.head.appendChild(link);
}

export function loadScript(file) {
  let script = document.createElement("script");
  script.src = file;
  document.head.appendChild(script);
}

export function goToScreen(page) {
  window.location.href = page;
}

export function deleteAllCookies() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export function exit() {
  window.close();
}

export function audioFadeOut(sound, fadeDuration) {
  var fadePoint = sound.duration - fadeDuration;
  var fadeAudio = setInterval(function () {
    // Only fade if past the fade out point or not at zero already
    if (sound.currentTime >= fadePoint && sound.volume != 0.0) {
      sound.volume -= 0.1;
    }
    if (sound.currentTime >= fadePoint && sound.volume == 0.0) {
      sound.volume += 0.1;
    }
    // When volume at zero stop all the intervalling
    if (sound.volume === 0.0 || sound.volume === 1.0) {
      clearInterval(fadeAudio);
    }
  }, 200);
}

export function closeTextBox() {
  const cover = getElement("cover");
  const card = getElement("textcard");
  const cardtext = getElement("cardtext");
  const imagetext = getElement("imagetext");
  const OKButton = getElement("OK");
  const YesButton = getElement("Yes");
  const NOButton = getElement("No");
  const PlayAgain = getElement("PlayAgain");
  const cardimage = getElement("cardimage");
  if (cover) cover.remove();
  if (card) card.remove();
  if (cardtext) cardtext.remove();
  if (imagetext) imagetext.remove();
  if (OKButton) OKButton.remove();
  if (YesButton) YesButton.remove();
  if (NOButton) NOButton.remove();
  if (PlayAgain) PlayAgain.remove();
  if (cardimage) cardimage.remove();
}
