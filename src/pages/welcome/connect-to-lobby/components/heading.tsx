import React from 'react';
import { Col } from 'react-bootstrap';
import styles from '../connect-to-lobby.module.scss';

interface IHeadingTextProps {
  text: string;
}

export default function HeadingText({ text }: IHeadingTextProps): JSX.Element {
  return (
    <Col lg={8} className={styles.left}>
      <h2 className={styles.title}>{text}</h2>
    </Col>
  );
}
