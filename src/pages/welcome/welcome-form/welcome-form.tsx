import React, { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';
import { ButtonBlue } from '../../shared/buttons/button-blue/button-blue';
import styles from './welcome-form.module.scss';

interface IWelcomeFormProps {
  onClickNewGame(): void;
  onClickConnect(): void;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  gameURL: string;
}

export default function WelcomeForm({
  onClickNewGame,
  onClickConnect,
  onChange,
  gameURL,
}: IWelcomeFormProps): JSX.Element {
  return (
    <Form className={styles.form}>
      <Form.Group>
        <Form.Label className={styles.labelNewGame}>
          Start your planning:
        </Form.Label>
        <div className={styles.buttonNewGameWrap}>
          <ButtonBlue
            type="button"
            className={styles.btn}
            onClick={onClickNewGame}
          >
            Start new game
          </ButtonBlue>
        </div>
      </Form.Group>
      <Form.Group className={styles.connection}>
        <Form.Label className={styles.labelConnect}>OR:</Form.Label>
        <Form.Control
          type="gameURL"
          placeholder="Connect to lobby by URL:"
          value={gameURL}
          className={styles.input}
          onChange={onChange}
        />
        <ButtonBlue
          type="button"
          className={`${styles.btn} ${styles.btnConnect}`}
          onClick={onClickConnect}
          data-testid="btn"
        >
          Connect
        </ButtonBlue>
      </Form.Group>
    </Form>
  );
}
