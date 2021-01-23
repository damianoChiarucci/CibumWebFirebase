import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';

import { ROTTE } from "../costanti";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from "@material-ui/core/CardActions";
import IconButton from  "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCart';

import { UtenteContext } from "../containers/App";
import { colors } from "../global-styles";

const MiniaturaRicetta = (props) => {

  const listaRottePrecedenti = useHistory();
  const contestoUtente = useContext(UtenteContext);

  const cambiaRotta = (nuovaRotta) => {
    listaRottePrecedenti.push(nuovaRotta);
  };

  const gestisciPreferito = (evento) => {
    evento.stopPropagation();
    contestoUtente.togglePreferito(props.chiave)
  };

  const gestisciListaSpesa = (event) => {
    event.stopPropagation();
    contestoUtente.toggleElemInListaSpesa(props.chiave);
  }

  return (
    <Contenitore>
      <Card className="card" onClick={() => cambiaRotta(ROTTE.DETTAGLIO_RICETTA + '/' + props.chiave)}>
        <CardHeader
          className="recipe-preview-header"
          title={props.titolo}
          subheader={props.categoria}
        />
        <CardMedia
          className="card-media"
          image={props.url}
          title={props.titolo}
        />
        {contestoUtente?.utente?.loggato && (
          <CardActions disableSpacing>
            <IconButton onClick={(evento) => gestisciPreferito(evento)}>
              {contestoUtente.isPreferito(props.chiave) ? <FavoriteIcon htmlColor={colors.mainRed} /> : <FavoriteBorderIcon htmlColor={colors.mainRed} />}
            </IconButton>
            <IconButton aria-label="shopping cart" onClick={(evento) => gestisciListaSpesa(evento)}>
              {contestoUtente.isInListaSpesa(props.chiave) ? <RemoveShoppingCart htmlColor={colors.mainRed}/> : <AddShoppingCart htmlColor={colors.mainRed}/>}
            </IconButton>
          </CardActions>
        )}
      </Card>
    </Contenitore>
  );
};

const Contenitore = styled.div`
  padding: 10px;
  .card {
    margin: 0 auto;
    cursor: pointer;
    max-width: 280px;
    box-shadow: 1px 2px 10px rgba(0,0,0,0.1);
    .card-actions-wrapper {
      display: flex;
      justify-content: center;
    }
  }
  .card-media {
    height: 0;
    padding-top: 56.25%; // 16:9
  }
  .recipe-preview-header {
    border-bottom: 2px solid ${colors.mainRed};
    color: ${colors.mainRed};
    .MuiCardHeader-title {
      font-size: 16px;
      font-weight: bold;
      text-align: center;
    }
    .MuiCardHeader-subheader {
      font-size: 12px;
      text-align: center;
    }
  }
`;

export default MiniaturaRicetta;