import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import { RicetteContext } from './App';
import MiniaturaRicetta from '../components/MiniaturaRicetta';

const Home = (props) => {
  const ricetteContesto = useContext(RicetteContext);
  console.log(ricetteContesto);
  return (
    <Contenitore>
      {ricetteContesto.chiaviRicette && ricetteContesto.chiaviRicette.map((chiave) => (
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

export default Home;