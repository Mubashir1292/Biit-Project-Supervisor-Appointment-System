import React from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
function GroupProgress() {
  return (
    <React.Fragment>
      <div className="flex flex-col">
        <img src={BiitSAS} alt="BiitSAS" className="self-center w-3/12" />
        <Container className="mt-4">
          <Row>
            <Col
              md={{ span: 3, offset: 1 }}
              className="h-[450px] bg-gray-50 rounded "
            >
              <h5>To-do(4)</h5>
              <div className="bg-gray-200 w-full h-full p-1">
                <Card className="w-full">
                  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                  <Card.Body>
                    <Card.Subtitle>
                      <Badge bg="success">Success</Badge>
                    </Card.Subtitle>
                    <Card.Title>
                      <span className="text-sm">Card Title</span>
                    </Card.Title>
                    <Card.Text>
                      <span className="text-[10px]">Card Descriptions</span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>
            <Col
              md={{ span: 3, offset: 1 }}
              className="h-[450px] bg-gray-200 rounded"
            >
              <h5>Doing(3)</h5>
            </Col>
            <Col
              md={{ span: 3, offset: 1 }}
              className="h-[450px] bg-gray-200 rounded"
            >
              <h5>Done(3)</h5>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default GroupProgress;
