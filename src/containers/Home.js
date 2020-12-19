import { useState, useEffect } from "react";
import styled from 'styled-components';

import MiniaturaRicetta from '../components/MiniaturaRicetta';

const Home = () => {

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