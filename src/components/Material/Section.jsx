import { Form, Card, Accordion, Row, Col } from 'react-bootstrap';
import { uploadMaterial } from '../../utils/materialAPI';
import { BsCloudUpload } from 'react-icons/bs';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';
import { useOutletContext } from 'react-router-dom';

const Section = ({ id, title, material, idx, updateSections }) => {
  const {
    user: { token, role },
  } = useContext(AuthContext);

  const { isArchived } = useOutletContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('section_id', id);

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('file[]', e.target.files[i]);
    }

    uploadMaterial(token, formData).then(() => {
      updateSections();
    });
  };

  return (
    <Accordion.Item eventKey={idx}>
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body>
        {!isArchived && role === 'teacher' && (
          <Form>
            <Form.Label className="btn btn-secondary m-0">
              {<BsCloudUpload />} Upload Material
              <Form.Control
                onChange={handleSubmit}
                type="file"
                placeholder="Upload Material"
                multiple
                hidden
              />
            </Form.Label>
          </Form>
        )}
        <Row className="g-3 my-3">
          {!material.length && <p className="text-muted">No Files Yet.</p>}
          {material.map((m, i) => (
            <Col xs={6} lg={4} key={i}>
              <a href={m.url} target="_blank" rel="noopener noreferrer">
                <Card className="h-100">
                  <Card.Body className="d-flex align-items-center justify-content-center">
                    <Card.Title className="m-0 text-center">
                      {m.file_name}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
};
export default Section;
