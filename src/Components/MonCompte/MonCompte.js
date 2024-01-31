import React from "react"; 
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from '../../api/axios';
import "./MonCompte.css";

export default function ModifierMonCompte () {

    const { auth, setAuth} = useAuth();

    function deleteUser() {
        axios.delete("/api/deleteUser",
            { headers: {'Authorization': 'Bearer ' + auth?.token } }
        )
        .then(res => res.data)
        .then(res => console.log(res))
        .catch(err => console.log(err.response));
        setAuth({});
    }



    return(
        <div className="monCompte">
            <p>mon compte</p>
            <Link to="/mon-compte/modifier">Modifier mon compte</Link>
            <button onClick={deleteUser}>supprimer le compte</button>
        </div>
    );
}