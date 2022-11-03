import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { useReducer } from 'react';

const initialState = {
  type: '',
  classID: '',
  start: '',
  end: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return { ...state, [action.field]: action.payload };
    default:
      return state;
  }
};

const AssignFormModal = ({
  show,
  setShow,
  data: { id: formID, title },
  classes,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { type, classID, start, end } = state;

  const handleClose = () => setShow('');

  const handleInputChange = (e) =>
    dispatch({
      type: 'CHANGE_INPUT',
      field: e.target.name,
      payload: e.target.value,
    });

  const handleSubmit = (e) => {
    if (start >= end) {
      console.log('invalid!');
    }
    console.log({
      formID,
      type,
      classID: parseInt(classID),
      start: new Date(start).toISOString().slice(0, 19).replace('T', ' '),
      end: new Date(end).toISOString().slice(0, 19).replace('T', ' '),
    });
  };

  return (
    <Modal
      show={show === 'assign'}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Assign {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col sm="3">
            <Form.Label column>Assign as</Form.Label>
          </Col>
          <Col sm="9">
            <Stack direction="horizontal" gap={4}>
              <Button
                variant={type === 'assignment' ? 'info w-100' : 'outline-dark'}
                className={type === '' && 'w-100'}
                style={{
                  '--bs-btn-border-color': 'var(--bs-gray-400)',
                }}
                onClick={handleInputChange}
                name="type"
                value="assignment"
              >
                Assignment
              </Button>
              <Button
                variant={type === 'test' ? 'info w-100' : 'outline-dark'}
                className={type === '' && 'w-100'}
                style={{
                  '--bs-btn-border-color': 'var(--bs-gray-400)',
                }}
                data-type="test"
                onClick={handleInputChange}
                name="type"
                value="test"
              >
                Test
              </Button>
            </Stack>
          </Col>
        </Row>

        <Form.Group controlId="selectClass" as={Row} className="mb-3">
          <Col sm="3">
            <Form.Label column>Assign to</Form.Label>
          </Col>

          <Col sm="9">
            <Form.Select
              name="classID"
              onChange={handleInputChange}
              defaultValue={'DEFAULT'}
            >
              <option value="DEFAULT" disabled>
                Select Class
              </option>
              {classes.map((_class) => (
                <option key={_class.id} value={_class.id}>
                  {_class.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group controlId="startDate" as={Row} className="mb-3">
          <Col sm="3">
            <Form.Label column>Start Date</Form.Label>
          </Col>
          <Col sm="9">
            <Form.Control
              type="datetime-local"
              className="w-100"
              value={start}
              onChange={handleInputChange}
              name="start"
            />
          </Col>
        </Form.Group>

        <Form.Group controlId="endDate" as={Row} className="mb-3">
          <Col sm="3">
            <Form.Label column>End Date</Form.Label>
          </Col>
          <Col sm="9">
            <Form.Control
              type="datetime-local"
              value={end}
              onChange={handleInputChange}
              name="end"
            />
          </Col>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="dark" onClick={handleClose}>
          Close
        </Button>
        <Button variant="info" onClick={handleSubmit}>
          Assign
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AssignFormModal;