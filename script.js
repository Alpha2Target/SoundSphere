document.addEventListener('DOMContentLoaded', function () {
    const playPauseBtn = document.getElementById('playpausebtn');
    const prevBtn = document.getElementById('previousbtn');
    const nextBtn = document.getElementById('nextbtn');
    const progressBar = document.getElementById('progress');
    const volumeBar = document.getElementById('volumerange');
    const currentTimeEl = document.querySelector('.currenttime');
    const durationTimeEl = document.querySelector('.songduration');
    const songImg = document.querySelector('.songimg');
    const songNameEl = document.querySelector('.songname');
    const hamburger = document.querySelector('.hamburger');
    const playlist = document.querySelector('.playlist');
    const playlistBars = document.querySelector('.playlistbars');
  
    let audio = new Audio('songs/GBHGB.mp3');
    let isPlaying = false;
    let currentIndex = 0;
    let songs = [
      { name: 'Govind Bolo', file: 'songs/GBHGB.mp3', image: 'images/1.jpeg' },
      { name: 'Shri Krishna Flute', file: 'songs/Krishna Flute.mp3', image: 'images/2.jpeg' },
      { name: 'Radhe Shyam', file: 'songs/Radhe Shyam.mp3', image: 'images/3.jpeg' },
      { name: 'Radhe Radhe Bol Mann', file: 'songs/RRbolMana.mp3', image: 'images/8.jpeg' },
      { name: 'Barsane Vali Radhe', file: 'songs/RRBWR.mp3', image: 'images/4.jpeg' },
      { name: 'Radha Vallabh Shri Harivansh', file: 'songs/RVSH.mp3', image: 'images/6.jpeg' },
      { name: 'Radha Raman Hare Hare', file: 'songs/RRHH2.mp3', image: 'images/5.jpeg' },
      { name: 'Shyama Aan Baso Vrindavan Me', file: 'songs/Shayma aan baso vrindavan me.mp3', image: 'images/7.jpeg' },
      { name: 'Shri Krishna Govind Hare Murari', file: 'songs/Shri Krishna Govind.mp3', image: 'images/9.jpeg' }
    ];
  
    hamburger.addEventListener('click', () => {
      playlist.classList.toggle('active');
    });
  
    function loadPlaylist() {
      songs.forEach((song, index) => {
        const playlistBar = document.createElement('div');
        playlistBar.classList.add('playlistbar');
        playlistBar.innerHTML = `
          <img src="${song.image}" class="playlistimg" alt="Song Thumbnail">
          <p class="playlistbarname">${song.name}</p>
        `;
        playlistBar.addEventListener('click', () => {
          currentIndex = index;
          loadSong(songs[currentIndex]);
          playSong();
          playlist.classList.remove('active');
        });
        playlistBars.appendChild(playlistBar);
      });
    }
  
    loadPlaylist();
  
    function playSong() {
      audio.play();
      isPlaying = true;
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
  
    function pauseSong() {
      audio.pause();
      isPlaying = false;
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  
    function loadSong(song) {
      audio.src = song.file;
      songImg.src = song.image;
      songNameEl.textContent = song.name;
    }
  
    playPauseBtn.addEventListener('click', () => {
      isPlaying ? pauseSong() : playSong();
    });
  
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % songs.length;
      loadSong(songs[currentIndex]);
      playSong();
    });
  
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + songs.length) % songs.length;
      loadSong(songs[currentIndex]);
      playSong();
    });
  
    audio.addEventListener('timeupdate', (e) => {
      const { currentTime, duration } = e.target;
      const progressPercent = (currentTime / duration) * 100;
      progressBar.value = progressPercent;
      updateTimes(currentTime, duration);
    });
  
    progressBar.addEventListener('input', (e) => {
      const { value } = e.target;
      audio.currentTime = (value * audio.duration) / 100;
    });
  
    volumeBar.addEventListener('input', (e) => {
      audio.volume = e.target.value / 100;
    });
  
    function updateTimes(current, duration) {
      currentTimeEl.textContent = formatTime(current);
      durationTimeEl.textContent = formatTime(duration);
    }
  
    function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  
    audio.addEventListener('loadedmetadata', () => {
      updateTimes(audio.currentTime, audio.duration);
    });
  
    audio.addEventListener('ended', () => {
      nextBtn.click();
    });
  });
  