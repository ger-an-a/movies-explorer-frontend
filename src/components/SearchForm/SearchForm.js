import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {

    function handleChange(e) {
        props.setIsSearch(false);
        props.setInputValue(e.target.value);
    }

    return (
        <>
            <form noValidate onSubmit={props.onSubmit} className="search-form" name="search-form">
                <div className="search-form__box">
                    <div className="search-form__icon" />
                    <input value={props.inputValue} onChange={handleChange} className="link search-form__input" id="search-input" type="search" name="film" placeholder="Фильм"
                        required />
                    <button className="btn search-form__btn" type="submit" aria-label="Найти">Найти</button>
                </div>
                <FilterCheckbox setCheckbox={props.setCheckbox} checkbox={props.checkbox} label="Короткометражки" />
            </form>
        </>
    )
}

export default SearchForm;