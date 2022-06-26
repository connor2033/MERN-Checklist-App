import {
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
    <div className="wrapperDiv">
      {/* Left Side */}
      <div className="listSide">
        <Container className="previewLeftContainer">
          <div>
            <Row>
              {/* List Name */}
              <div>
                <h1 className="listNamePreview">Template: {checklist.title}</h1>
              </div>

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
      </div>

      {/* Right Side */}
      <div className="buttonSide">
        <Container className="previewRightContainer">
          <div className="copyButtonWrapper">
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
          </div>
          <div className="shareButtonWrapper">
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="top"
              overlay={<Tooltip id={"top"}>Copied Link</Tooltip>}
            >
              <Button
                variant="outline-success"
                size="lg"
                className="shareBtn"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
              >
                Share Template
              </Button>
            </OverlayTrigger>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default ListPreviewPage;
