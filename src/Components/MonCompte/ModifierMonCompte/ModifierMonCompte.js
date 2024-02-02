import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from '../../../api/axios';
import useAuth from "../../../hooks/useAuth";
import "./ModifierMonCompte.css";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{10,24}$/;

export default function ModifierMonCompte () {

    const { auth, setAuth } = useAuth();

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [favoriteMusicGenre, setFavoriteMusicGenre] = useState('aucun');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrMsg('');
    }, [email, username, password, matchPassword]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log({ email, username, password, favoriteMusicGenre })
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(username);
        const v2 = PASSWORD_REGEX.test(password);
        const v3 = EMAIL_REGEX.test(email)
        if (!v1 || !v2 || !v3) {
            setErrMsg("Email, pseudo ou mot de passe invalide");
            return;
        }
        try {
            const response = await axios.put("/api/updateUser",
                { email, username, password, favoriteMusicGenre },
                {
                    headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + auth?.token },
                    withCredentials: true
                }
            );
            console.log(response)
            setSuccess(true);
            let token = auth.token
            setAuth({ email, username, password, favoriteMusicGenre, token });
            //clear state and controlled inputs
            //need value attrib on inputs for this
            
            setEmail('');
            setUsername('');
            setPassword('');
            setMatchPassword('');
            setFavoriteMusicGenre('Aucun');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Pas de réponse du serveur');
            } else if (err.response?.status === 409) {
                setErrMsg("L'email est déjà utilisé");
            } else {
                setErrMsg('La modification du compte à échouée')
            }
            errRef.current.focus();
        }
    }

    return(
        <div className="creerMonCompte">
            {success ? (
                <section className="modifierMonCompteContainer">
                    <h1 className="modifierMonCompteSuccess">Votre compte à bien été modifié</h1>
                    <Link to="/mon-compte" className="seConnecter">Retour à la page: Mon compte</Link>
                </section>
            ) : (
                <section  className="modifierMonCompteContainer">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className="modifierMonCompteTitle">Modifier vos informations</h1>
                    <form onSubmit={handleSubmit} className="modifierMonCompteForm">
                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Doit être un email valide.<br />
                        </p>
                        

                        <label htmlFor="username">
                            Nom:
                            <FontAwesomeIcon icon={faCheck} className={validUsername ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validUsername || !username ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                            aria-invalid={validUsername ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={() => setUsernameFocus(false)}
                        />
                        <p id="uidnote" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 à 24 caractères.<br />
                            Doit commencer avec une lettre.<br />
                            Lettres, nombres, underscores, traits d'union autorisés.
                        </p>


                        <label htmlFor="password">
                            Mot de passe:
                            <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            value={password}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="passwordnote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p id="passwordnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            10 à 24 caractères.<br />
                            Doit inclure au moin une minuscule, une majuscule, un nombre et un caractère spéciale.<br />
                            Caractères spéciales autorisés: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>



                        <label htmlFor="confirm_password">
                            Confirmer le mot de passe:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_password"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Doit être identique au premier mot de passe.
                        </p>


                        <label htmlFor="favoriteMusicGenre">
                            Choisissez votre genre de musique préféré:
                        </label>
                        <select 
                            id="favoriteMusicGenre" 
                            value={favoriteMusicGenre}
                            onChange={(e) => setFavoriteMusicGenre(e.target.value)}
                        >
                            <option value="aucun">Aucun</option>
                            <option value="rap">Rap</option>
                            <option value="electro">Electro</option>
                            <option value="rock">Rock</option>
                            <option value="classique">Classique</option>
                            <option value="jazz">Jazz</option>
                            <option value="reggae">Reggae</option>
                            <option value="country">Country</option>
                            <option value="latine">Latine</option>
                            <option value="pop">Pop</option>
                        </select>
                        <button disabled={!validUsername || !validPassword || !validMatch ? true : false}>Modifier mon compte</button>
                    </form>
                    <Link to="/mon-compte">Retour au compte</Link>
                </section>
            )}
        </div>
    );
}