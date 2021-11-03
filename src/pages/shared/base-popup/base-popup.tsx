import React, {
  ButtonHTMLAttributes,
  HTMLAttributes,
  useEffect,
  useRef,
} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { BaseButton as BaseButton } from '../buttons/base-button/base-button';
import { ButtonBlue } from '../buttons/button-blue/button-blue';
import styles from './base-popup.module.scss';

export interface IBasePopupProps {
  isShown: boolean;
  buttonOkProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  buttonCancelProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  contentProps?: HTMLAttributes<HTMLDivElement>;
  buttonOkText?: string;
  buttonCancelText?: string;
  className?: string;
  headingText?: string;
  modal?: boolean;
}

export function BasePopup({
  headingText,
  buttonOkText,
  buttonCancelText,
  className,
  buttonOkProps,
  buttonCancelProps,
  contentProps,
  children,
  isShown,
  modal = false,
}: React.PropsWithChildren<IBasePopupProps>): JSX.Element {
  const popupStyle = className ? styles[String(className)] : '';
  const buttonOkClass = `${buttonOkProps?.className || ''} ${styles.buttonOk}`;
  const buttonCancelClass = `${buttonCancelProps?.className || ''} ${
    styles.buttonCancel
  }`;
  const buttonCancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function closeByEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        buttonCancelRef.current?.click();
      }
    }
    if (!modal) {
      document.addEventListener('keydown', closeByEscape);
    }
    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  return (
    <TransitionGroup className={styles.transition}>
      {isShown && (
        <CSSTransition
          timeout={600}
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
            <div
              className={styles.popupContainer}
              onClick={
                !modal ? () => buttonCancelRef.current?.click() : undefined
              }
            >
              <div
                className={`${styles.popup} ${popupStyle}`}
                onClick={(event) => event.stopPropagation()}
              >
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
                      ref={buttonCancelRef}
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
      )}
    </TransitionGroup>
  );
}
