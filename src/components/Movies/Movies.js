import { useEffect, useState } from "react";

import SearchForm from "../SearchForm/SearchForm";
import moviesApi from "../../utils/MoviesApi";
import SearchResult from "../SearchResult/SearchResult";


function Movies(props) {

    const [isValid, setIsValid] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [displayedList, setDisplayedList] = useState([]); //отображенный результат поиска

    function handleSubmit(e) {
        e.preventDefault();
        if (searchQuery === '') {
            setIsValid(false);
        } else setIsValid(true);
        props.reset();
        setIsSearch(true);
        localStorage.setItem('searchQuery', JSON.stringify(searchQuery));
    }

    useEffect(() => {
        props.reset();
        setIsValid(true);
        setIsSearch(false);
        props.setShortFilms(JSON.parse(localStorage.getItem('shortFilms')) || false);
        if (JSON.parse(localStorage.getItem('searchQuery'))) {
            setIsSearch(true);
            setSearchQuery(JSON.parse(localStorage.getItem('searchQuery')));
        }
    }, [])

    useEffect(() => {
        props.onChangeCheckbox();
        localStorage.setItem('shortFilms', JSON.stringify(props.shortFilms));
    }, [props.shortFilms])

    useEffect(() => {
        setDisplayedList(props.slicedList);
    }, [props.slicedList])

    useEffect(() => {
        if (isValid && isSearch) {
            props.reset();
            moviesApi.getMovies()
                .then((moviesData) => {
                    props.filterMovies(moviesData, searchQuery);
                    props.handleResponse();
                    setIsSearch(false);
                })
                .catch(() => {
                    props.handleError();
                })
        } else if (isValid && !isSearch) {
            props.sliceMovies();
        }
    }, [isSearch, isValid]);

    return (
        <main className="movies content">
            <h1 className="visually-hidden">Фильмы</h1>
            <SearchForm setCheckbox={props.setShortFilms} checkbox={props.shortFilms} setIsSearch={setIsSearch}
                inputValue={searchQuery} setInputValue={setSearchQuery} onSubmit={handleSubmit} />
            <SearchResult isSavedMovies={false} setWidth={props.setWidth} setIndex={props.setIndex} setFirstIndex={props.setFirstIndex}
                setIndexStep={props.setIndexStep} isSearch={isSearch} isValid={isValid} message={props.message}
                list={displayedList} handleSave={props.handleSave} handleDelete={props.handleDelete} savedList={props.savedList} />
            <button onClick={props.onBtnClick} className={props.btnClass}>Еще</button>
        </main>
    )
}
export default Movies;