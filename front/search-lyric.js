var timeout;

function searchLyrics(){
    var searchTerm = document.getElementById("search-input").value.trim();

    if (!searchTerm){
        document.getElementById("search-results").innerHTML = "";
        document.getElementById("lyrics").innerHTML = "";
        return;
    }

    document.getElementById("search-results").innerHTML = "Loading...";

    var url = `https://api.lyrics.ovh/suggest/${searchTerm}`;

    timeout = setTimeout(function(){
        document.getElementById("search-results").innerHTML = searchTerm + " is not available";
    }, 500);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            clearTimeout(timeout);
            if (data.data && data.data.length > 0){
                var results = document.getElementById("search-results");
                results.innerHTML = "";

                data.data.forEach(function (result) {
                    var listItem = document.createElement("li");
                    listItem.textContent = result.title + " - " + result.artist.name;
                    listItem.onclick = function () {
                        getLyrics(result.artist.name, result.title);
                    }
                    results.appendChild(listItem);
                });
            }else {
                document.getElementById("lyrics").innerHTML = "No lyrics found";
            }
        })
        .catch(error => {
            clearTimeout(timeout);
            console.log("Error fetching lyrics: " + error);
            document.getElementById("search-results").innerHTML = "Error fetching lyrics";
        });
}

function getLyrics(artist, song){
    var url = `https://api.lyrics.ovh/v1/${artist}/${song}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var lyricsDiv = document.getElementById("lyrics");
            lyricsDiv.classList.add("visible");
            if (data.lyrics){
                document.getElementById("lyrics").innerHTML = `<pre>${data.lyrics}</pre>`;
                document.getElementById("copy-button").style.display = "block";
                document.getElementById("lyrics-text").value = data.lyrics;
            }else {
                document.getElementById("lyrics").innerHTML = "No lyrics found";
                document.getElementById("copy-button").style.display = "none";
            }
        })
        .catch(error => {
            console.error('Error fetching lyrics:', error);
            document.getElementById('lyrics').innerHTML = 'Error fetching lyrics.';
            document.getElementById("copy-button").style.display = "none";
        })
}
async function copyLyrics() {
    var lyricsText = document.getElementById('lyrics-text');

    try {
        await navigator.clipboard.writeText(lyricsText.value);
    } catch (error) {
        console.error(error);
        alert("Failed to copy lyrics to clipboard");
    }
}

document.getElementById("search-input").addEventListener("input", function(){
    var searchTerm = this.value.trim();
    if (searchTerm === ""){
        document.getElementById("lyrics").classList.remove("visible");
        document.getElementById("lyrics").innerHTML = "";
        document.getElementById("search-results").innerHTML = "";
        document.getElementById("copy-button").style.display = "none";
    }else {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            searchLyrics();
        }, 500);
    }
    console.log(searchTerm.length);
})