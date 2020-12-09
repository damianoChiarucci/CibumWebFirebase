import { useEffect, useState } from "react";

import CircularProgress from '@material-ui/core/CircularProgress';
import MenuIcon from '@material-ui/icons/Menu';
import firebase from 'firebase';
import styled from 'styled-components';
import firebaseConfig from '../firebase-config';

import CardRicetta from '../components/CardRicetta';
import Menu from '../components/Menu';

firebase.initializeApp(firebaseConfig);

function onUtenteLoggato(callback) {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
      callback({
        nome: user.displayName,
        email: user.email,
        uid: user.uid,
        loggato: true
      });
    } else {
      callback({ loggato: false });
    }
  });
};


function logout() {
  firebase.auth().signOut();
};

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const loggatiConGoogle = () => {
  auth.signInWithPopup(provider);
};

function App() {
  // stato che utilizzeremo per aprire e chiudere il nostro menu laterale. Il menu può solo essere aperto o chiudo, perciò utilizzo un booleano (true/aperto, false/chiuso)
  const [menuVisibile, setMenuVisibile] = useState(false);
  const [utente, setUtente] = useState({ loggato: false });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function utenteLoggatoCallback(utente, error) {
      if (utente) {
        setUtente(utente);
      }
      setLoading(false);
    }
    onUtenteLoggato(utenteLoggatoCallback);
  }, []);

  useEffect(() => {
    if (utente.uid) {
      const utenteReferenza = firebase.database().ref(`/utenti/${utente.uid}`);
      utenteReferenza.once("value", utenteDb => {
        const cloneUtenteDb = utenteDb.val();
        if (cloneUtenteDb) {
          return null;
        } else {
          utenteReferenza.set({
            email: utente.email,
            nome : utente.nome
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

  if (loading) {
    return (
      <div className="contenitore-loading">
        <CircularProgress size={80} thickness={10} />
      </div>
    )
  }
  return (
    <Wrapper className="App">
      <header className="app-header">
        {/* questo bottone determina l'apertura o la chiusura del menu*/}
        <MenuIcon onClick={() => apriChiudiMenu()} />
        <Menu
          apriChiudiMenu={apriChiudiMenu}
          menuVisibile={menuVisibile}
          utente={utente}
          loggatiConGoogle={loggatiConGoogle}
          logout={logout}
        />
      </header>

      <div className="app-corpo">
        <CardRicetta />
        <CardRicetta />
        <CardRicetta />
        <CardRicetta />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
.app-header {
  background-color: #e0902c;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
  font-size: calc(10px + 2vmin);
  color: white;
}

.app-corpo {
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.contenitore-loading {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .MuiCircularProgress-colorPrimary {
    color: #e0902c !important;
   }
}

`;

export default App;
