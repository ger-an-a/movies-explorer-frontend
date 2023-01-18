import { useEffect } from "react";

import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SearchResult(props) {

    function handleWindowSizeChange() {
        props.setWidth(window.innerWidth);
        props.setFirstIndex(window.innerWidth <= 480 ? 5 : (window.innerWidth <= 1279 ? 8 : 12));
        props.setIndexStep(window.innerWidth <= 1279 ? 2 : 3);
    };

    useEffect(() => {
        handleWindowSizeChange();
        props.setIndex(window.innerWidth <= 480 ? 5 : (window.innerWidth <= 1279 ? 8 : 12));
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    return (
        <div className='search-result'>
            {!props.isSearch ?
                props.list.length ?
                    <MoviesCardList savedList={props.savedList} handleDelete={props.handleDelete} handleSave={props.handleSave} list={props.list} isSavedMovies={props.isSavedMovies} /> :
                    <p className='search-result__message'>{props.message}</p>
                : (
                    props.isValid ? <Preloader className='preloader' /> :
                        <p className='search-result__message'>Нужно ввести ключевое слово</p>
                )}
        </div>
    )
}

export default SearchResult;