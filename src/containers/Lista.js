import { Component, useState } from "react";
import './App.css';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import firebaseConfig from '../firebase-config';

firebase.initializeApp(firebaseConfig);

function Lista() {

    const [inputCorrente, setInputCorrente] = useState("Inserisci qui la tua lista");
    const [lista, setLista] = useState([]);
    const [chiaviRicette, setChiaviRicette] = useState([]);
    const [oggettoRicette, setOggettoRicette] = useState({});

    const gestisciOnChange = (e) => {
        setInputCorrente(e.target.value);
    };

    const aggiungiAllaLista = () => {
        const listaAggiornata = [... lista];
        listaAggiornata.push(inputCorrente);
        setLista(listaAggiornata);
        setInputCorrente("Inserisci qui la tua lista");
        const recipesRef = firebase.database().ref("/recipes");
        recipesRef.on("value", snapshot => {
            const recipes = snapshot.val();
            console.log(recipes);
            const arrayRicette = Object.keys(recipes);
            setOggettoRicette(recipes);
            setChiaviRicette(arrayRicette);
            //setRecipes(recipes);
          });
    };

    return (
        <div className="App">
            <header className="App">
                <input value={inputCorrente} onChange={(e) => gestisciOnChange(e)}/>

                <br/>
                <br/>
                <Button variant="contained" color="secondary" onClick={() => aggiungiAllaLista()}>
                    Secondary
                </Button>
                <br/>

                <button type="button">AGGIUNGI</button>

                <ul>
                    {chiaviRicette.map((chiaveCorrente, indice) => { 
                        return (
                            <li key={indice}>{oggettoRicette[chiaveCorrente].name}</li>
                        )})
                    }
                </ul>
            </header>

        </div>
    );
}

export default Lista;