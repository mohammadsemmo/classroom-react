import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import AssignedCard from '../UI/AssignedCard';

const Tests = () => {
  const [tests, setTests] = useState([]);
  const { setActive, assigned } = useOutletContext();
  useEffect(() => {
    setActive('Tests');
    setTests(() => assigned.filter((a) => a.type === 'test'));
  }, [assigned, setActive]);
  return (
    <Row className="g-3">
      {tests.length ? (
        tests.map((t) => (
          <Col key={t.assigned_id} xs={12} md={6} lg={4} className="pe-3">
            <AssignedCard
              title={t.title}
              id={t.assigned_id}
              form_id={t.form_id}
              end={t.end_date_time}
            />
          </Col>
        ))
      ) : (
        <h6 className="text-muted text-center mt-5 pt-5">
          You currently have no tests!
        </h6>
      )}
    </Row>
  );
};
export default Tests;
