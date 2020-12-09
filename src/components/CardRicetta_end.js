import { useEffect, useState } from "react";

import styled from 'styled-components';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const CardRicetta = (props) => {

  return (
    <Wrapper>
      <Card>
        <CardHeader
          title="Shrimp and Chorizo Paella"
        />
        <CardMedia
          className="media"
          image="https://www.tavolartegusto.it/wp/wp-content/uploads/2019/08/paella-Ricetta-paella-di-pesce-paella-de-mariscos.jpg"
        />
        <CardContent>
          CONTENUTO
        </CardContent>
      </Card>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  max-width: 350px;
  margin: 20px;
  .media {
    height: 0;
    padding-top: 56.25%;
  }
`;

export default CardRicetta;