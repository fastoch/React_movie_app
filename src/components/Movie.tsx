import type { MovieInterface } from "../interfaces/movie";

interface MovieComponentInterface {
    movieData: MovieInterface,
    movieRate: string
}

const Movie = ({ movieData, movieRate }: MovieComponentInterface) => {   
    return (
        <div>
            <img width={300} src={'https://image.tmdb.org/t/p/w500' + movieData.poster_path} alt="" />
            <h2>{movieData.title}</h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Like
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add to wishlist
            </button>
        </div>
    );
};

export default Movie;