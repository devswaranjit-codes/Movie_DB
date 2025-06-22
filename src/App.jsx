import {useState,useEffect} from 'react'
import Search from './components/Search'
import './App.css'
import Spinner from './components/Spinner'
import Card from './components/Card'
import {useDebounce} from 'react-use'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_OPTIONS ={
  method: 'GET',
  headers: {
    accept: 'application/json',
}
}

function App() {
const [searchTerm, setSearchTerm] = useState('')
const [errorMessage, setErrorMessage] = useState('')
const [movieList, setMovieList] = useState([])
const [isLoading, setIsLoading] = useState('')
const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
 const [trailerKey, setTrailerKey] = useState('')
useDebounce(() => {
  setDebouncedSearchTerm(searchTerm)
}, 600, [searchTerm])
// Debounce the search term to avoid too many API calls

const fetchmovies = async (query = '') => {
  setIsLoading(true)
  setErrorMessage('')
    try {
      const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}` 
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`
      const response = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()

      if(data.response === 'False'){
        setErrorMessage(data.Error || 'Failed to fetch movies')
        setMovieList([])
        return
      }
      console.log('Fetched movies:', data)
      setMovieList(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error)
      setErrorMessage('Failed to fetch movies. Please try again later.')
    }finally{
      setIsLoading(false)
    }
  }
 const handleCardClick = (movie) => {
  const youtubeSearchQuery = encodeURIComponent(`${movie.title} trailer`);
  const youtubeSearchURL = `https://www.youtube.com/results?search_query=${youtubeSearchQuery}`;
  window.open(youtubeSearchURL, '_blank');
};

useEffect(() => {
 fetchmovies(debouncedSearchTerm)
}, [debouncedSearchTerm])
  return (
    <main >
      <div className="wrapper">
        <header >
          <img src="./logo.png" alt="Logo" className="h-20; w-auto; display-block; mt-0 m-auto" />
          {/* <img src="./hero.png" alt="Hero Banner" /> */}
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className='mt-[20px]'>MOVIE LIST</h2>
         { isLoading ? (
            <Spinner/>
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) :(
            <ul>
              {movieList.map((movie) => (
               <Card key={movie.id} movie={movie} onClick={() => handleCardClick(movie)}/>
              ))}
            </ul>
          ) }
        </section>
        
        {trailerKey && (
          <div className="trailer-modal">
            <iframe
              width="90%"
              height="400"
              src={`https://www.youtube.com/${trailerKey}?autoplay=1&mute=1`}
              target="_blank"
              allowFullScreen
            ></iframe>
            <button className="close-btn" onClick={() => setTrailerKey(null)}>Close</button>
          </div>
        )}

    </div>
    </main>
  )
}

export default App
