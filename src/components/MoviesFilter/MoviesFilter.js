import { useState } from "react";

import { DURATION_SHORT_FILM, SMALL_WIDTH_LIMIT, BIG_STEP, MESSAGE_NOT_FOUND, MESSAGE_ERROR } from '../../utils/constants'

export default function MoviesFilter({ component: Component, ...props }) {

    const [message, setMessage] = useState('');
    const [btnClass, setBtnClass] = useState('visually-hidden');
    const [shortFilms, setShortFilms] = useState(false);
    const [filtredList, setFiltredList] = useState([]); //результат поиска
    const [shortFilmsList, setShortFilmsList] = useState([]); //короткометражки
    const [firstIndex, setFirstIndex] = useState(0); //максимальное число изначально отображенных карточек
    const [index, setIndex] = useState(0); //последнее отображенное количество карточек
    const [indexStep, setIndexStep] = useState(BIG_STEP); //шаг изменения количества карточек    
    const [width, setWidth] = useState(window.innerWidth);
    const [slicedList, setSlicedList] = useState([]); //отображенный результат поиска

    function onlyShortFilms(list) {
        const newList = list.filter((item) => {
            return item.duration <= DURATION_SHORT_FILM;
        });
        setShortFilmsList(newList);
    }

    function searchMovies(list, string) {
        const newList = string ? list.filter((item) => {
            return item.nameRU.toLowerCase().includes(string.toLowerCase()) || item.nameEN.toLowerCase().includes(string.toLowerCase())
        }) : list;
        setFiltredList(newList);
        return newList;
    }

    function filterMovies(list, string) {
        onlyShortFilms(searchMovies(list, string));
    }

    function sliceMovies(end) {
        const list = shortFilms ? shortFilmsList : filtredList
        let newList;
        if (list.length <= firstIndex) {
            setBtnClass('visually-hidden');
            newList = list.slice(0);
        } else {
            newList = list.slice(0, end ? end : firstIndex);
            setBtnClass('btn movies__btn');
        }
        if (list.length <= end) {
            setBtnClass('visually-hidden');
        }
        setSlicedList(newList);
    }

    function onBtnClick() {
        let newindex = index + indexStep;
        if (width > SMALL_WIDTH_LIMIT) {
            if (index % indexStep >= 1) newindex = newindex + indexStep - index % indexStep;
        }
        setIndex(newindex);
        sliceMovies(newindex);
    }

    function reset() {
        setBtnClass('visually-hidden');
        setFiltredList([]);
        setShortFilmsList([]);
        setSlicedList([]);
        setMessage('');
        setIndex(firstIndex);
    }

    function onChangeCheckbox() {
        sliceMovies();
        setIndex(firstIndex);
    }

    function handleResponse() {
        setIndex(firstIndex);
        setMessage(MESSAGE_NOT_FOUND);
    }

    function handleError() {
        setMessage(MESSAGE_ERROR);
    }

    return (
        <Component {...props} setShortFilms={setShortFilms} shortFilms={shortFilms}
            setWidth={setWidth} setIndex={setIndex} setFirstIndex={setFirstIndex}
            setIndexStep={setIndexStep} message={message} movieDeleted={props.movieDeleted} setMovieDeleted={props.setMovieDeleted}
            btnClass={btnClass} onBtnClick={onBtnClick} reset={reset} onChangeCheckbox={onChangeCheckbox}
            filterMovies={filterMovies} handleResponse={handleResponse} handleError={handleError} savedList={props.savedList}
            sliceMovies={sliceMovies} filtredList={filtredList} slicedList={slicedList} setBtnClass={setBtnClass}
        />
    )
} 