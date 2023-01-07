import photo from '../../images/photo.png'
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
    return (
        <section id="about-me" className="content about-me">
            <h2 className="main__section-title">Студент</h2>
            <div className="about-me__profile">
                <div className="about-me__text">
                    <h3 className="about-me__title">Виталий</h3>
                    <p className="about-me__description">Фронтенд-разработчик, 30&nbsp;лет</p>
                    <p className="about-me__paragraph">Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ. У&nbsp;меня есть жена
                        и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
                    </p>
                    <a href="https://github.com/" target="_blank" className="link about-me__link" rel="noreferrer">Github</a>
                </div>
                <img alt="фото студента" className="about-me__photo" src={photo} />
            </div>
            <Portfolio />
        </section>
    )
}

export default AboutMe;