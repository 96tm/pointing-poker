import React from 'react';
import { Col } from 'react-bootstrap';
import styles from './heading-text.module.scss';

interface IHeadingProps {
  text: string;
}

function HeadingText({ text }: IHeadingProps): JSX.Element {
  return (
    <Col lg={8} className={styles.left}>
      <h2 className={styles.title}>{text}</h2>
    </Col>
  );
}

export default HeadingText;
