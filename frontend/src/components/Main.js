import {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <button onClick={onEditAvatar} className="profile__avatar-button"></button>
                <img
                    className="profile__pic"
                    alt="аватарка"
                    src={currentUser.avatar}
                />
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button onClick={onEditProfile} className="profile__edit-button"></button>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button onClick={onAddPlace} className="profile__add-button"></button>
            </section>

            <section>
                <ul className="places">
                    {cards.map((card) => (
                        <Card key={card._id} _id={card._id} card={card} onCardClick={onCardClick}
                              onCardLike={onCardLike} onCardDelete={onCardDelete}/>
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;