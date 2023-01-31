class MainApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject({ message: `Ошибка: ${res.status}`, code: res.status });
    }

    postRegister(email, password, name) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                'password': password,
                'email': email,
                'name': name,
            })
        }).then(this._checkResponse)
    }

    postLogin(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                'password': password,
                'email': email
            }),
            credentials: 'include',
        })
            .then(this._checkResponse)
    }

    postLogout() {
        return fetch(`${this._baseUrl}/signout`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
        })
            .then(this._checkResponse)
    }

    checkCookie() {
        return fetch(`${this._baseUrl}/checkCookie`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

    getInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        }).then((res) => res.json())
    }

    updateInfo(name, email) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                'email': email,
                'name': name,
            }),
        }).then((res) => res.json())
    }

    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        }).then((res) => res.json())
    }

    createMovie(movie) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(movie),
        }).then((res) => res.json())
    }

    deleteMovie(filmId) {
        return fetch(`${this._baseUrl}/movies/${filmId}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include',
        }).then((res) => res.json())
    }
}

const mainApi = new MainApi({
    baseUrl: 'https://api.movies-ger.nomoredomains.club',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default mainApi;