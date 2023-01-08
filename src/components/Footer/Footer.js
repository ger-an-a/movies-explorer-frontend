function Footer() {
    return (
        <footer className="footer">
            <h1 className="footer__text footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h1>
            <div className="footer__container">
                <p className="footer__text footer__copyright">&copy; {new Date().getFullYear()}</p>
                <ul className="footer__list">
                    <li>
                        <a href="https://practicum.yandex.ru/" target="_blank" className="link footer__text" rel="noreferrer">Яндекс.Практикум</a>
                    </li>
                    <li>
                        <a href="https://github.com/" target="_blank" className="link footer__text" rel="noreferrer">Github</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
export default Footer;