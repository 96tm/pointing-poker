import React, { ButtonHTMLAttributes } from 'react';
import styles from './button-close.module.scss';

export default function ButtonClose(
  props: ButtonHTMLAttributes<HTMLButtonElement>
): JSX.Element {
  return <button type="button" className={styles.buttonClose} {...props} />;
}
