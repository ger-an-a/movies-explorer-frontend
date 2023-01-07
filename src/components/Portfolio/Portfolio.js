function Portfolio() {
    return (
        <div className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__list">
                <li className="portfolio__list-item">
                    <a className="link portfolio__link" href="https://github.com/" target="_blank" rel="noreferrer">
                        Статичный сайт
                        <div className="portfolio__link-icon" />
                    </a>
                </li>
                <li className="portfolio__list-item">
                    <a className="link portfolio__link" href="https://github.com/" target="_blank" rel="noreferrer">
                        Адаптивный сайт
                        <div className="portfolio__link-icon" />
                    </a>
                </li>
                <li className="portfolio__list-item">
                    <a className="link portfolio__link" href="https://github.com/" target="_blank" rel="noreferrer">
                        Одностраничное приложение
                        <div className="portfolio__link-icon" />
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Portfolio;