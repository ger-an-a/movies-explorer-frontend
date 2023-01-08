function Portfolio() {
    return (
        <div className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__list">
                <li className="portfolio__list-item">
                    <a className="link portfolio__link" href="https://github.com/" target="_blank" rel="noreferrer">
                        Статичный сайт
                        <p className="portfolio__link-icon">&#8599;</p>
                    </a>
                </li>
                <li className="portfolio__list-item">
                    <a className="link portfolio__link" href="https://github.com/" target="_blank" rel="noreferrer">
                        Адаптивный сайт
                        <p className="portfolio__link-icon">&#8599;</p>
                    </a>
                </li>
                <li className="portfolio__list-item">
                    <a className="link portfolio__link" href="https://github.com/" target="_blank" rel="noreferrer">
                        Одностраничное приложение
                        <p className="portfolio__link-icon">&#8599;</p>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Portfolio;