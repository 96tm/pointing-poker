import React from 'react';
import {
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  FormControlProps,
} from 'react-bootstrap';
import { FieldErrors } from 'react-hook-form';
import styles from '../connect-to-lobby.module.scss';

interface IFirstNameProps {
  reg: FormControlProps;
  errors: FieldErrors;
  onChange: () => void;
}

export default function FirstName({
  reg,
  errors,
  onChange,
}: React.PropsWithChildren<IFirstNameProps>): JSX.Element {
  return (
    <Row>
      <Col lg={7}>
        <Form.Label htmlFor="firstName" className={styles.label}>
          Your first name:
        </Form.Label>
        <InputGroup className="mb-3" onChange={onChange}>
          <FormControl
            id="firstName"
            aria-describedby="basic-addon3"
            {...reg}
          />
        </InputGroup>
        {errors.firstName && errors.firstName.type === 'tooShort' && (
          <p className={styles.tipError}>
            The name must not be less than 3 characters
          </p>
        )}
        {errors.firstName && errors.firstName.type === 'tooLong' && (
          <p className={styles.tipError}>
            The name must not be more than 20 characters
          </p>
        )}
      </Col>
      <Col lg={2} className={styles.tipError}>
        {errors.firstName && errors.firstName.type === 'noName' && (
          <span>Enter your name</span>
        )}
      </Col>
    </Row>
  );
}
