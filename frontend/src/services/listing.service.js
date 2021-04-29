const BASE_URL = 'http://localhost:3000'

const newListing = (listing) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listing)
    };

    return fetch(`${BASE_URL}`, requestOptions).then(handleResponse);

}

const getAll = () => {
    const requestOptions = {
        method: 'GET'    
    };

    return fetch(`${BASE_URL}`, requestOptions).then(handleResponse);
}

const getById = (id) => {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${BASE_URL}/listings/${id}`, requestOptions).then(handleResponse);
}

const update = (user) => {
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
const _delete = (id) => {
    const requestOptions = {
        method: 'DELETE'
    };

    return fetch(`${BASE_URL}/users/${id}`, requestOptions).then(handleResponse);
}

const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

const service = {
    getAll,
    newListing,
    update,
    delete: _delete
};

export default service