import React from 'react';
import { Form } from 'react-bootstrap';
import { ButtonBlue } from '../../../shared/buttons/button-blue/button-blue';
import styles from './game-info.module.scss';

interface IGameInfoProps {
  gameURL: string;
}

export default function GameInfo({ gameURL }: IGameInfoProps): JSX.Element {
  return (
    <div className={styles.containerLinkToLobby}>
      <h4 className={styles.titleLinkTo}>Link to lobby:</h4>
      <div className="form">
        <Form>
          <Form.Group>
            <Form.Control
              type="url"
              className={styles.input}
              value={gameURL}
              readOnly={true}
            />
            <ButtonBlue
              type="button"
              className={styles.btnCopy}
              onClick={() => globalThis.navigator.clipboard.writeText(gameURL)}
            >
              Copy
            </ButtonBlue>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
