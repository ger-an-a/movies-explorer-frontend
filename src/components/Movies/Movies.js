import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { movies } from "../../utils/MoviesCardList";

function Movies() {
    return (
        <main className="movies content">
            <h1 className="visually-hidden">Фильмы</h1>
            <SearchForm />
            <MoviesCardList list={movies} saved={false} />
            <button className=" btn movies__btn">Еще</button>
        </main>
    )
}
export default Movies;