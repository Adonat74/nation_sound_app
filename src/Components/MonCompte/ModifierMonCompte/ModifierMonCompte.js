import React from "react";
import useAuth from "../../../hooks/useAuth";
import axios from '../../../api/axios';
import "./ModifierMonCompte.css";

export default function ModifierMonCompte () {

    const { auth } = useAuth();
    console.log(auth.username)

    const [updateUserData, setUpdateUserData] = React.useState(
        {
            email: `${auth?.email}`, 
            username: `${auth?.username}`, 
            password: "", 
            favoritemusicgenre: `${auth?.favoriteMusicGenre}`
        }
    );

    function handleChange(event) {
        const { name, value } = event.target;
        setUpdateUserData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.put("/api/updateUser",
            updateUserData,
            { headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + auth?.token } }
        )
        .then(res => res.data)
        .then(res => console.log(res))
        .catch(err => console.log(err.response));
    }

    return(
        <div className="monCompte">
            <p>modifier</p>
            <div className="monCompte">
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        name="email"
                        value={updateUserData.email}
                    />
                    <input
                        type="text"
                        placeholder="User Name"
                        onChange={handleChange}
                        name="username"
                        value={updateUserData.username}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        name="password"
                        value={updateUserData.password}
                    />
                    <select 
                        id="favoritemusicgenre" 
                        value={updateUserData.favoritemusicgenre}
                        onChange={handleChange}
                        name="favoritemusicgenre"
                    >
                        <option value="Aucun">Aucun</option>
                        <option value="Rap">Rap</option>
                        <option value="Electro">Electro</option>
                        <option value="Rock">Rock</option>
                        <option value="Classique">Classique</option>
                        <option value="Jazz">Jazz</option>
                        <option value="Reggae">Reggae</option>
                        <option value="Country">Country</option>
                        <option value="Latine">Latine</option>
                        <option value="Pop">Pop</option>
                    </select>
                    <br />
                    <br />
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
}