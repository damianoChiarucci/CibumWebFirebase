import { useState, useEffect } from "react";
import styled from 'styled-components';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const MiniaturaRicetta = () => {

  return (
    <Contenitore>
      <Card className="card">
        <CardHeader
          title="Paella con Gamberi"
          subheader="14 Settembre 2020"
        />
        <CardMedia
          className="card-media"
          image="https://media.soscuisine.com/images/recettes/large/1079.jpg"
          title="Paella dish"
        />
        <CardContent>
          <div>
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
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