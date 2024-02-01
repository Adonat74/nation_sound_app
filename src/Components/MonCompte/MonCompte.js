import { useState } from "react"; 
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from '../../api/axios';
import "./MonCompte.css";

export default function ModifierMonCompte () {

    const { auth, setAuth} = useAuth();

    const [confirmDelete, setConfirmDelete] = useState(false);

    function confirmDeleteUser () {
        setConfirmDelete(true)
    }

    function unConfirmDeleteUser () {
        setConfirmDelete(false)
    }

    function deleteUser() {
        axios.delete("/api/deleteUser",
            { headers: {'Authorization': 'Bearer ' + auth?.token } }
        )
        .then(res => res.data)
        .then(res => console.log(res))
        .catch(err => console.log(err.response));
        setAuth({});
    }

    function disconnect () {
        setAuth({});
    }

    

    return(
        <div className="monCompte">
            {confirmDelete ? (
                <section>
                    <h1>Êtes vous sûr de vouloir supprimer ce compte?</h1>
                    <button onClick={unConfirmDeleteUser}>Non: revenir en arrière</button>
                    <button onClick={deleteUser}>Oui: Supprimer le compte</button>
                </section>
            ) : (
                <section>
                    <p>mon compte</p>
                    <Link to="/mon-compte/modifier">Modifier mon compte</Link>
                    <button onClick={confirmDeleteUser}>Supprimer le compte</button>
                    <button onClick={disconnect}>Se déconnecter</button>
                </section>
            )} 
        </div>
    );
}