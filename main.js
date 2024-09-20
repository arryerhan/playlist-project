// HTML ELEMENTLERINE ULASMA VE TANIMLAMA
const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')


const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton= document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')


// SIRA
let index

// DONGU
let loop = true

// SARKI LISTESI
const songsList = [
    {
        name: "Est-ce que tu m'aimes",
        link: "assets/Est-ce que tu m'aimes.mp3",
        artist: "Maitre Gims",
        image: "assets/Maitre Gims.jpg"
    },
    {
        name: "Sumatra",
        link: "assets/Sumatra.mp3",
        artist: "Nora Van Elken",
        image: "assets/Nora Van Elken.jpg"
    },
    {
        name: "Swing",
        link: "assets/swing.mp3",
        artist: "Sofi Tukker",
        image: "assets/Sofi Tukker.jpg"
    },
    {
        name: "Eppur Si Muove",
        link: "assets/Eppur Si Muove.mp3",
        artist: "Haggard",
        image: "assets/Haggard.jpeg"
    },
    {
        name: "Hasta Que Se Seque el Malecón",
        link: "assets/Hasta Que Se Seque el Malecón.mp3",
        artist: "Jacop Forever",
        image: "assets/Jacop Forever.jpeg"
    }
];
// SARKI ATAMALARI
const setSong = (arrayIndex) => {
    let {name, link, artist, image} = songsList[arrayIndex]
    audio.src = link
    songName.textContent = name
    songArtist.textContent = artist
    songImage.src = image

    // sureyi ayarlama
    audio.onloadedmetadata = () => {
    maxDuration.innerText = timeFormatter(audio.duration)

};
    playListContainer.classList.add("hide")
    playAudio();

}

// AUDIO DOSYASININ FORMAT ZAMANINI DUZENLEME
const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60)
    let second = Math.floor(timeInput % 60)
    minute = minute < 10? '0' + minute : minute
    second = second < 10? '0' + second : second
    return `${minute}:${second}`
} 

// SARKIYI CALMA
const playAudio = () => {
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
}

// SARKIYI DURDURMA
const pauseAudio = () => {
    audio.pause()   
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}

// ONCEKI SARKIYA GIT
const prevSong = () => {
    if (index > 0) {
        index--
    }else {
        index = songsList.length - 1
    }
    setSong(index);
    playAudio();
}

// SONRAKI SARKIYA GIT
const nextSong = () => {
    if (loop) {
        if (index === songsList.length - 1) {
            index = 0
        } else {
            index++}
    } else {
        let randIndex = Math.floor(Math.random() * songsList.length)
        index = randIndex
    }
    setSong(index);
    playAudio();
}

// PLAY BUTONUNA TIKLANDIGINDA
playButton.addEventListener('click', playAudio)

// PAUSE BUTONUNA TIKLANDIGINDA
pauseButton.addEventListener('click', pauseAudio)

// PREVIOUS BUTONUNA TIKLANDIGINDA
prevButton.addEventListener('click', prevSong)

// NEXT BUTONUNA TIKLANDIGINDA
nextButton.addEventListener('click', nextSong)

// SHUFFLE BUTONUNA TIKLANDIGINDA
shuffleButton.addEventListener('click', () => {
    if(shuffleButton.classList.contains('active')){
        shuffleButton.classList.remove('active')
        loop = true

} else {
    shuffleButton.classList.add('active')
    loop = false
}})


// REPEAT BUTONUNA TIKLANDIGINDA
repeatButton.addEventListener('click', () => {
    if(repeatButton.classList.contains('active')){
        repeatButton.classList.remove('active')
        loop = false

} else {
    repeatButton.classList.add('active')
    loop = true
}})

// PROGRESS BAR'A TIKLANDIGINDA
progressBar.addEventListener('click',(event)=>{
    //Start Noktasi 472
    let coordStart = progressBar.getBoundingClientRect().left
    console.log(`Start ${coordStart}`)

     //Finish Noktasi 807
     let coordFinish = event.clientX
     console.log(`Finish ${coordFinish}`)

    //Finish Noktasi 807
    let progress = (coordFinish - coordStart) / progressBar.offsetWidth
    console.log(`Progress ${progress}`)
    currentProgress.style.width = progress * 100 + "%"

    //Zamani Guncelleme
    audio.currentTime = progress * audio.duration

    //Oynatma
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
})

// PLAYLIST BUTONUNA TIKLANDIGINDA
playListButton.addEventListener('click', () => {
    playListContainer.classList.remove('hide')
})

// OYNATMA LISTESINDE KAPATA TIKLANILDIGINDA
closeButton.addEventListener('click', () => {
    playListContainer.classList.add('hide')
})

// EKRAN PROGRESS DURUMU
setInterval(()=>{
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    let progress = (audio.currentTime / audio.duration) * 100
    currentProgress.style.width = progress + "%"
},1000);

// ZAMAN GUNCELLENDIGINDE
audio.addEventListener('timeupdate', () => {
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})

// SARKI BITTIGINDE BIR SONRAKI SARKIYA GECME
audio.addEventListener('ended', nextSong)



// SARKI OYNATMA LISTESINI OLUSTURMA
const initilazePlaylist = () => {
   for (const i in songsList) {
    playListSongs.innerHTML += `<li class="playlistSong"
    onclick ="setSong(${i})">
    <div class="playlist-image-container">
    <img src="${songsList[i].image}"/>
    </div>
    <div class="playlist-song-details">
      <span id="playlist-song-name">
      ${songsList[i].name}
      </span>
      <span id="playlist-song-artist-album">
      ${songsList[i].artist}
      </span>
    `
}}

// EKRAN YUKLENILDIGINDE
window.onload = () => {
    index = 0
    setSong(index);
    playListContainer.classList.remove("hide")
    pauseAudio();
    initilazePlaylist();
}