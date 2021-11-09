import React, { ButtonHTMLAttributes } from 'react';
import styles from './button-add.module.scss';

export default function ButtonAdd(
  props: ButtonHTMLAttributes<HTMLButtonElement>
): JSX.Element {
  return <button type="button" className={styles.buttonAdd} {...props} />;
}
