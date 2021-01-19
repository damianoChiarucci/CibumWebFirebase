import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import { Redirect } from 'react-router-dom';
import { RicetteContext, UtenteContext } from './App';
import MiniaturaRicetta from '../components/MiniaturaRicetta';
import { ROTTE } from "../costanti";

const Preferiti = (props) => {
  const ricetteContesto = useContext(RicetteContext);
  const utenteContesto = useContext(UtenteContext);

  // filtriamo le ricette tenendoci solo quelle che sono state aggiunte ai preferiti
  const ricettePreferite = ricetteContesto?.chiaviRicette.filter((chiave) => {
    return utenteContesto.isPreferito(chiave);
  });

  if (!utenteContesto.utente?.loggato) {
    return (
      <Redirect to={ROTTE.LOGIN}/>
    )
  }
  return (
    <Contenitore>
      {ricettePreferite && ricettePreferite.map((chiave) => (
        <MiniaturaRicetta
          chiave={chiave}
          key={chiave}
          titolo={ricetteContesto.oggettoRicette[chiave].name}
          url={ricetteContesto.oggettoRicette[chiave].image.url}
          descrizione={ricetteContesto.oggettoRicette[chiave].description}
          categoria={ricetteContesto.oggettoRicette[chiave].recipeCategory}
        />
      ))}
    </Contenitore>
  );
};

const Contenitore = styled.div`
  display: flex;
  padding: 50px;
  flex-wrap: wrap;
  justify-content: center;
`;

export default Preferiti;