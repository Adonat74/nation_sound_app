import { useRef, useState} from "react";
import { Link } from "react-router-dom";
import { nodeAPI } from '../../../api/axios';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import "./CreerMonCompte.css";
import { Helmet } from 'react-helmet-async';

// chemin de validation yup //permet de valider le formulaire
const validationSchema = yup.object().shape({
    email: yup.string().required("L'adresse email est obligatoire.").email("Veuillez renseigner une adresse email valide."),
    userName: yup.string().required("Le nom est obligatoire.").matches(/^[A-z][A-z0-9-_]{3,23}$/, "4 à 24 caractères. Doit commencer avec une lettre. Lettres, nombres, underscores, traits d'union autorisés. "),
    password: yup.string().required("Le mot de passe est obligatoire").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{10,24}$/, "10 à 24 caractères. Doit inclure au moin une minuscule, une majuscule, un nombre et un caractère spéciale. Caractères spéciales autorisés: ! @ # $ %"),
    passwordConfirmation: yup.string().oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas.")
})


export default function CreerMonCompte () { 

    const errRef = useRef();
    
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    //valeurs initiales des inputs
    const initialValues = {
        email: "",
        userName: "",
        password: "",
        passwordConfirmation: "",
        favoriteMusicGenre: "aucun"
    };


    const handleSubmit = async (formValues) => {
        try {
            await nodeAPI.post("/api/createUser",
                formValues,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // permet d'afficher la page de succès grace à un opération ternaire
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Pas de réponse du serveur');
            } else if (err.response?.status === 400) {
                setErrMsg("L'email est déjà utilisé");
            } else {
                setErrMsg('La création du compte a échouée')
            }
        }
    }


    return (
        <div className="creerMonCompte">
            {/* Permet de changer les title et description pour chaques composants */}
            <Helmet>
                <title>Nation-Sound Festival - Créer Un Compte</title>
                <meta name="title" content="Nation-Sound Festival - Créer Un Compte" />
                <meta name="description" content="Créez un compte pour acheter des billets ou pour avoir des recommandations d'artistes personalisées." />
            </Helmet>
            {/*Opération ternaire pour aficher la page de succès*/}
            {success ? (
                 <section className="creerMonCompteContainer">
                     <h1 className="creerMonCompteSuccess">Votre compte à bien été créé!</h1>
                     <Link to="/mon-compte/connexion" className="seConnecter">Se connecter</Link>
                 </section>
             ) : (
                 <section className="creerMonCompteContainer">
                    {/*message d'erreur en haut du formulaire*/}
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                    <h1 className="creerMonCompteTitle">Créer un compte</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {
                            (formik) => (
                                <Form className="creerMonCompteForm">

                                    <label htmlFor="email">Email:</label>
                                    <Field name="email" type="email" id="email" autofocus aria-label="Champ requis"/>
                                    <ErrorMessage name="email" component="span" className="errorSpan"/>

                                    <label htmlFor="userName">Nom:</label>
                                    <Field name="userName" type="text" id="userName" aria-label="Champ requis, de 4 à 24 caractères. Doit commencer avec une lettre. Lettres, nombres, underscores, traits d'union autorisés."/>
                                    <ErrorMessage name="userName" component="span" className="errorSpan"/>

                                    <label htmlFor="password">Mot de passe:</label>
                                    <Field name="password" type="password" id="password" aria-label="Champ requis, de 10 à 24 caractères. Doit inclure au moin une minuscule, une majuscule, un nombre et un caractère spéciale. Caractères spéciales autorisés: ! @ # $ %"/>
                                    <ErrorMessage name="password" component="span" className="errorSpan"/>

                                    <label htmlFor="passwordConfirmation">Confirmer le mot de passe:</label>
                                    <Field name="passwordConfirmation" type="password" id="passwordConfirmation" aria-label="Champ requis"/>
                                    <ErrorMessage name="passwordConfirmation" component="span" className="errorSpan"/>

                                    <label htmlFor="favoriteMusicGenre">Choisissez votre genre de musique préféré:</label>
                                    <Field as="select" name="favoriteMusicGenre" id="favoriteMusicGenre">
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
                                    </Field>
                                    {/*Disable le boutton si le formulaire n'est pas valide*/}
                                    <button type="submit" disabled={!formik.isValid}>Créer mon compte</button>
                                </Form>
                            )
                        }
                    </Formik>
                    <h2>Vous possédez déjà un compte?</h2>                     
                    <Link to="/mon-compte/connexion">Connectez-vous</Link>
                </section>
            )}
        </div>
    );
}


