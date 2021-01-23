import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import { List, ListItem, ListItemSecondaryAction, ListItemText, Checkbox, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

import { colors, breakpoints } from "../global-styles";
import { RicetteContext, UtenteContext } from "./App";

const ListaSpesl = (props) => {
  const contestoUtente = useContext(UtenteContext);
  const contestoRicette = useContext(RicetteContext);

  const chiaviArrayRicetteListaSpesa = contestoUtente.listaSpesa && Object.keys(contestoUtente.listaSpesa).length > 0 ?  Object.keys(contestoUtente.listaSpesa) : null;

  return (
    <Contenitore>
      { chiaviArrayRicetteListaSpesa && chiaviArrayRicetteListaSpesa.map((chiave) => (
        <div key={chiave} className="shopping-list-container">
          <div className="shopping-list-wrapper">
            <div className="shopping-list-title">{contestoRicette.oggettoRicette[chiave] && contestoRicette.oggettoRicette[chiave].name}</div>
            <IconButton className="shopping-list-remove-btn" edge="start" onClick={() => contestoUtente.toggleElemInListaSpesa(chiave)}>
              <CloseIcon />
            </IconButton>
            <List dense>
              {contestoUtente.listaSpesa[chiave] && contestoUtente.listaSpesa[chiave].map((elem, ind) => (
                <ListItem key={ind} button>
                  <ListItemText id={ind} primary={elem.value} className={elem.checked ? "checked" : ""} />
                  <ListItemSecondaryAction>
                    <Checkbox 
                      edge="end"
                      checked={elem.checked}
                      onChange={() => contestoUtente.toggleCheckIngredienti(chiave, ind)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      ))}
    </Contenitore>
  );
};

const Contenitore = styled.div`
margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  @media only screen and (min-width: ${breakpoints.screenMobBig}){
    width: 80%;
    max-width: 1280px;
    justify-content: space-between;
    flex-direction: row;
  }
  .shopping-list-container {
    flex-grow: 1;
    .shopping-list-wrapper {
      position: relative;
      max-width: 450px;
      width: 85%;
      margin: 30px auto;
      box-shadow: 0px 2px 10px #ddd;
      padding: 30px;
      border-radius: 4px;
      border-top: 3px solid ${colors.mainRed};
      .shopping-list-remove-btn {
        position: absolute;
        top: 0;
        right: 0;
      }
      .shopping-list-title {
        font-size: 18px;
        font-weight: bold;
        color: ${colors.mainRed};
        text-align: center;
        margin-bottom: 20px;
      }
      .checked {
        text-decoration: line-through;
      }
      .Mui-checked {
        color: ${colors.mainRed}
      }
    }
  }
  .empty-shopping-container {
      margin: 0 auto;
        .empty-shopping-header {
        margin: 30px 20px;
        font-size: 36px;
        color: ${colors.mainRed};
        text-align: center;
        font-weight: 200;
        @media only screen and (min-width: ${breakpoints.screenMobBig}){
          margin: 50px auto;
          width: 100%;
        }
        .empty-shopping-subheader {
          color: #aaaaaa;
          font-size: 18px;
        }
      }
    }
`;

export default ListaSpesl;