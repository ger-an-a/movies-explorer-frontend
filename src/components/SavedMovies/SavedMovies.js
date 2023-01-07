import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { savedMovies } from "../../utils/MoviesCardList";

function SavedMovies() {
    return (
        <section className="savedMovies content">
            <h1 className="visually-hidden">Фильмы</h1>
            <SearchForm />
            <MoviesCardList list={savedMovies} saved={true} />
        </section>
    )
}
export default SavedMovies;