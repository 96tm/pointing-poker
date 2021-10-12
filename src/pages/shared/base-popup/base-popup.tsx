import React, { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { CSSTransition } from 'react-transition-group';
import { BaseButton as BaseButton } from '../buttons/base-button/base-button';
import { ButtonBlue } from '../buttons/button-blue/button-blue';
import styles from './base-popup.module.scss';

interface IBasePopupProps {
  isShown: boolean;
  buttonOkProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  buttonCancelProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  contentProps?: HTMLAttributes<HTMLDivElement>;
  buttonOkText?: string;
  buttonCancelText?: string;
  className?: string;
  headingText?: string;
}

export function BasePopup(
  props: React.PropsWithChildren<IBasePopupProps>
): JSX.Element {
  const {
    headingText,
    buttonOkText,
    buttonCancelText,
    className,
    buttonOkProps,
    buttonCancelProps,
    contentProps,
    children,
    isShown,
  } = props;
  const popupStyle = className ? styles[String(className)] : '';
  const buttonOkClass = `${buttonOkProps?.className || ''} ${styles.buttonOk}`;
  const buttonCancelClass = `${buttonCancelProps?.className || ''} ${
    styles.buttonCancel
  }`;

  return (
    <CSSTransition
      timeout={200}
      in={isShown}
      classNames={{
        enter: styles.modalEnter,
        enterActive: styles.modalEnterActive,
        enterDone: styles.modalEnterDone,
        exit: styles.modalExit,
        exitActive: styles.modalExitActive,
        exitDone: styles.modalExitDone,
      }}
    >
      <div className={`${styles.modal} ${isShown ? styles.active : ''}`}>
        <div className={styles.overlay} />
        <div className={styles.popupContainer}>
          <div className={`${styles.popup} ${popupStyle}`}>
            {headingText && (
              <h2 className={styles.headingText}>{headingText}</h2>
            )}
            <div {...contentProps} className={styles.content}>
              {children}
            </div>
            <div className={styles.buttons}>
              {buttonOkText && (
                <ButtonBlue
                  {...{
                    ...buttonOkProps,
                    className: buttonOkClass,
                  }}
                >
                  {buttonOkText}
                </ButtonBlue>
              )}
              {buttonCancelText && (
                <BaseButton
                  {...{
                    ...buttonCancelProps,
                    className: buttonCancelClass,
                  }}
                >
                  {buttonCancelText}
                </BaseButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
