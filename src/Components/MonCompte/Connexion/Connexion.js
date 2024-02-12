import { useRef, useState } from "react"; 
import { Link, useNavigate, useLocation } from "react-router-dom";
import { nodeAPI } from '../../../api/axios';
import "./Connexion.css";
import * as yup from "yup";
import { Formik, Field, Form } from "formik";
import useAuth from "../../../hooks/useAuth";
import DOMPurify from 'dompurify';


const validationSchema = yup.object().shape({
    email: yup.string().required("L'adresse email est obligatoire."),
    password: yup.string().required("Le mot de passe est obligatoire")
});


export default function Connexion () {

    const { setAuth } = useAuth();
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/mon-compte";


    const errRef = useRef();
    
   

    const initialValues = {
        email: "",
        password: ""
    };


    const handleSubmit = async (formValues) => {
        try {
            const response = await nodeAPI.post("/api/login",
                formValues,
                { 
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true 
                }
            );
            // Points d'interogation permettent de casser l'application si la structure des données attendues n'est pas la bonne'
            const token = DOMPurify.sanitize(response?.data?.token);
            const favoriteMusicGenre = DOMPurify.sanitize(response?.data?.data?.favoriteMusicGenre);
            const userName = DOMPurify.sanitize(response?.data?.data?.userName);
            setAuth({ ...formValues, userName, favoriteMusicGenre, token });
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Pas de réponse serveur');
            } else if (err.response?.status === 400) {
                setErrMsg("Il manque l'email ou le mot de passe");
            } else if (err.response?.status === 401) {
                setErrMsg('Pas autorisé');
            } else {
                setErrMsg('La connexion a échoué');
            }
        }
    }



    return(
        <section className="connexion">
            <div className="connexionContainer">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                <h1 className="connexionTitle">Connexion</h1>
                <Formik 
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {
                        () => (
                            <Form className="connexionForm" >
                                <label htmlFor="email">Email :</label>
                                <Field name="email" type="email" id="email"/>

                                <label htmlFor="password">Mot de passe :</label>
                                <Field name="password" type="password" id="password"/>

                                <button type="submit">Se connecter</button>
                            </Form>
                        )
                    }
                </Formik>
                <h2>Pas de compte?</h2>
                <Link to="/mon-compte/creer">Créer un compte</Link>
            </div>
            
        </section>
    );
}

// import { useRef, useState, useEffect } from "react"; 
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { nodeAPI } from '../../../api/axios';
// import "./Connexion.css";
// import useAuth from "../../../hooks/useAuth";

// export default function Connexion () {

//     const { setAuth } = useAuth();

//     const navigate = useNavigate();
//     const location = useLocation();
//     const from = location.state?.from?.pathname || "/mon-compte";



//     const emailRef = useRef();
//     const errRef = useRef();
    
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errMsg, setErrMsg] = useState('');


//     useEffect(() => {
//         emailRef.current.focus();
//     }, [])

//     useEffect(() => {
//         setErrMsg('');
//     }, [email, password])



//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await nodeAPI.post("/api/login",
//                 { email, password },
//                 { 
//                     headers: { "Content-Type": "application/json" },
//                     withCredentials: true 
//                 }
//             );
//             //console.log(response?.data);
//             const token = response?.data?.token;
//             const favoriteMusicGenre = response?.data?.data.favoriteMusicGenre;
//             const userName = response?.data?.data.userName;
//             setAuth({ email, userName, password, favoriteMusicGenre, token });
//             setEmail('');
//             setPassword('');
//             navigate(from, { replace: true });
//         } catch (err) {
//             if (!err?.response) {
//                 setErrMsg('Pas de réponse serveur');
//             } else if (err.response?.status === 400) {
//                 setErrMsg("Il manque l'email ou le mot de passe");
//             } else if (err.response?.status === 401) {
//                 setErrMsg('Pas autorisé');
//             } else {
//                 setErrMsg('La connexion à échoué');
//             }
//             errRef.current.focus();
//         }
//     }



//     return(
//         <section className="connexion">
//             <div className="connexionContainer">
//                 <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
//                 <h1 className="connexionTitle">Connexion</h1>
//                 <form className="connexionForm" onSubmit={handleSubmit}>
//                     <label htmlFor="email">Email :</label>
//                     <input
//                         type="email"
//                         id="email"
//                         ref={emailRef}
//                         autoComplete="off"
//                         onChange={(e) => setEmail(e.target.value)}
//                         name="email"
//                         value={email}
//                         required
//                     />
//                     <label htmlFor="password">Mot de passe :</label>
//                     <input
//                         type="password"
//                         id="password"
//                         onChange={(e) => setPassword(e.target.value)}
//                         value={password}
//                         required
//                     />
//                     <button>Se connecter</button>
//                 </form>
//                 <h2>Pas de compte?</h2>
//                 <Link to="/mon-compte/creer">Créer un compte</Link>
//             </div>
            
//         </section>
//     );
// }