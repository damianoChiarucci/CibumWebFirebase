import { useEffect, useState } from "react";
// importiamo gli elementi di material ui che ci occorrono : il menu vero e proprio e gli elementi list, list item e list text per stilizzare i bottoni che avremo nel menu
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

const Menu = (props) => {
    
    return (
        <SwipeableDrawer
            anchor="right"
            open={props.menuVisibile}
            onClose={() => props.apriChiudiMenu()}
            onOpen={() => props.apriChiudiMenu()}
          >
            {/* List svolge il ruolo di <ul> e ListItem quello di <li>: in questo caso potrei utilizzare una costante ed eseguire un .map per ciclarmi tutte le pagine della mia app che voglio elencare */}
            <List>
              {props.utente && props.utente.nome && (
                  <ListItem key="Nome">
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
            {props.utente.loggato && <Button onClick={() => props.logout()}>
              LOGOUT
            </Button>}
            {!props.utente.loggato && <Button onClick={() => props.loggatiConGoogle()}>
              LOGIN
            </Button>}
          </SwipeableDrawer>
    )
};

export default Menu;