// console.log("Welcome to Spotify");

// Initialize the Variables
let surahIndex = 0;
let audioElement = new Audio('surahs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let mastersurahName = document.getElementById('mastersurahName');
let surahItems = Array.from(document.getElementsByClassName('surahItem'));

let surahs = [
    {surahName: "Al-Fatihah (The Opening)", filePath: "surahs/1.mp3", coverPath: "img.jpeg"},
    {surahName: "Quraish (Quraish)", filePath: "surahs/2.mp3", coverPath: "img.jpeg"},
    {surahName: "Al-Ma'un (Small Kindness)", filePath: "surahs/3.mp3", coverPath: "img.jpeg"},
    {surahName: "Al-Kauthor (A River in Paradise)", filePath: "surahs/4.mp3", coverPath: "img.jpeg"},
    {surahName: "Al-Kafiroon (The Disbelievers)", filePath: "surahs/5.mp3", coverPath: "img.jpeg"},
    {surahName: "An-Nasr (The Help)", filePath: "surahs/6.mp3", coverPath: "img.jpeg"},
    {surahName: "Al-Masad (The Palm Fibre)", filePath: "surahs/7.mp3", coverPath: "img.jpeg"},
    {surahName: "Al-Ikhlas (Sincerity)", filePath: "surahs/8.mp3", coverPath: "img.jpeg"},
    {surahName: "Al-Falaq (The Daybreak)", filePath: "surahs/9.mp3", coverPath: "img.jpeg"},
    {surahName: "An-Nas (Mankind)", filePath: "surahs/10.mp3", coverPath: "img.jpeg"},
]

surahItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = surahs[i].coverPath; 
    element.getElementsByClassName("surahName")[0].innerText = surahs[i].surahName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('surahItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('surahItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        surahIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `surahs/${surahIndex+1}.mp3`;
        mastersurahName.innerText = surahs[surahIndex].surahName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(surahIndex>=9){
        surahIndex = 0
    }
    else{
        surahIndex += 1;
    }
    audioElement.src = `surahs/${surahIndex+1}.mp3`;
    mastersurahName.innerText = surahs[surahIndex].surahName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(surahIndex<=0){
        surahIndex = 0
    }
    else{
        surahIndex -= 1;
    }
    audioElement.src = `surahs/${surahIndex+1}.mp3`;
    mastersurahName.innerText = surahs[surahIndex].surahName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})