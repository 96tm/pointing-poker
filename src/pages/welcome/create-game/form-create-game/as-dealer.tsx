import lobbyStyles from './as-dealer.module.scss';
import React from 'react';
import { Col, Container } from 'react-bootstrap';

function AsDealer(): JSX.Element {
  return (
    <Col lg={2} className={lobbyStyles.right}>
      <Container className={lobbyStyles.dealer}>
        <div>
          <div className={lobbyStyles.dealerLabel}>as Dealer</div>
        </div>
      </Container>
    </Col>
  );
}

export default AsDealer;
