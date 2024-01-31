import React from "react"; 
import axios from "axios";
import "./CreerMonCompte.css";

export default function CreerMonCompte (props) {

    const [createUserData, setcreateUserData] = React.useState(
        {
            email: "", 
            username: "", 
            password: "", 
            favoritemusicgenre: ""
        }
    );


    function handleChange(event) {
        //console.log(event);
        const { name, value } = event.target;
        setcreateUserData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(createUserData);
        axios.post(
            "http://localhost:3001/api/createUser",
            createUserData,
            { headers: { "Content-Type": "application/json" } }
        )
        .then(res => res.data)
        .then(res => console.log(res))
        .catch(err => console.log(err.response));
    }

    return(
        <div className="monCompte">
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    name="email"
                    value={createUserData.email}
                />
                <input
                    type="text"
                    placeholder="User Name"
                    onChange={handleChange}
                    name="username"
                    value={createUserData.username}
                />
                <input
                    type="text"
                    placeholder="Password"
                    onChange={handleChange}
                    name="password"
                    value={createUserData.password}
                />
                <select 
                    id="favoritemusicgenre" 
                    value={createUserData.favoritemusicgenre}
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
    );
}