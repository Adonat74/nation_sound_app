import { useRef, useState, useEffect, useContext } from "react"; 
import axios from "axios";
import "./Connexion.css";
import AuthContext from "../../../context/AuthProvider.js";

export default function Connexion () {

    const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();
    const errRef = useRef();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])



    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log(loginUserData);

        try {
            const response = await axios.post(
                "http://localhost:3001/api/login",
                { email, password },
                { 
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true 
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response?.data?.token));
            const accessToken = response?.data?.token;
            const favoriteMusicGenre = response?.data?.favoritemusicgenre;
            setAuth({ email, password, favoriteMusicGenre, accessToken });
            setEmail('');
            setPassword('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
                console.log(err);
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
        <div className="monCompte">
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (

                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Connexion</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            value={email}
                            required
                        />
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button>Connexion</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </div>
    );
}