import { useRef, useState, useEffect } from "react"; 
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from '../../../api/axios';
import "./Connexion.css";
import useAuth from "../../../hooks/useAuth";

export default function Connexion () {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/mon-compte";



    const emailRef = useRef();
    const errRef = useRef();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');


    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])



    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/api/login",
                { email, password },
                { 
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true 
                }
            );
            console.log(response?.data);
            const token = response?.data?.token;
            const favoriteMusicGenre = response?.data?.data.favoritemusicgenre;
            const username = response?.data?.data.username;
            setAuth({ email, username, password, favoriteMusicGenre, token });
            setEmail('');
            setPassword('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }



    return(
        <section className="connexion">
            <div className="connexionContainer">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1 className="connexionTitle">Connexion</h1>
                <form className="connexionForm" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email :</label>
                    <input
                        type="email"
                        id="email"
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        value={email}
                        required
                    />
                    <label htmlFor="password">Mot de passe :</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button>Se connecter</button>
                </form>
                <h2>Pas de compte?</h2>
                <Link to="/mon-compte/creer">Créer un compte</Link>
            </div>
            
        </section>
    );
}