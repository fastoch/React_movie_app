import Movie from './components/Movie'
import NavigationBar from './components/NavigationBar';
import { movies } from './data/movie';
import type { MovieInterface } from './interfaces/movie';

const App = () => {
  console.log(movies)
  return (
    <>
      <NavigationBar />
      <div className='flex items-center justify-center gap-3.5 mx-auto flex-wrap'>
        {
          movies.length > 0 && movies.map((movie: MovieInterface, index: number) => (
            <div key={index}>
              <Movie movieData={movie} movieRate='4'/>     
            </div>
            
          ))
        }
      </div>
    </>
   
  );
};

export default App;