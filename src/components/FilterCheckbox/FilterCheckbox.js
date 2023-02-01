function FilterCheckbox(props) {
    function handleChange(e) {
        props.setCheckbox(e.target.checked);
    }

    return (
        <div className="checkbox">
            <label className="checkbox__switch">
                <input onChange={handleChange} checked={props.checkbox} id="switch" name="switch" type="checkbox" />
                <span className="checkbox__slider"></span>
            </label>
            <label htmlFor="switch" className="checkbox__title">{props.label}</label>
        </div>
    )
}
export default FilterCheckbox;