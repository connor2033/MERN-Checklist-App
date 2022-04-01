import {
  Col,
  Container,
  Row,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./ListPreviewPage.css";
import "../NewListPage/NewListPage.css";
import { useEffect, useState } from "react";
import axios from "axios";

function ListPreviewPage() {
  let { id } = useParams();

  const [checklist, setChecklist] = useState({
    title: "",
    details: "",
    listItems: [
      { itemType: "checklistItem", itemName: "", isChecked: false, _id: "" },
    ],
    _id: "",
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getChecklist = async () => {
    const { data } = await axios.get("/api/checklist/" + id);

    const newChecklist = {
      title: data.title,
      details: data.details,
      listItems: [...data.listItems],
      _id: data._id,
    };

    setChecklist(newChecklist);
  };

  useEffect(() => {
    getChecklist();
  }, [getChecklist]);

  const copyChecklist = async () => {
    const { data } = await axios.get("/api/checklist/copy/" + checklist._id);

    console.log(data);
    window.location.href = "/list/" + data._id;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Col style={{ display: "flex", justifyContent: "center" }}>
        <Container className="previewLeftContainer">
          <div>
            <Row>
              {/* List Name */}
              <h1 className="listNameBox">{checklist.title}</h1>
              <hr />
            </Row>
            {/* Details */}
            <Row>
              <div className="listDetailsBox">{checklist.details}</div>
            </Row>
            <div className="listScroll">
              {checklist.listItems.map((item) => {
                if (item.itemType === "heading") {
                  return (
                    <Row className="headingPreviewShell" key={item._id}>
                      {item.itemName}
                    </Row>
                  );
                }

                return (
                  <Row className="itemPreviewShell" key={item._id}>
                    {item.itemName}
                  </Row>
                );
              })}
            </div>
          </div>
        </Container>
      </Col>

      {/* Right Side */}
      <Col>
        <Container className="previewRightContainer">
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip
                  id={"top"}
                  style={{
                    padding: "5px",
                    color: "white",
                    borderRadius: 3,
                  }}
                >
                  Get a copy of this list!
                </Tooltip>
              }
            >
              <Button
                variant="success"
                size="lg"
                className="copyBtn"
                onClick={() => copyChecklist()}
              >
                Make a Copy
              </Button>
            </OverlayTrigger>
          </Row>
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="right"
              overlay={<Tooltip id={"top"}>Copied to Clipboard</Tooltip>}
            >
              <Button
                variant="outline-success"
                size="lg"
                className="shareBtn"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
              >
                Share
              </Button>
            </OverlayTrigger>
          </Row>
        </Container>
      </Col>
    </div>
  );
}

export default ListPreviewPage;
