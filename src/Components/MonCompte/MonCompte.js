import { useState } from "react"; 
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { nodeAPI } from '../../api/axios';
import "./MonCompte.css";
import { Helmet } from 'react-helmet-async';

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
            {/* Permet de changer les title et description pour chaques composants */}
            <Helmet>
                <title>Nation-Sound Festival - Mon Compte</title>
                <meta name="title" content="Nation-Sound Festival - Mon Compte" />
                <meta name="description" content="Modifiez ou supprimez les informations de votre compte." />
            </Helmet>
            {confirmDelete ? (
                <section className="monCompteContainer">
                    <h1>Êtes vous sûr de vouloir supprimer ce compte?</h1>
                    <button onClick={unconfirmDeleteUser} className="monCompteButtons">Non: revenir en arrière</button>
                    <button onClick={deleteUser} className="monCompteButtons">Oui: Supprimer le compte</button>
                </section>
            ) : (
                <section className="monCompteContainer">
                    <h1 className="connexionTitle ">mon compte</h1>
                    <Link className="monCompteButtons" to="/mon-compte/modifier">Modifier mon compte</Link>
                    <button onClick={confirmDeleteUser} className="monCompteButtons">Supprimer le compte</button>
                    <button onClick={disconnect} className="monCompteButtons">Se déconnecter</button>
                    <Link to="/paiement" className="monCompteButtons">Billetterie</Link>
                </section>
            )} 
        </div>
    );
}