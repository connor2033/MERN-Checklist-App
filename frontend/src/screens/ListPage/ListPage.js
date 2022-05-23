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
    console.log("Get Checklist");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const scheduleGetChecklist = setInterval(() => {
  //   console.log("Someone Scheduled me to run every second");
  //   getChecklist();
  // }, 5000);

  const putChecklist = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put("/api/checklist/" + id, checklist, config);

    console.log(data);
  };

  const handleCheck = (index) => {
    const newChecklist = {
      title: checklist.title,
      details: checklist.details,
      listItems: [...checklist.listItems],
    };

    if (document.getElementById(index).checked) {
      newChecklist.listItems[index].isChecked = "true";
    } else {
      newChecklist.listItems[index].isChecked = "false";
    }

    setChecklist(newChecklist);
    putChecklist();
  };

  function checkedValue(isCheckedBool) {
    if (isCheckedBool === "true") {
      return true;
    } else {
      return false;
    }
  }

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
              {checklist.listItems.map((item, index) => {
                if (item.itemType === "heading") {
                  return (
                    <Row className="headingListShell" key={index}>
                      <Col>{item.itemName}</Col>
                    </Row>
                  );
                }

                return (
                  <Row className="itemListShell" key={index}>
                    <Col>{item.itemName}</Col>
                    <Col style={{ display: "flex", justifyContent: "right" }}>
                      <input
                        type="checkbox"
                        id={index}
                        className="checky"
                        onClick={() => handleCheck(index)}
                        checked={checkedValue(item.isChecked)}
                      />
                      <label for={index}>
                        <div id="tick_mark"></div>
                      </label>
                    </Col>
                  </Row>
                );
              })}
            </Row>
          </div>
        </div>

        {/* \/ for debugging */}
        {/* <pre style={{ marginTop: 20 }}>
          {JSON.stringify(checklist, null, 4)}
        </pre> */}
      </Container>
    </div>
  );
}

export default ListPage;
