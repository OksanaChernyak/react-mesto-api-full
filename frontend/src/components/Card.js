import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = (`place__delete ${isOwn ? 'place__delete_visible' : 'place__delete_hidden'}`);
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `place__like ${isLiked ? 'place__like_active' : ''}`
    return (
        <li className="place">
            <img className="place__image" alt={card.name} src={card.link} onClick={handleClick}/>
            <h2 className="place__title">{card.name}</h2>
            <button
                className={cardLikeButtonClassName}
                onClick={handleLikeClick}
                type="button"
                aria-label="Поставить лайк"
            ></button>
            <p className="place__like-counter">{card.likes.length}</p>
            <button
                className={cardDeleteButtonClassName}
                onClick={handleDeleteClick}
                type="button"
                aria-label="Удалить карточку"
            ></button>
        </li>
    );
}

export default Card;