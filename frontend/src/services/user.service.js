export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

const BASE_URL = 'http://localhost:3000'

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${BASE_URL}/sessions`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.status === "created") {
                localStorage.setItem('user', JSON.stringify(user));
            }
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    window.location = '/'
}

function getAll() {
    const requestOptions = {
        method: 'GET'    
    };

    return fetch(`${BASE_URL}`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${BASE_URL}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    return fetch(`${BASE_URL}/registrations`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    return fetch(`${BASE_URL}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE'
    };

    return fetch(`${BASE_URL}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        } else {
            // console.log(data)
            return data;
        }
    });
}