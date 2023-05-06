var audio = new Audio();
var playerDisplay = document.querySelector('.player-current-track');
var pauseIcon = document.querySelector('.fa-circle-pause');
var playIcon = document.querySelector('.fa-circle-play');
var musicButtons = document.querySelectorAll('.musica');
var playButton = document.querySelector('.play-button');
var pausePlayButton = document.querySelector('.pause-play');
var volumeSlider = document.querySelector('.volume-slider');
var currentTrack = null;
var progress = document.querySelector('.progress');

audio.volume = volumeSlider.value;
const songs = [
    {
      title: 'Beamer Boy',
      duration: 203 // Duração da primeira música em segundos
    },
    {
      title: 'Star Shopping',
      duration: 142  // Duração da segunda música em segundos
    },
    {
      title: 'Big City Blues',
      duration: 156 // Duração da terceira música em segundos
    }
  ];
  let currentSongIndex = 0; // Índice da música atualmente em reprodução
let currentTime = 0; // Tempo decorrido da música atual
function increaseTime() {
    const percent = (currentTime / songs[currentSongIndex].duration) * 100;

    progress.style.width = percent + '%';
    currentTime = audio.currentTime
    
    // Verifica se o tempo decorrido excedeu a duração da música atual
    if (currentTime >= songs[currentSongIndex].duration) {
      // Passa para a próxima música quando a música atual terminar
      currentSongIndex += 1;
      currentTime = 0;
    }
    
    updateProgressBar();
  }
  
  function updateProgressBar() {
    const percent = (currentTime / songs[currentSongIndex].duration) * 100;
    progress.style.width = percent + '%';
  }

function changeVolume(volume) {
    audio.volume = volume;
}
musicButtons.forEach(function(musicButton) {
    musicButton.addEventListener('click', function() {
        var trackName = musicButton.textContent.trim();
        playMusic(trackName);
    });
});

pausePlayButton.addEventListener('click', function() {
    togglePlayPause();
    currentSongIndex = 0;
    interval = setInterval(increaseTime, 1000);
  updateProgressBar();
});
function changeProgress(value) {
    // Calcule o tempo da música com base no valor do controle de progresso
    var duration = audio.duration;
    var currentTime = (value / 100) * duration;

    // Defina a posição da reprodução da música
    audio.currentTime = currentTime;
}

function playMusic(trackName) {
    if (audio.paused || currentTrack !== trackName) {
      audio.src = getMusicSource(trackName);
      audio.currentTime = currentTime;
      audio.play();
      var currentTrackName = document.querySelector('.player-current-track');
      currentTrackName.textContent = trackName;
      var currentTrackImage = document.querySelector('.current-track-image');
      currentTrackImage.src = getTrackImage(trackName);
      playerDisplay.textContent = trackName;
      pauseIcon.style.display = 'inline-block';
      playIcon.style.display = 'none';
      currentTrack = trackName;
      updateButtonColors();
    } else {
      audio.pause();
      pauseIcon.style.display = 'none';
      playIcon.style.display = 'inline-block';
      updateButtonColors();
    }
  }
  
  function getTrackImage(trackName) {
    if (trackName === 'Vai Vendo - Anitta') {
      return 'vaivendo.jpg';
    } else if (trackName === 'Existe um lugar') {
      return 'existeumlugar.jpg';
    } else if (trackName === 'Noite Fria - IG') {
      return 'noitefria.jpg';
    } else if (trackName === 'Big City Blues') {
        return 'bigcityblues.jpg';
    } else if (trackName === 'Beamer Boy') {
        return 'beamerboy.webp';
    } else if (trackName === 'Star Shopping') {
        return 'starshopping.webp';
    } else {
      return 'default-music.png';
    }
  }
  

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        pauseIcon.style.display = 'inline-block';
        playIcon.style.display = 'none';
    } else {
        audio.pause();
        currentTime = audio.currentTime;
        pauseIcon.style.display = 'none';
        playIcon.style.display = 'inline-block';
    }
    updateButtonColors();
}

function updateButtonColors() {
    musicButtons.forEach(function(musicButton) {
        var trackName = musicButton.textContent.trim();
        var button = musicButton.querySelector('.play-button');
        if (trackName === currentTrack && !audio.paused) {
            button.src = 'greenbutton.png';
        } else {
            button.src = 'redbutton.png';
        }
    });
}


function getMusicSource(trackName) {
    // Mapeie o nome da música para o caminho do arquivo de áudio correspondente
    // Adicione novos casos conforme necessário
    switch (trackName) {
        case 'Vai Vendo - Anitta':
            return 'vai-vendo.mp3';
        case 'Existe um lugar':
            return 'existeumlugar.mp3';
        case 'Noite Fria - IG':
            return 'noitefria.mp3';
        case 'Big City Blues':
            return 'bigcityblues.mp3';
        case 'Star Shopping':
            return 'starshopping.mp3';
        case 'Beamer Boy':
            return 'beamerboy.mp3';
        default:
            return '0d0d0d.png';
    }
}

audio.addEventListener('play', function() {
    updateButtonColors();
});

audio.addEventListener('pause', function() {
    updateButtonColors();
});