// const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{10,24}$/;

// export default function CreerMonCompte () {

//     const emailRef = useRef();
//     const errRef = useRef();

//     const [email, setEmail] = useState('');
//     const [validEmail, setValidEmail] = useState(false);
//     const [emailFocus, setEmailFocus] = useState(false);

//     const [username, setUsername] = useState('');
//     const [validUsername, setValidUsername] = useState(false);
//     const [usernameFocus, setUsernameFocus] = useState(false);

//     const [password, setPassword] = useState('');
//     const [validPassword, setValidPassword] = useState(false);
//     const [passwordFocus, setPasswordFocus] = useState(false);

//     const [matchPassword, setMatchPassword] = useState('');
//     const [validMatch, setValidMatch] = useState(false);
//     const [matchFocus, setMatchFocus] = useState(false);

//     const [favoritemusicgenre, setFavoritemusicgenre] = useState('aucun');

//     const [errMsg, setErrMsg] = useState('');
//     const [success, setSuccess] = useState(false);

//     useEffect(() => {
//         emailRef.current.focus();
//     }, []);

//     useEffect(() => {
//         setValidEmail(EMAIL_REGEX.test(email));
//     }, [email]);

//     useEffect(() => {
//         setValidUsername(USER_REGEX.test(username));
//     }, [username]);

//     useEffect(() => {
//         setValidPassword(PASSWORD_REGEX.test(password));
//         setValidMatch(password === matchPassword);
//     }, [password, matchPassword]);

//     useEffect(() => {
//         setErrMsg('');
//     }, [email, username, password, matchPassword]);



//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const v1 = USER_REGEX.test(username);
//         const v2 = PASSWORD_REGEX.test(password);
//         const v3 = EMAIL_REGEX.test(email);
//         if (!v1 || !v2 || !v3) {
//             setErrMsg("Email, pseudo ou mot de passe invalide");
//             return;
//         }
//         try {
//             const response = await nodeAPI.post("/api/createUser",
//                 { email, username, password, favoritemusicgenre },
//                 {
//                     headers: { 'Content-Type': 'application/json' },
//                     withCredentials: true
//                 }
//             );
//             //console.log(response)
//             setSuccess(true);
//             //clear state and controlled inputs
//             //need value attrib on inputs for this
//             setEmail('');
//             setUsername('');
//             setPassword('');
//             setMatchPassword('');
//             setFavoritemusicgenre('Aucun');
//         } catch (err) {
//             if (!err?.response) {
//                 setErrMsg('Pas de réponse du serveur');
//             } else if (err.response?.status === 400) {
//                 setErrMsg("L'email est déjà utilisé");
//             } else {
//                 setErrMsg('La création du compte à échouée')
//             }
//             errRef.current.focus();
//         }
//     }

//     return(
//         <div className="creerMonCompte">
//             {success ? (
//                 <section className="creerMonCompteContainer">
//                     <h1 className="creerMonCompteSuccess">Votre compte à bien été créé!</h1>
//                     <Link to="/mon-compte/connexion" className="seConnecter">Se connecter</Link>
//                 </section>
//             ) : (
//                 <section className="creerMonCompteContainer">
//                     <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
//                     <h1 className="creerMonCompteTitle">Créer un compte</h1>
//                     <form onSubmit={handleSubmit} className="creerMonCompteForm">
//                         <label htmlFor="email">
//                             Email:
//                             <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
//                             <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
//                         </label>
//                         <input
//                             type="email"
//                             ref={emailRef}
//                             autoComplete="off"
//                             onChange={(e) => setEmail(e.target.value)}
//                             id="email"
//                             value={email}
//                             required
//                             aria-invalid={validEmail ? "false" : "true"}
//                             aria-describedby="uidnote"
//                             onFocus={() => setEmailFocus(true)}
//                             onBlur={() => setEmailFocus(false)}
//                         />
//                         <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
//                             <FontAwesomeIcon icon={faInfoCircle} />
//                             Doit être un email valide.<br />
//                         </p>
                        

