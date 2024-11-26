/* 
🌟 APP: Make Netflix

Here we have the Netflix app but it's up to you to make it work by pulling all the movies using an API!

Create a fetchMovies() function that will make a dynamic API call to what you need 👇
========================================

- fetchMovies()

** fetchMovies takes in an URL, a div id or class from the HTML, and a path (poster or backdrop)



These are the 3 main functions and their URL'S you must create  👇
========================================

- getOriginals()
  * URL : 'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'

- getTrendingNow()
  * URL : 'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'

- getTopRated()
  * URL : 'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'


** These functions will provide the URL you need to fetch() movies of that genere **

These are all the DIV ID's you're gonna need access to 👇
========================================================
#1 CLASS 👉 'original__movies' = Div that holds Netflix Originals
#2 ID 👉 'trending' = Div that holds trending Movies
#3 ID 👉 'top_rated' = Div that holds top rated Movies
*/

// Call the main functions the page is loaded
window.onload = () => {
  getOriginals()
  getTrendingNow()
  getTopRated()
}

// ** Helper function that makes dynamic API calls **
function fetchMovies(url, dom_element, path_type) {
  // Use Fetch with the url passed down 
  fetch(url).then(response => {
    if (response.ok) {
      return response.json()
    }
    else {
      throw new Error('something went wrong')
    }
  }).then(data => {
    showMovies(data, dom_element, path_type)
    console.log(data)
  })

  // Within Fetch get the response and call showMovies() with the data , dom_element, and path type
}

//  ** Function that displays the movies to the DOM **
showMovies = (movies, dom_element, path_type) => {

  // Create a variable that grabs id or class
  var moviesEL = document.querySelector(dom_element)



  // Loop through object
  for (let movie of movies.results) {
    // Within loop create an img element
    let imageElement = document.createElement('img')
    // Set attribute
    imageElement.setAttribute('data-id', movie.id)
    // Set source
    imageElement.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`
    // Add event listener to handleMovieSelection() onClick
    imageElement.addEventListener('click', e => { handleMovieSelection(e) })


    // Append the imageElement to the dom_element selected
    moviesEL.appendChild(imageElement)

  }
















}
fetchMovies('https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213', '.original__movies', 'poster')


// ** Function that fetches Netflix Originals **
function getOriginals() {
  var url =
    'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'
  fetchMovies(url, '.original__movies', 'poster_path')

}
// ** Function that fetches Trending Movies **
function getTrendingNow() {
  var url =
    'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'
  fetchMovies(url, '#trending', 'backdrop_path')

}
// ** Function that fetches Top Rated Movies **
function getTopRated() {
  var url =
    'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'
  fetchMovies(url, '#top_rated', 'backdrop_path')

}

// ** BONUS **

// ** Fetches URL provided and returns response.json()
async function getMovieTrailer(id) {
  var URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`
  return fetch(URL).then(response => {
    if (response.ok) {
      return response.json()
    }
    else {
      throw new Error('something went wrong')
    }
  })

}

// ** Function that adds movie data to the DOM
const setTrailer = trailers => {
  // Set up iframe variable to hold id of the movieTrailer Element
  const iframe = document.getElementById('movieTrailer')
  // const iframe
  // Set up variable to select .movieNotFound element
  // const movieNotFound
  const MovieNotFound = document.querySelector('.movieNotFound')
  // If there is a trailer add the src for it
  if (trailers.length > 0) {
    // add d-none class to movieNotFound and remove it from iframe

    // add youtube link with trailers key to iframe.src
    MovieNotFound.classList.add('d-none')
    iframe.classList.remove('d-none')
    iframe.src = `https://www.youtube.com/embed/${trailers[0].key}`
  } else {
    // Else remove d-none class to movieNotfound and ADD it to iframe
    iframe.classList.add('d-none')
    MovieNotFound.classList.remove('d-none')
  }

}



// ** Function that handles the movie selection within the grid **
const handleMovieSelection = e => {
  const id = e.target.getAttribute('data-id')
  const iframe = document.getElementById('movieTrailer')

  getMovieTrailer(id).then(data => {
    const results = data.results
    const youtubeTrailers = results.filter(result => {
      if (result.site == 'Youtube' && result.type == 'Trailer') {
        return true
      }
      else {
        return false
      }
    })
    setTrailer(youtubeTrailers)
  })
  $('#trailerModal').modal('show')
}




