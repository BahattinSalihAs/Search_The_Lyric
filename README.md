# Lyrics Finder

Search Lyrics is a web application that allows users to search for song lyrics by entering a song title or artist. The application makes use of the **Lyrics.ovh API** to fetch song suggestions and display the lyrics of the selected song.

## Features

- Search for songs by entering song titles or artist names.
- Get a list of song suggestions based on the search query.
- Select a song from the suggestions and view its lyrics.
- The lyrics are fetched and displayed dynamically via API calls to **Lyrics.ovh**.

## How It Works

1. **User Input:**
    - The user enters a song name or artist into the input field at the top of the page.

2. **API Request (Song Suggestions):**
    - The inputted value is used to send an API request to **`lyrics.ovh/suggest/{song name or artist}`**. This fetches a list of song suggestions based on the entered search term.

3. **User Selection:**
    - Once the results are displayed, the user selects a song from the suggestions list.

4. **API Request (Song Lyrics):**
    - After the song is selected, an API request is sent to **`lyrics.ovh/v1/{artist}/{song}`**, where `{artist}` and `{song}` are replaced with the artist and song name selected by the user.

5. **Display Lyrics:**
    - The lyrics of the selected song are then displayed on the page.

6. **Copy Lyrics Button:**
    - A **Copy Lyrics** button is provided so that users can easily copy the displayed lyrics to their clipboard.

## Technologies Used

- **HTML**: Structure of the web page.
- **CSS**: Styling and layout of the page.
- **JavaScript**: For fetching data from the API and dynamically updating the page.
- **Lyrics.ovh API**: Used to fetch song suggestions and lyrics.

## Setup

### 1. Clone the Repository:

To get started with the project, first clone the repository to your local machine:

```bash
git clone https://github.com/BahattinSalihAs/search-lyrics.git
