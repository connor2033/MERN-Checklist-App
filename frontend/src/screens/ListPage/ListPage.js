import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./ListPage.css";

function ListPage() {
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

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Container className="listCard">
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
          <div className="listScrollBox">
            {/* This is an item */}
            <Row style={{ marginLeft: "0px", width: "98%" }}>
              {checklist.listItems.map((item) => {
                if (item.itemType === "heading") {
                  return (
                    <Row className="headingListShell" key={item._id}>
                      <Col>{item.itemName}</Col>
                      <Col
                        style={{ display: "flex", justifyContent: "right" }}
                      ></Col>
                    </Row>
                  );
                }

                return (
                  <Row className="itemListShell" key={item._id}>
                    <Col>{item.itemName}</Col>
                    <Col style={{ display: "flex", justifyContent: "right" }}>
                      <div>✔</div>
                    </Col>
                  </Row>
                );
              })}

              {/* <Row className="headingListShell">
                <Col>Wednesday</Col>
                <Col style={{ display: "flex", justifyContent: "right" }}></Col>
              </Row>
              <Row className="itemListShell">
                <Col>List item</Col>
                <Col style={{ display: "flex", justifyContent: "right" }}>
                  <div>✔</div>
                </Col>
              </Row> */}
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ListPage;
