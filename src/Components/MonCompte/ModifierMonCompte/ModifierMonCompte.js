import { useRef, useState} from "react";
import { Link } from "react-router-dom";
import { nodeAPI } from '../../../api/axios';
import { Formik, Field, Form, ErrorMessage } from "formik";
import useAuth from "../../../hooks/useAuth";
import * as yup from "yup";
import "./ModifierMonCompte.css";
import { Helmet } from 'react-helmet-async';

// chemin de validation yup //permet de valider le formulaire
const validationSchema = yup.object().shape({
    email: yup.string().required("L'adresse email est obligatoire.").email("Veuillez renseigner une adresse email valide."),
    userName: yup.string().required("Le nom est obligatoire.").matches(/^[A-z][A-z0-9-_]{3,23}$/, "4 à 24 caractères. Doit commencer avec une lettre. Lettres, nombres, underscores, traits d'union autorisés. "),
    password: yup.string().required("Le mot de passe est obligatoire").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{10,24}$/, "10 à 24 caractères. Doit inclure au moin une minuscule, une majuscule, un nombre et un caractère spéciale. Caractères spéciales autorisés: ! @ # $ %"),
    passwordConfirmation: yup.string().oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas.")
});


export default function ModifierMonCompte () { 

    const { auth, setAuth } = useAuth();

    const errRef = useRef();
    
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    //valeurs initiales des inputs
    const initialValues = {
        email: auth?.email,
        userName: auth?.userName,
        password: "",
        passwordConfirmation: "",
        favoriteMusicGenre: auth?.favoriteMusicGenre
    };



    const handleSubmit = async (formValues) => {
        try {
            await nodeAPI.put("/api/updateUser",
                formValues,
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + auth?.token },
                    withCredentials: true
                }
            );
            // permet d'afficher la page de succès grace à un opération ternaire
            setSuccess(true);
            let token = auth?.token
            setAuth({ ...formValues, token });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Pas de réponse du serveur');
            } else if (err.response?.status === 409) {
                setErrMsg("L'email est déjà utilisé");
            } else {
                setErrMsg('La modification du compte a échouée')
            }
        }
    }


    return (
        <div className="creerMonCompte">
            <Helmet>
                <title>Nation-Sound Festival - Modifier Mon Compte</title>
                <meta name="title" content="Nation-Sound Festival - Modifier Mon Compte" />
                <meta name="description" content="Modifiez les informations de votre compte." />
            </Helmet>
            {/*Opération ternaire pour aficher la page de succès*/}
            {success ? (
                 <section className="modifierMonCompteContainer">
                     <h1 className="modifierMonCompteSuccess">Votre compte à bien été modifié!</h1>
                     <Link to="/mon-compte" className="seConnecter">Retour à la page: Mon compte</Link>
                 </section>
             ) : (
                 <section className="modifierMonCompteContainer">
                    {/*message d'erreur en haut du formulaire*/}
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                    <h1 className="modifierMonCompteTitle">Modifier vos informations</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {
                            (formik) => (
                                <Form className="modifierMonCompteForm">

                                    <label htmlFor="email">Email:</label>
                                    <Field name="email" type="email" id="email"/>
                                    <ErrorMessage name="email" component="span" className="errorSpan"/>

                                    <label htmlFor="userName">Nom:</label>
                                    <Field name="userName" type="text" id="userName"/>
                                    <ErrorMessage name="userName" component="span" className="errorSpan"/>

                                    <label htmlFor="password">Mot de passe:</label>
                                    <Field name="password" type="password" id="password"/>
                                    <ErrorMessage name="password" component="span" className="errorSpan"/>

                                    <label htmlFor="passwordConfirmation">Confirmer le mot de passe:</label>
                                    <Field name="passwordConfirmation" type="password" id="passwordConfirmation"/>
                                    <ErrorMessage name="passwordConfirmation" component="span" className="errorSpan"/>

                                    <label htmlFor="favoriteMusicGenre">Choisissez votre genre de musique préféré:</label>
                                    <Field as="select" name="favoriteMusicGenre" id="favoriteMusicGenre" >
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
                                    <button type="submit" disabled={!formik.isValid}>Modifier mon compte</button>
                                </Form>
                            )
                        }
                    </Formik>
                    <Link to="/mon-compte">Retour au compte</Link>
                </section>
            )}
        </div>
    );
}