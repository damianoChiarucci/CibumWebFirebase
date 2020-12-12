import { useState } from "react";

// importiamo gli elementi di material ui che ci occorrono : il menu vero e proprio e gli elementi list, list item e list text per stilizzare i bottoni che avremo nel menu
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from '@material-ui/core/Button';

import styled from "styled-components";

const Menu = (props) => {
  return (
    <>
      {/* 
          qui inizia il menu, con l'elemento SwipeableDrawer che contiene tutti i bottoni con i nomi delle sezione della mia APP 
          anchor indica la posizione da cui il menu si aprirà
          open indica se il menu è aperto o chiuso
          onClose e onOpen sono eventi legati allo swipe dell'utente (in generale per noi è importante invocare una sola funzione: apriChiudiMenu)
        */}
      <SwipeableDrawer
        anchor="right"
        open={props.menuVisibile}
        onClose={() => props.apriChiudiMenu()}
        onOpen={() => props.apriChiudiMenu()}
      >
        {/* List svolge il ruolo di <ul> e ListItem quello di <li>: in questo caso potrei utilizzare una costante ed eseguire un .map per ciclarmi tutte le pagine della mia app che voglio elencare */}
        <List>
          {props.utente.nome && (
            <ListItem key="saluti">
              <ListItemText primary={"Ciao " + props.utente.nome} />
            </ListItem>
          )}
          <ListItem button key="Home">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button key="Ricette">
            <ListItemText primary="Ricette" />
          </ListItem>
          <ListItem button key="Lista della Spesa">
            <ListItemText primary="Lista della Spesa" />
          </ListItem>
        </List>
        {!props.utente.loggato && (<Button onClick={() => props.loggatiConGoogle()}>LOGGATI</Button>)}
        {props.utente.loggato && (
          <Button onClick={() => props.logout()}>LOGOUT</Button>
        )}
      </SwipeableDrawer>
    </>
  );
};

export default Menu;
