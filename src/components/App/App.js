import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function App() {
    return (
        <div className='background'>
            <div className='page'>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/'>
                            <Header loggedIn={false} />
                            <Main />
                            <Footer />
                        </Route>
                        <Route path='/movies'>
                            <Header loggedIn={true} />
                            <Movies />
                            <Footer />
                        </Route>
                        <Route path='/saved-movies'>
                            <Header loggedIn={true} />
                            <SavedMovies />
                            <Footer />
                        </Route>
                        <Route path='/profile'>
                            <Header loggedIn={true} />
                            <Profile />
                        </Route>
                        <Route path='/signin'>
                            <Login />
                        </Route>
                        <Route path='/signup'>
                            <Register />
                        </Route>
                        <Route path="*">
                            <PageNotFound />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default App;

