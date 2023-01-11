import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
    return (
        <form className="search-form" name="search-form" validate="true">
            <div className="search-form__box">
                <div className="search-form__icon" />
                <input className="link search-form__input" id="search-input" type="search" name="film" placeholder="Фильм"
                    required />
                <button className="btn search-form__btn" type="submit" aria-label="Найти">Найти</button>
            </div>
            <FilterCheckbox label="Короткометражки" />
        </form>
    )
}

export default SearchForm;