import React from 'react';
import loading from '../../../shared/assets/icons/loading.svg';
import styles from './spinner.module.scss';

interface ILoadSpinnerProps {
  text?: string;
}

const LoadSpinner = ({ text }: ILoadSpinnerProps): JSX.Element => {
  return (
    <>
      {Boolean(text) && <div className="loadingText">{text}</div>}
      <img src={loading} alt="Loading..." className={styles.loadingAnimation} />
    </>
  );
};

export default LoadSpinner;