//                         <label htmlFor="username">
//                             Nom:
//                             <FontAwesomeIcon icon={faCheck} className={validUsername ? "valid" : "hide"} />
//                             <FontAwesomeIcon icon={faTimes} className={validUsername || !username ? "hide" : "invalid"} />
//                         </label>
//                         <input
//                             type="text"
//                             id="username"
//                             autoComplete="off"
//                             onChange={(e) => setUsername(e.target.value)}
//                             value={username}
//                             required
//                             aria-invalid={validUsername ? "false" : "true"}
//                             aria-describedby="uidnote"
//                             onFocus={() => setUsernameFocus(true)}
//                             onBlur={() => setUsernameFocus(false)}
//                         />
//                         <p id="uidnote" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
//                             <FontAwesomeIcon icon={faInfoCircle} />
//                             4 à 24 caractères.<br />
//                             Doit commencer avec une lettre.<br />
//                             Lettres, nombres, underscores, traits d'union autorisés.
//                         </p>


//                         <label htmlFor="password">
//                             Mot de passe:
//                             <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
//                             <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
//                         </label>
//                         <input
//                             type="password"
//                             onChange={(e) => setPassword(e.target.value)}
//                             id="password"
//                             value={password}
//                             required
//                             aria-invalid={validPassword ? "false" : "true"}
//                             aria-describedby="passwordnote"
//                             onFocus={() => setPasswordFocus(true)}
//                             onBlur={() => setPasswordFocus(false)}
//                         />
//                         <p id="passwordnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
//                             <FontAwesomeIcon icon={faInfoCircle} />
//                             10 à 24 caractères.<br />
//                             Doit inclure au moin une minuscule, une majuscule, un nombre et un caractère spéciale.<br />
//                             Caractères spéciales autorisés: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
//                         </p>



//                         <label htmlFor="confirm_password">
//                             Confirmer le mot de passe:
//                             <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
//                             <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
//                         </label>
//                         <input
//                             type="password"
//                             id="confirm_password"
//                             onChange={(e) => setMatchPassword(e.target.value)}
//                             value={matchPassword}
//                             required
//                             aria-invalid={validMatch ? "false" : "true"}
//                             aria-describedby="confirmnote"
//                             onFocus={() => setMatchFocus(true)}
//                             onBlur={() => setMatchFocus(false)}
//                         />
//                         <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
//                             <FontAwesomeIcon icon={faInfoCircle} />
//                             Doit être identique au premier mot de passe.
//                         </p>


//                         <label htmlFor="favoritemusicgenre">
//                             Choisissez votre genre de musique préféré:
//                         </label>
//                         <select 
//                             id="favoritemusicgenre" 
//                             value={favoritemusicgenre}
//                             onChange={(e) => setFavoritemusicgenre(e.target.value)}
//                         >
//                             <option value="aucun">Aucun</option>
//                             <option value="rap">Rap</option>
//                             <option value="electro">Electro</option>
//                             <option value="rock">Rock</option>
//                             <option value="classique">Classique</option>
//                             <option value="jazz">Jazz</option>
//                             <option value="reggae">Reggae</option>
//                             <option value="country">Country</option>
//                             <option value="latine">Latine</option>
//                             <option value="pop">Pop</option>
//                         </select>
//                         <button disabled={!validUsername || !validPassword || !validMatch ? true : false}>Créer mon compte</button>
//                     </form>
//                     <h2>Vous possédez déjà un compte?</h2>
//                     <Link to="/mon-compte/connexion">Connectez-vous</Link>
//                 </section>
//             )}
//         </div>
//     );
// }


