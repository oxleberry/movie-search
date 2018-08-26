
import React, { Component } from 'react';
import axios from 'axios';

class MovieList extends Component {
   render () {
      // gives us the object information for our Movie component
      // console.log(this.props);

      // Destructuring, how to store the variables
      const { movies } = this.props;
      // console.log(movies);

      // loops through the array of movies
      let movieList = movies.map(movie => {
         return (
            <div className='movie' key={movie.imdbID}>
               <ul>
                  <div className='info'>
                     <li>{ movie.Title }</li>
                     <li>Year: { movie.Year }</li>
                     <li>Id: { movie.imdbID }</li>
                  </div>
                  <img src={movie.Poster} alt='{movie.Title}'/>
               </ul>
            </div>
         )
      })
      return (
         <div className='movieList'>
            {movieList}
         </div>
      )
   }
}

class Search extends Component {
   constructor(){
      super();
      this.state = {
         movies: [
            { title: '',
              poster: '',
              year: '',
              imdbID: '' }
         ]
      };
      // this.onChange = this.onChange.bind(this);
      this.updateSearch = this.updateSearch.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
   }

   // MOUNTING
   componentDidMount(){
      this.updateSearch();
   }

   // will update search when ENTER key is hit
   handleKeyPress(event) {
      if (event.key === 'Enter') {
         this.updateSearch();
      }
   }

   updateSearch() {
      const host = 'http://www.omdbapi.com/?';
      const searchInput = 's=';
      // grabs the users input value
      let query = (this.refs.query.value);
      // console.log(query);
      const key = '&apikey=2cc90428';
      // http://www.omdbapi.com/?s=star&apikey=2cc90428
      let url = `${host}${searchInput}${query}${key}`;

      axios.get(url)
      .then((response) => {
         this.setState({
            // from where we want to grab the array of data
            movies: response.data.Search
         });
         // handle success
         console.log(response);
      })
      .catch(function (error) {
         // handle error
         console.log(error);
      });
   }

   render() {
      return (
         <div className='search'>
            <h1>Search for Movies</h1>
            <input
               className='form-control'
               ref='query'
               defaultValue='star trek'
               placeholder='Search'
               type='text'
               onKeyPress={this.handleKeyPress}
            />
            <MovieList movies={this.state.movies}/>
         </div>
      )
   }
}

export default Search;
