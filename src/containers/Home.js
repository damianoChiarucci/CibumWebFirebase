import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import { RicetteContext } from './App';
import MiniaturaRicetta from '../components/MiniaturaRicetta';

const Home = (props) => {
  const ricette = useContext(RicetteContext);
  console.log(ricette);
  return (
    <Contenitore>
      <MiniaturaRicetta />
      <MiniaturaRicetta />
      <MiniaturaRicetta />
      <MiniaturaRicetta />
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