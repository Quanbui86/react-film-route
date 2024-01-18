const headers = (type) => {
    return {
        method: type,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODhlZmU3YTIyZmM1NWJlM2IyOTg3ZjE1ZWNmNDFlNCIsInN1YiI6IjY1NGYyNjQ0MjkzODM1NDNmNDg2MDkyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FWHK4DfBohjiYyiqykkvprCiNY1BvLDR2mbePlzhzII'
        }
      };
}
export const get = (type, url, cb) => {
    const options = headers(type);
     return fetch(url, options)
        .then(response => response.json())
        .then(response => {
          return response
        })
        .catch(err => console.error(err));
}
/*const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODhlZmU3YTIyZmM1NWJlM2IyOTg3ZjE1ZWNmNDFlNCIsInN1YiI6IjY1NGYyNjQ0MjkzODM1NDNmNDg2MDkyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FWHK4DfBohjiYyiqykkvprCiNY1BvLDR2mbePlzhzII'
  }
};

fetch('https://api.themoviedb.org/3/search/movie?query=girl&include_adult=true&language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));*/