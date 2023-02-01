import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    return (
        <ul className='movies-card-list'>
            {
                props.list.map((item) => {
                    return (
                        <li key={item.nameEN + Math.random().toString(16).slice(2)}>
                            <MoviesCard savedList={props.savedList} movieData={item} handleDelete={props.handleDelete}
                                handleSave={props.handleSave} isSavedMovies={props.isSavedMovies} trailerLink={item.trailerLink}
                                title={item.nameRU} duration={item.duration} img={item.image} />
                        </li>
                    )
                })}
        </ul>
    )
}

export default MoviesCardList;