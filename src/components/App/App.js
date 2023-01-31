import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesFilter from '../MoviesFilter/MoviesFilter';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from "../../utils/MainApi";
import Preloader from '../Preloader/Preloader';
import ErrorPopup from '../ErrorPopup/ErrorPopup';

function App() {
    const [currentUser, setCurrentUser] = React.useState({ name: 'Загрузка...', email: 'Загрузка...' });
    const [savedMoviesList, setSavedMoviesList] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [movieDeleted, setMovieDeleted] = React.useState(false);
    const [errorIsVisible, setErrorIsVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [tokenCheked, setTokenCheked] = React.useState(false);
    const [dataSaved, setDataSaved] = React.useState(false);

    function handleSave(movie, callback) {
        mainApi.createMovie(movie)
            .then((newCard) => {
                setSavedMoviesList(savedMoviesList.concat(newCard.data));
                callback();
            })
            .catch((err) => {
                console.log(err);
                setErrorIsVisible(true);
            });
    }

    function handleDelete(movieId) {
        mainApi.deleteMovie(movieId)
            .then(() => {
                setMovieDeleted(true);
                const index = savedMoviesList.findIndex(item => item._id === movieId);
                const list = savedMoviesList;
                list.splice(index, 1);
                setSavedMoviesList(list);
            })
            .catch((err) => {
                console.log(err);
                setErrorIsVisible(true);
            })
    }

    function tokenCheck() {
        mainApi.checkCookie()
            .then((res) => {
                if (res.data) {
                    mainApi.getInfo()
                        .then((res) => {
                            setCurrentUser(res.data);
                            setLoggedIn(true);
                            setTokenCheked(true);
                        })
                } else {
                    setLoggedIn(false);
                    setTokenCheked(true);
                }
            })
            .catch((err) => {
                console.log(err);
                setErrorIsVisible(true);
            })
    }

    useEffect(() => {
        tokenCheck();
    }, [])

    useEffect(() => {
        if (tokenCheked) if ((loggedIn && dataSaved) || !loggedIn) {
            setLoading(false);
        }
    }, [tokenCheked, loggedIn, dataSaved])

    useEffect(() => {
        if (loggedIn) {
            Promise.all([mainApi.getMovies(), mainApi.getInfo()])
                .then(([allSavedMovies, userData]) => {
                    setCurrentUser(userData.data);
                    const userSavedMovies = allSavedMovies ? allSavedMovies.data.filter((item) => {
                        return item.owner === userData.data._id;
                    }) : [];
                    setSavedMoviesList(userSavedMovies);
                    setDataSaved(true);
                })
                .catch((err) => {
                    console.log(err);
                    setErrorIsVisible(true);
                });
        }
    }, [loggedIn])


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <ErrorPopup isVisible={errorIsVisible} setErrorIsVisible={setErrorIsVisible} />
                <BrowserRouter>
                    {loading ? (
                        <Route path="*">
                            <Preloader className='preloader_main' />
                        </Route>
                    ) : (
                        <Switch>
                            <Route exact path='/'>
                                <Header loggedIn={loggedIn} />
                                <Main />
                                <Footer />
                            </Route>
                            <ProtectedRoute path='/movies' loggedIn={loggedIn} loading={loading}>
                                <Header loggedIn={loggedIn} />
                                <MoviesFilter component={Movies} setMovieDeleted={setMovieDeleted} movieDeleted={movieDeleted} savedList={savedMoviesList} handleDelete={handleDelete} handleSave={handleSave} />
                                <Footer />
                            </ProtectedRoute>
                            <ProtectedRoute path='/saved-movies' loggedIn={loggedIn} loading={loading}>
                                <Header loggedIn={loggedIn} />
                                <MoviesFilter component={SavedMovies} setMovieDeleted={setMovieDeleted} movieDeleted={movieDeleted} savedList={savedMoviesList} handleDelete={handleDelete} handleSave={handleSave} />
                                <Footer />
                            </ProtectedRoute>
                            <ProtectedRoute path='/profile' loggedIn={loggedIn} loading={loading}>
                                <Header loggedIn={loggedIn} />
                                <Profile setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />
                            </ProtectedRoute>
                            <Route path='/signin'>
                                {!loggedIn ? (
                                    <Login setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />
                                ) : (
                                    <Redirect to="/movies" />
                                )}
                            </Route>
                            <Route path='/signup'>
                                {!loggedIn ? (
                                    <Register setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />
                                ) : (
                                    <Redirect to="/movies" />
                                )}
                            </Route>
                            <Route path="*">
                                <PageNotFound />
                            </Route>
                        </Switch>
                    )}
                </BrowserRouter>
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;

