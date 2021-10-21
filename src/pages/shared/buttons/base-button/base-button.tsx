import styles from './base-button.module.scss';
import React, {
  ButtonHTMLAttributes,
  forwardRef,
  MutableRefObject,
} from 'react';
import Button from 'react-bootstrap/Button';

export const BaseButton = forwardRef(function baseButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
  ref:
    | MutableRefObject<HTMLButtonElement | null>
    | ((instance: HTMLButtonElement | null) => void)
    | null
): JSX.Element {
  return (
    <Button
      ref={ref}
      {...{
        ...props,
        className: `${props.className || ''} ${styles.baseButton}`,
      }}
    >
      {props.children}
    </Button>
  );
});
