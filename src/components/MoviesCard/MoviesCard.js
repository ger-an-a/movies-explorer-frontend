import { useState } from "react";

function MoviesCard(props) {
    const movie = props.isSavedMovies ? props.movieData : props.savedList ? props.savedList.find(i => i.movieId === props.movieData.id) : {};
    const isSaved = props.isSavedMovies ? true : movie ? true : false;
    const [btnClass, setBtnClass] = useState(`movies-card__btn ${props.isSavedMovies ? 'movies-card__btn_type_delete' : isSaved ? 'movies-card__btn_active' : ''}`);
    const imgUrl = props.img.url ? `https://api.nomoreparties.co/${props.img.url}` : props.img;

    function onClick() {
        if (!isSaved) {
            setBtnClass('movies-card__btn movies-card__btn_active');
            const movieData = props.movieData;
            movieData.image = imgUrl;
            props.handleSave(movieData);
        } else {
            setBtnClass('movies-card__btn');
            props.handleDelete(movie._id);
        }
    }


    return (
        <div className="movies-card">
            <h2 className="movies-card__title">{props.title}</h2>
            <p className="movies-card__duration">{props.duration}</p>
            <button onClick={onClick} className={btnClass} />
            <a className="link movies-card__link" title="Открыть трейлер" href={props.trailerLink} target="_blank" rel="noreferrer">
                <img className="movies-card__img" src={imgUrl} alt={`Обложка фильма ${props.title}`} />
            </a>
        </div>
    )
}

export default MoviesCard;