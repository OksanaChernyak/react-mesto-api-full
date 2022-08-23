class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _handleError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(
            `Произошла ошибка ${res.status}, что-то поломалось. Сочувствуем:(`
        );
    }

    getInitialCards(token) {
        return fetch(`${this._baseUrl}${"/cards"}`, {
            method: "GET",
            headers:
                {authorization: `Bearer ${token}`},
        }).then(this._handleError);
    }

    addCardtoServer(data, token) {
        return fetch(`${this._baseUrl}${"/cards"}`, {
            method: "POST",
            headers:
                {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        }).then(this._handleError);
    }

    getUserData(token) {
        return fetch(`${this._baseUrl}${"/users/me"}`, {
            method: "GET",
            headers:
                {authorization: `Bearer ${token}`},
        }).then(this._handleError);
    }

    changeUserData({name, about}, token) {
        return fetch(`${this._baseUrl}${"/users/me"}`, {
            method: "PATCH",
            headers:
                {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        }).then(this._handleError);
    }

    changeAvatar({avatar}, token) {
        return fetch(`${this._baseUrl}${"/users/me/avatar"}`, {
            method: "PATCH",
            headers:
                {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            body: JSON.stringify({
                avatar: avatar,
            }),
        }).then(this._handleError);
    }

    deleteCard(cardId, token) {
        return fetch(`${this._baseUrl}${"/cards/"}${cardId}`, {
            method: "DELETE",
            headers:
                {authorization: `Bearer ${token}`},
        }).then(this._handleError);
    }

    addLikeToCard(cardId, token) {
        return fetch(`${this._baseUrl}${"/cards/likes/"}${cardId}`, {
            method: "PUT",
            headers:
                {authorization: `Bearer ${token}`},
        }).then(this._handleError);
    }

    deleteLikeFromCard(cardId, token) {
        return fetch(`${this._baseUrl}${"/cards/likes/"}${cardId}`, {
            method: "DELETE",
            headers:
                {authorization: `Bearer ${token}`},
        }).then(this._handleError);
    }
}

export const api = new Api({
    baseUrl: "oksanachernyak.nomoredomains.sbs",
});