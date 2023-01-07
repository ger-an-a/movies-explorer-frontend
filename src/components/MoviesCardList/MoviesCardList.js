import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    return (
        <ul className="movies-card-list">
            {
                props.list.map((item, index) => {
                    return (
                        <MoviesCard saved={props.saved} key={index.toString()} title={item.title} duration={item.duration} img={item.img} />
                    )
                })
            }
        </ul>
    )
}

export default MoviesCardList;