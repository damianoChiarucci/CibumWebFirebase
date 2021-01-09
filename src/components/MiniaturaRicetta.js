import { useState, useEffect } from "react";
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';

import { ROTTE } from "../costanti";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const MiniaturaRicetta = (props) => {

  const listaRottePrecedenti = useHistory();

  const cambiaRotta = (nuovaRotta) => {
    listaRottePrecedenti.push(nuovaRotta);
  };

  return (
    <Contenitore>
      <Card className="card" onClick={() => cambiaRotta(ROTTE.DETTAGLIO_RICETTA + '/' + props.chiave)}>
        <CardHeader
          title={props.titolo}
          subheader={props.categoria}
        />
        <CardMedia
          className="card-media"
          image={props.url}
          title={props.titolo}
        />
        <CardContent>
          <div>
            {props.descrizione}
          </div>
        </CardContent>
      </Card>
    </Contenitore>
  );
};

const Contenitore = styled.div`
  padding: 10px;
  .card {
    max-width: 350px;
  }
  .card-media {
    height: 0;
    padding-top: 56.25%; // 16:9
  }
`;

export default MiniaturaRicetta;