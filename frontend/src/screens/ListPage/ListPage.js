import { Container, Row, Col } from "react-bootstrap";
import "./ListPage.css";

function ListPage() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Container className="listCard">
        <div>
          <Row>
            {/* List Name */}
            <h1 className="listNameBox">Grocery List</h1>
            <hr />
          </Row>
          {/* Details */}
          <Row>
            <div className="listDetailsBox">
              Get groceries on Saturday before the big event!
            </div>
          </Row>
          <div className="listScrollBox">
            {/* This is an item */}
            <Row style={{ marginLeft: "0px", width: "98%" }}>
              <Row className="itemListShell">
                <Col>List item</Col>
                <Col style={{ display: "flex", justifyContent: "right" }}>
                  <div>✔</div>
                </Col>
              </Row>
              <Row className="headingListShell">
                <Col>Wednesday</Col>
                <Col style={{ display: "flex", justifyContent: "right" }}></Col>
              </Row>
              <Row className="itemListShell">
                <Col>List item</Col>
                <Col style={{ display: "flex", justifyContent: "right" }}>
                  <div>✔</div>
                </Col>
              </Row>
              <Row className="itemListShell">
                <Col>List item</Col>
                <Col style={{ display: "flex", justifyContent: "right" }}>
                  <div>✔</div>
                </Col>
              </Row>
              <Row className="headingListShell">
                <Col>Friday get this stuff:</Col>
                <Col style={{ display: "flex", justifyContent: "right" }}></Col>
              </Row>
              <Row className="itemListShell">
                <Col>List item</Col>
                <Col style={{ display: "flex", justifyContent: "right" }}>
                  <div>✔</div>
                </Col>
              </Row>
              <Row className="itemListShell">
                <Col>List item</Col>
                <Col style={{ display: "flex", justifyContent: "right" }}>
                  <div>✔</div>
                </Col>
              </Row>
              <Row className="itemListShell">
                <Col>List item</Col>
                <Col style={{ display: "flex", justifyContent: "right" }}>
                  <div>✔</div>
                </Col>
              </Row>
              <Row className="itemListShell">
                <Col>List item</Col>
                <Col style={{ display: "flex", justifyContent: "right" }}>
                  <div>✔</div>
                </Col>
              </Row>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ListPage;
