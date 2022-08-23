export const BASE_URL = 'api.oksanachernyak.nomoredomains.sbs';
const checkRes = (response) => {
    return response.ok ? response.json() : Promise.reject(` У нас все поломалось: ${response.status}`)
}
export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email, password
        })
    })
        .then(checkRes);
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then(checkRes)
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type':
                'application/json',
            'Authorization':
                `Bearer ${token}`
        }
    })
        .then(checkRes)
}