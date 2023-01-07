import { useHistory } from "react-router-dom";

function PageNotFound() {
    const history = useHistory();

    function goBack() {
        history.go(-1);
    }

    return (
        <div className="page404">
            <div className="page404__container">
                <h1 className="page404__title">404</h1>
                <p className="page404__subtitle">Страница не найдена</p>
            </div>
            <button className="btn page404__btn" type="button" aria-label="назад" onClick={goBack}>Назад</button>
        </div>
    )
}
export default PageNotFound;