import { Col, Container, Row, Button } from "react-bootstrap";
import "./ListPreviewPage.css";
import "../NewListPage/NewListPage.css";

function ListPreviewPage() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Col style={{ display: "flex", justifyContent: "center" }}>
        <Container className="newListCard previewLeftContainer">
          <div>
            <Row>
              {/* List Name */}
              <h1 className="listNameBox">List Name</h1>
              <hr />
            </Row>
            {/* Details */}
            <Row>
              <p className="listDetailsBox">Details will be displayed here</p>
            </Row>
            <div className="listScroll">
              <Row className="shell">List item?</Row>
              <Row className="shell">List item?</Row>
              <Row className="shell">List item?</Row>
              <Row className="shell">List item?</Row>
            </div>
          </div>
        </Container>
      </Col>

      {/* Right Side */}
      <Col>
        <Container className="previewRightContainer">
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="outline-success" size="lg" className="shareBtn">
              Share
            </Button>
          </Row>
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="success" size="lg" className="copyBtn">
              Make a Copy
            </Button>
          </Row>
        </Container>
      </Col>
    </div>
  );
}

export default ListPreviewPage;
