import { useState, useEffect, createContext } from "react";

import MenuIcon from "@material-ui/icons/Menu";
import CircularProgress from "@material-ui/core/CircularProgress";
import Menu from "../components/Menu";
import Home from "./Home";
import ListaSpesa from "./ListaSpesa";
import DettaglioRicetta from "./DettaglioRicetta";
import Preferiti from "./Preferiti";
import Ricette from "./Ricette";

import styled from "styled-components";

import firebase from "firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ROTTE } from "../costanti";

import firebaseConfig from "../firebase-config";

firebase.initializeApp(firebaseConfig);

function onUtenteLoggato(utenteLoggatoCallback) {
  // Quando l'utente è loggato o si è sloggato noi eseguiamo il codice interno all metodo onAuthStateChanged
  return firebase.auth().onAuthStateChanged((utenteParametro) => {
    if (utenteParametro) {
      console.log("utentePrametro: ", utenteParametro);
      utenteLoggatoCallback({
        loggato: true,
        nome: utenteParametro.displayName,
        email: utenteParametro.email,
        uid: utenteParametro.uid,
      });
    } else {
      utenteLoggatoCallback({
        loggato: false,
      });
    }
  });
}

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const loggatiConGoogle = () => {
  auth.signInWithPopup(provider);
};
const logout = () => {
  firebase.auth().signOut();
};

export const RicetteContext = createContext();
export const UtenteContext = createContext();

