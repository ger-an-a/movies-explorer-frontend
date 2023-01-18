import { useEffect, useState } from "react";

import SearchForm from "../SearchForm/SearchForm";
import SearchResult from "../SearchResult/SearchResult";


function SavedMovies(props) {

    const [isValid, setIsValid] = useState(true);
    const [isSearch, setIsSearch] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [displayedList, setDisplayedList] = useState([]); //отображенный результат поиска

    function handleSubmit(e) {
        e.preventDefault();
        if (searchQuery === '') {
            setIsValid(false);
        } else setIsValid(true);
        props.reset();
        setIsSearch(true);
    }

    useEffect(() => {
        props.reset();
        props.setShortFilms(false);
        setSearchQuery('');
        setIsSearch(true);
        setIsValid(true);
    }, [])

    useEffect(() => {
        props.onChangeCheckbox();
    }, [props.shortFilms])

    useEffect(() => {
        setDisplayedList(props.slicedList);
    }, [props.slicedList])

    useEffect(() => {
        setIsSearch(true);
        setIsValid(true);
        props.setMovieDeleted(false);
        props.filterMovies(props.savedList, searchQuery);
    }, [props.movieDeleted])

    useEffect(() => {
        if (isValid && isSearch) {
            props.filterMovies(props.savedList, searchQuery);
            props.handleResponse();
            setIsSearch(false);
        } else if (isValid && !isSearch) {
            props.sliceMovies();
        }
    }, [isSearch, isValid]);


    return (
        <main className="movies content">
            <h1 className="visually-hidden">Сохранённые Фильмы</h1>
            <SearchForm setCheckbox={props.setShortFilms} checkbox={props.shortFilms} setIsSearch={setIsSearch}
                inputValue={searchQuery} setInputValue={setSearchQuery} onSubmit={handleSubmit} />
            <SearchResult isSavedMovies={true} setWidth={props.setWidth} setIndex={props.setIndex} setFirstIndex={props.setFirstIndex}
                setIndexStep={props.setIndexStep} isSearch={isSearch} isValid={isValid} message={props.message}
                list={displayedList} handleSave={props.handleSave} handleDelete={props.handleDelete} savedList={props.savedList} />
            <button onClick={props.onBtnClick} className={props.btnClass}>Еще</button>
        </main>
    )
}
export default SavedMovies;
