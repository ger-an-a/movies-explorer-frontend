function AboutProject() {
    return (
        <section id="about-project" className="content about-project">
            <h2 className="main__section-title">О&nbsp;проекте</h2>
            <ul className="about-project__list">
                <li>
                    <h3 className="about-project__subtitle">Дипломный проект включал 5&nbsp;этапов</h3>
                    <p className="about-project__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
                </li>
                <li>
                    <h3 className="about-project__subtitle">На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
                    <p className="about-project__paragraph">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
            <div className="about-project__table">
                <p className="about-project__cell about-project__cell_color_green">1&nbsp;неделя</p>
                <p className="about-project__cell about-project__cell_color_gray">4&nbsp;недели</p>
                <p className="about-project__cell">Back-end</p>
                <p className="about-project__cell">Front-end</p>
            </div>
        </section>
    )
}

export default AboutProject;