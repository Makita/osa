import React from 'react';
import { ListGroupItem, Col } from 'react-bootstrap';

function InfoRow(props) {
  return (
    <ListGroupItem className="container-fluid">
      <Col xs={6} md={4}><b>{props.name}</b></Col>
      <Col xs={6} md={8}>{props.value}</Col>
    </ListGroupItem>
  );
}

export default InfoRow;