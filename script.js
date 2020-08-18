const allResults = document.getElementById('all-song-results');
// song list
document.getElementById('search-button').addEventListener("click", function(){
    let input = document.getElementById('search-input').value;
    fetch(`https://api.lyrics.ovh/suggest/${input}`)
        .then(res => res.json())
        .then((data) =>{
            const singleResults = data.data.splice(0,10).map((songs) => {
                return `<div id="single-song-result" class="single-result row align-items-center my-3 p-3">
                        <div class="col-md-9">
                            <h3 class="lyrics-name">${songs.title}</h3>
                            <p class="author lead">Album by <span>${songs.artist.name}</span></p>
                        </div>
                        <div class="col-md-3 text-md-right text-center">
                            <button onClick ="callLyrics('${songs.artist.name}','${songs.title}')" class="btn btn-success">Get Lyrics</button>
                        </div>
                    </div>`;
                }).join("");

              allResults.insertAdjacentHTML("afterbegin", singleResults);
        });
    });

    // song lyrics

    const lyrics = document.getElementById('lyrics');
    const songName = document.getElementById('song-name');
    const artist = document.getElementById('artist-name');
    const callLyrics = (artistName, songTitle) => {
        fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
        .then((res) => res.json())
        .then((data) => {
            songName.innerHTML = songTitle;
            lyrics.innerHTML = data.lyrics;
            artist.innerHTML = "- " + artistName;
        })
    }

    