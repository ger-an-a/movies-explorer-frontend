function MoviesCard(props) {
    return (
        <div className="movies-card">
            <h2 className="movies-card__title">{props.title}</h2>
            <p className="movies-card__duration">{props.duration}</p>
            <button className={`movies-card__btn ${props.saved ? "movies-card__btn_type_delete" : ""}`} />
            <img className="movies-card__img" src={props.img} alt={`Обложка фильма ${props.title}`} />
        </div>
    )
}

export default MoviesCard;