function App() {
  // stato che utilizzeremo per aprire e chiudere il nostro menu laterale. Il menu può solo essere aperto o chiudo, perciò utilizzo un booleano (true/aperto, false/chiuso)
  const [menuVisibile, setMenuVisibile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [utente, setUtente] = useState({ loggato: false });
  const [chiaviRicette, setChiaviRicette] = useState([]);
  const [oggettoRicette, setOggettoRicette] = useState({});

  const [preferiti, setPreferiti] = useState({});

  //Questo useEffect scatenerà la funzione che gli è passata solo all'avvio dell'APP
  useEffect(() => {
    // funzione che ci permette di invocare i cambi di stato anche al di fuori del nostro componente!
    function utenteLoggatoCallback(utenteObj) {
      setUtente(utenteObj);
      setLoading(false);
    }
    // funzione che intercetta l'avvenuto cambio di stato della login
    onUtenteLoggato(utenteLoggatoCallback);

    const ricetteReferenza = firebase.database().ref("/ricette");
    ricetteReferenza.on("value", (ricetteDb) => {
      const ricetteObj = ricetteDb.val();
      const ricetteArray = Object.keys(ricetteObj);
      setOggettoRicette(ricetteObj);
      setChiaviRicette(ricetteArray);
    });
  }, []);

  // Questo useEffect scatenerà la funzione che gli è passata solo quando lo stato utente cambierà di valore!
  useEffect(() => {
    if (utente.uid) {
      const utenteReferenza = firebase.database().ref("/utenti/" + utente.uid);
      utenteReferenza.once("value", (utenteDb) => {
        const cloneUtenteDb = utenteDb.val();
        if (cloneUtenteDb) {
          // se ho dei preferiti nel mio db, li aggiungo al mio stato di react appena mi loggo!
          if (cloneUtenteDb.preferiti) {
            setPreferiti(cloneUtenteDb.preferiti);
          }
        } else {
          utenteReferenza.set({
            email: utente.email,
            nome: utente.nome,
          });
        }
      });
    }
  }, [utente]);

  const apriChiudiMenu = () => {
    // con il punto esclamativo prima di una variabile andiamo a selezionare il valore opposto di un booleano
    // (se il valore di menuVisibile è true, noi lo mettiamo a false)
    // questo ci permette di non dover verificare prima di invocare questa funzione se dobbiamo aprire o chiudere il menu: lui lo capirà da solo!
    setMenuVisibile(!menuVisibile);
  };

  const aggiungiPreferito = (id) => {
    // aggiungo al mio db, nel nodo utenti(utente loggato) il mio nuovo preferito, generando una nuova chiave univoca
    const preferitoRef = firebase
      .database()
      .ref(`/utenti/${utente.uid}/preferiti`)
      .push(id);
    const chiavePreferito = preferitoRef.key;

    // creo il nuovo oggetto di preferiti a partire da quelli presenti nel mio stato (che mi clono con i tre puntini)
    const nuoviPreferiti = { ...preferiti };
    nuoviPreferiti[chiavePreferito] = id;

    // setto il mio nuovo stato dopo aver aggiunto il nuovo preferito
    setPreferiti(nuoviPreferiti);
  };

  const rimuoviPreferito = (id) => {
    // Mi trasformo lo stato preferiti in un array di chiavi, mi ciclo queste chiavi con il metodo find che mi dirà quando la mia chiave è quella giusta!
    const chiaveDaRimuovere = Object.keys(preferiti).find(
      (chiave) => preferiti[chiave] === id
    );
    // rimuoviamo il preferito da firebase, utilizzando il metodo remove!
    const preferitoRef = firebase
      .database()
      .ref(`/utenti/${utente.uid}/preferiti/${chiaveDaRimuovere}`)
      .remove();

    // creo il nuovo oggetto di preferiti a partire da quelli presenti nel mio stato (che mi clono con i tre puntini)
    const nuoviPreferiti = { ...preferiti };
    // rimuovo il preferito dal mio oggetto appena clonato
    delete nuoviPreferiti[chiaveDaRimuovere];

    setPreferiti(nuoviPreferiti);
  };

  const isPreferito = (id) => {
    // ciclo l'oggetto preferiti e mi trovo se è presente l'id specificato in input (se c'è, avrò il suo indice nell'array, altrimenti il valore restituito è -1)
    const chiavePreferito = Object.keys(preferiti).findIndex(
      (chiave) => preferiti[chiave] === id
    );
    if (chiavePreferito >= 0) {
      return true;
    } else {
      return false;
    }
  };

  const togglePreferito = (id) => {
    if (isPreferito(id)) {
      return rimuoviPreferito(id);
    } else {
      return aggiungiPreferito(id);
    }
  };

  if (loading) {
    return (
      <ContenitoreLoading>
        <CircularProgress />
      </ContenitoreLoading>
    );
  }
  return (
    <RicetteContext.Provider
      value={{
        oggettoRicette,
        chiaviRicette,
      }}
    >
      <UtenteContext.Provider
        value={{
          utente,
          togglePreferito,
          isPreferito,
        }}
      >
        <Router>
          <Contenitore className="App">
            <header className="app-header">
              {/* questo bottone determina l'apertura o la chiusura del menu*/}
              <MenuIcon onClick={() => apriChiudiMenu()} />
              <Menu
                menuVisibile={menuVisibile}
                apriChiudiMenu={apriChiudiMenu}
                utente={utente}
                loggatiConGoogle={loggatiConGoogle}
                logout={logout}
              />
            </header>
            <div className="app-corpo">
              <Switch>
                <Route path={ROTTE.RICETTE}>
                  <Ricette />
                </Route>

                <Route path={ROTTE.LISTA_DELLA_SPESA}>
                  <ListaSpesa />
                </Route>

                <Route path={ROTTE.DETTAGLIO_RICETTA + "/:chiave"}>
                  <DettaglioRicetta />
                </Route>

                <Route path={ROTTE.PREFERITI}>
                  <Preferiti />
                </Route>

                <Route path={ROTTE.HOME}>
                  <Home />
                </Route>
              </Switch>
            </div>
          </Contenitore>
        </Router>
      </UtenteContext.Provider>
    </RicetteContext.Provider>
  );
}

const Contenitore = styled.div`
  .app-header {
    background-color: #e0902c;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 20px;
    font-size: 20px;
    color: white;
  }
`;

const ContenitoreLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .MuiCircularProgress-colorPrimary {
    color: #e0902c !important;
  }
`;

export default App;
