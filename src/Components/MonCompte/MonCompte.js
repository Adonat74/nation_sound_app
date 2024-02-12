import { useState } from "react"; 
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { nodeAPI } from '../../api/axios';
import "./MonCompte.css";

export default function ModifierMonCompte () {

    const { auth, setAuth } = useAuth();

    const [confirmDelete, setConfirmDelete] = useState(false);

    function confirmDeleteUser () {
        setConfirmDelete(true)
    }

    function unconfirmDeleteUser () {
        setConfirmDelete(false)
    }

    function deleteUser() {
        nodeAPI.delete("/api/deleteUser",
            { headers: {'Authorization': 'Bearer ' + auth?.token } }
        )
        // .catch(err => console.log(err?.response));
        setAuth({});
    }

    function disconnect () {
        setAuth({});
    }

    

    return(
        <div className="monCompte">
            {confirmDelete ? (
                <section className="monCompteContainer">
                    <h1>Êtes vous sûr de vouloir supprimer ce compte?</h1>
                    <button onClick={unconfirmDeleteUser} className="monCompteButtons">Non: revenir en arrière</button>
                    <button onClick={deleteUser} className="monCompteButtons">Oui: Supprimer le compte</button>
                </section>
            ) : (
                <section className="monCompteContainer">
                    <h2 className="connexionTitle ">mon compte</h2>
                    <Link className="monCompteButtons" to="/mon-compte/modifier">Modifier mon compte</Link>
                    <button onClick={confirmDeleteUser} className="monCompteButtons">Supprimer le compte</button>
                    <button onClick={disconnect} className="monCompteButtons">Se déconnecter</button>
                    <Link to="/checkout" className="monCompteButtons">Billetterie</Link>
                </section>
            )} 
        </div>
    );
}