function NavTab() {
    return (
        <section className="nav-tab">
            <nav>
                <ul className="nav-tab__menu">
                    <li>
                        <a href="#about-project" className="link nav-tab__link">О&nbsp;проекте</a>
                    </li>
                    <li>
                        <a href="#techs" className="link nav-tab__link">Технологии</a>
                    </li>
                    <li>
                        <a href="#about-me" className="link nav-tab__link">Студент</a>
                    </li>
                </ul>
            </nav>
        </section>
    )
}

export default NavTab;