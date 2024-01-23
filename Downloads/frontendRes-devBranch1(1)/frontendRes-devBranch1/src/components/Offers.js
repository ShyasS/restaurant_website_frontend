/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'react-bootstrap';

const PromotionCard = ({ title, description }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PromotionCard;
