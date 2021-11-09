import React, { ButtonHTMLAttributes } from 'react';
import { BaseButton } from '../base-button/base-button';
import styles from './button-blue.module.scss';

export function ButtonBlue(
  props: ButtonHTMLAttributes<HTMLButtonElement>
): JSX.Element {
  return (
    <BaseButton
      {...{
        ...props,
        className: `${props.className || ''} ${styles.buttonBlue}`,
      }}
    >
      {props.children}
    </BaseButton>
  );
}
