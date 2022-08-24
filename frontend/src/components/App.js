import {useState, useEffect} from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {api} from "../utils/Api";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import * as Auth from "../utils/Auth";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import loginSuccessful from "../images/loginSuccessful.svg";
import loginUnsuccessful from "../images/loginUnsuccessful.svg";

export default App;

function App() {

    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [notification, setNotification] = useState({text: "", pic: ""});
    const navigate = useNavigate();

    useEffect(() => {
        tokenCheck()
    }, []);
/*
    useEffect(() => {
        if (loggedIn) {
            navigate("/")
        }
    }, [loggedIn]);*/

    useEffect(() => {
        if (loggedIn) {
            api.getUserData()
                .then((res) => {
                    setCurrentUser(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            api.getInitialCards()
                .then((res) => {
                        setCards(res);
                    }
                )
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [loggedIn]);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        if (!isLiked) {
            api.addLikeToCard(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            api.deleteLikeFromCard(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser(name, about) {
        api.changeUserData(name, about)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(avatar) {
        api.changeAvatar(avatar)
            .then((res) => {
                    setCurrentUser(res);
                    closeAllPopups()
                }
            )
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(name, link) {
        api.addCardtoServer(name, link)
            .then((res) => {
                setCards([res, ...cards])
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleEditAvatarClick() {
        setIsAvatarPopupOpen(true);
    };

    function handleEditProfileClick() {
        setIsProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };

    function closeAllPopups() {
        setIsProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsAvatarPopupOpen(false);
        setIsInfoToolTipOpen(false);
        setSelectedCard(null);
    }

    const handleLogin = (email, password) => {
        Auth.authorize(email, password)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem("token", res.token);
                    setLoggedIn(true);
                    setEmail(email);
                    navigate("/");
                }
            })
            .catch(() => {
                setIsInfoToolTipOpen(true);
                setNotification({text: "Что-то пошло не так! Попробуйте ещё раз.", pic: loginUnsuccessful})
            })
    }

    const handleRegister = (email, password) => {
        Auth.register(email, password)
            .then((res) => {
                console.log(res);
                if (res) {
                   // setLoggedIn(true);
                    setIsInfoToolTipOpen(true);
                    setNotification({text: "Вы успешно зарегистрировались!", pic: loginSuccessful});
                    //setEmail(email);
                    navigate("/signin");
                }
            })
            .catch(() => {
                setIsInfoToolTipOpen(true);
                setNotification({text: "Что-то пошло не так! Попробуйте ещё раз.", pic: loginUnsuccessful})
            })
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
        navigate("/signin");
    }

    const tokenCheck = () => {
        let token = localStorage.getItem("token");
        if (token) {
            Auth.getContent(token)
                .then((res) => {
                    setLoggedIn(true);
                    setEmail(res.email);
                    navigate("/");
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__content">
                    <Header email={email} handleLogout={handleLogout}/>
                    <Routes>

                        <Route path="/signin"
                               element={<Login loggedIn={loggedIn} handleLogin={handleLogin}
                                               tokenCheck={tokenCheck}/>}/>

                        <Route path="/signup"
                               element={<Register loggedIn={loggedIn} handleRegister={handleRegister}/>}/>

                        <Route path="/" element={
                            <ProtectedRoute path="/" loggedIn={loggedIn}>
                                <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick}
                                      onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick}
                                      onCardLike={handleCardLike}
                                      onCardDelete={handleCardDelete} onClose={closeAllPopups}
                                      cards={cards} selectedCard={selectedCard}/>
                            </ProtectedRoute>}/>

                        <Route path="*" element={loggedIn ? <Navigate to="/"/> : <Navigate to="./signup"/>}/>
                    </Routes>
                    <Footer/>

                    <ImagePopup onClose={closeAllPopups} card={selectedCard}/>

                    <EditProfilePopup isOpen={isProfilePopupOpen} onClose={closeAllPopups}
                                      onUpdateUser={handleUpdateUser}/>
                    <EditAvatarPopup isOpen={isAvatarPopupOpen} onClose={closeAllPopups}
                                     onUpdateAvatar={handleUpdateAvatar}/>
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                                   onAddPlace={handleAddPlaceSubmit}/>
                    <InfoTooltip isOpen={isInfoToolTipOpen} onClose={closeAllPopups} notification={notification}/>

                    <PopupWithForm name="delete" title="Вы уверены?" btnText="Да"/>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

