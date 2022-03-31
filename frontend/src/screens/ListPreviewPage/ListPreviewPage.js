import { Col, Container, Row, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./ListPreviewPage.css";
import "../NewListPage/NewListPage.css";
import { useEffect, useState } from "react";
import axios from "axios";

function ListPreviewPage() {
  let { id } = useParams();

  const [title, setTitle] = useState("");

  const getChecklist = async () => {
    const { data } = await axios.get("/api/checklist/" + id);

    setTitle(data.title);

    console.log(data);
  };

  useEffect(() => {
    getChecklist();
  }, [getChecklist]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Col style={{ display: "flex", justifyContent: "center" }}>
        <Container className="previewLeftContainer">
          <div>
            <Row>
              {/* List Name */}
              <h1 className="listNameBox">{title}</h1>
              <hr />
            </Row>
            {/* Details */}
            <Row>
              <p className="listDetailsBox">
                Details will be displayed here blah blah blah blah blah blah
                blah blah blah blah blah blah blah blah blah blah blah
              </p>
            </Row>
            <div className="listScroll">
              <Row className="itemPreviewShell">List item?</Row>
              <Row className="itemPreviewShell">List item?</Row>
              <Row className="headingPreviewShell">Wednesday</Row>
              <Row className="itemPreviewShell">List item?</Row>
              <Row className="itemPreviewShell">List item?</Row>
              <Row className="itemPreviewShell">List item?</Row>
              <Row className="itemPreviewShell">List item?</Row>
              <Row className="itemPreviewShell">List item?</Row>
              <Row className="itemPreviewShell">List item?</Row>
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
          <Row>
            <Link
              to="/list"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button variant="success" size="lg" className="copyBtn">
                Make a Copy
              </Button>
            </Link>
          </Row>
        </Container>
      </Col>
    </div>
  );
}

export default ListPreviewPage;
