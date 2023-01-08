import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { savedMovies } from "../../utils/MoviesCardList";

function SavedMovies() {
    return (
        <main className="movies content">
            <h1 className="visually-hidden">Фильмы</h1>
            <SearchForm />
            <MoviesCardList list={savedMovies} saved={true} />
        </main>
    )
}
export default SavedMovies;