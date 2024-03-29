const Preloader = (props) => {
    return (
        <div className={`preloader ${props.className}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader;
