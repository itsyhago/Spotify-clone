const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');
const currentdata = new Date()
const greetingElement = document.getElementById('greeting')
let currentHour = currentdata.getHours()
let greetingMenssage = ''

if(currentHour < 6){
    greetingMenssage = 'Boa madrugada'
}else if(currentHour < 12){
    greetingMenssage = 'Bom dia'
}else if(currentHour < 19){
    greetingMenssage = 'Boa tarde'
}else{
     greetingMenssage = 'Boa noite'
}
   
greetingElement.innerText = `${greetingMenssage}!`

function requestApi(searchTerm) {
    const url = `http://localhost:3002/artists?name_like=${searchTerm}`
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))
}

function displayResults(result) {
    resultPlaylist.classList.add("hidden")
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultArtist.classList.add('hidden');
        resultPlaylist.classList.remove('hidden');
        return
    }
    
    requestApi(searchTerm);
})