import React from "react"; 
import axios from "axios";
import "./Connexion.css";

export default function Connexion () {

    const [loginUserData, setLoginUserData] = React.useState(
        {
            email: "",
            password: ""
        }
    );


    function handleChange(event) {
        //console.log(event);
        const { name, value } = event.target;
        setLoginUserData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(loginUserData);
        axios.post(
            "http://localhost:3001/api/login",
            loginUserData,
            { headers: { "Content-Type": "application/json" } }
        )
        .then(res => res.data)
        .then(res => console.log(res))
        .catch(err => console.log(err.response))
    }

    return(
        <div className="monCompte">
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    name="email"
                    value={loginUserData.email}
                />
                <input
                    type="text"
                    placeholder="Password"
                    onChange={handleChange}
                    name="password"
                    value={loginUserData.password}
                />
                <button>Connexion</button>
            </form>
        </div>
    );
}