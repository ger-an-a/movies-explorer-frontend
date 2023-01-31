import { useEffect } from 'react';

import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {
    BIG_WIDTH_LIMIT, SMALL_WIDTH_LIMIT, MAX_CARDS_BIG_SCREEN, MAX_CARDS_MEDIUM_SCREEN,
    MAX_CARDS_SMALL_SCREEN, BIG_STEP, SMALL_STEP
} from '../../utils/constants'

function SearchResult(props) {

    function handleWindowSizeChange() {
        props.setWidth(window.innerWidth);
        props.setFirstIndex(window.innerWidth <= SMALL_WIDTH_LIMIT ? MAX_CARDS_SMALL_SCREEN : (window.innerWidth <= BIG_WIDTH_LIMIT ? MAX_CARDS_MEDIUM_SCREEN : MAX_CARDS_BIG_SCREEN));
        props.setIndexStep(window.innerWidth <= BIG_WIDTH_LIMIT ? SMALL_STEP : BIG_STEP);
    };

    useEffect(() => {
        handleWindowSizeChange();
        props.setIndex(window.innerWidth <= SMALL_WIDTH_LIMIT ? MAX_CARDS_SMALL_SCREEN : (window.innerWidth <= BIG_WIDTH_LIMIT ? MAX_CARDS_MEDIUM_SCREEN : MAX_CARDS_BIG_SCREEN));
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
                    props.isValid ? <Preloader /> :
                        <p className='search-result__message'>Нужно ввести ключевое слово</p>
                )}
        </div>
    )
}

export default SearchResult;