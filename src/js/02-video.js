import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on('timeupdate', throttle(onPlayFixTime, 1000));

function onPlayFixTime(data, key = 'videoplayer-current-time') {
  localStorage.setItem(key, JSON.stringify(data));
}

function getSavedTime() {
  const strData = localStorage.getItem('videoplayer-current-time');
  if (!strData) return 0;
  const obj = JSON.parse(strData);
  return obj.seconds;
}

player.setCurrentTime(getSavedTime());
