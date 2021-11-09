import React from 'react';
import { Col, FormControl } from 'react-bootstrap';
import styles from '../settings.module.scss';

interface ICustomSettingProps {
  inputId: string;
  inputLabel: string;
  onChange(): void;
}

export default function CustomSetting({
  inputId,
  inputLabel,
  onChange,
}: ICustomSettingProps): JSX.Element {
  return (
    <div className={styles.itemSettings}>
      <label htmlFor={inputId} className={styles.setting}>
        {inputLabel}
      </label>
      <Col lg={2} className={styles.right}>
        <div className={`${styles.container} form-check form-switch`}>
          <FormControl
            className={`${styles.switcher} form-check-input`}
            type="checkbox"
            id={inputId}
            onChange={onChange}
          />
        </div>
      </Col>
    </div>
  );
}
