import React from 'react';
import {
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  FormControlProps,
} from 'react-bootstrap';
import styles from '../connect-to-lobby.module.scss';

interface IJobPositionProps {
  reg: FormControlProps;
}

function JobPosition({
  reg,
}: React.PropsWithChildren<IJobPositionProps>): JSX.Element {
  return (
    <Row>
      <Col lg={7}>
        <Form.Label htmlFor="jobPosition" className={styles.label}>
          Your job position (optional):
        </Form.Label>
        <InputGroup className="mb-3">
          <FormControl
            id="jobPosition"
            aria-describedby="basic-addon3"
            {...reg}
          />
        </InputGroup>
      </Col>
      <Col lg={2}></Col>
    </Row>
  );
}

export default JobPosition;
