import axios from "axios";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
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
    // console.log("Get Checklist: /api/checklist/" + id);
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
    setInterval(() => {
      getChecklist();
    }, 5 * 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      document.getElementById("name" + index).style.color = "#9e9e9e";
    } else {
      newChecklist.listItems[index].isChecked = "false";
      document.getElementById("name" + index).style.color = "";
    }

    setChecklist(newChecklist);
    putChecklist();
  };

  function checkedValue(index) {
    if (checklist.listItems[index].isChecked === "true") {
      return true;
    } else {
      return false;
    }
  }

  function checkedStyle(index) {
    if (checklist.listItems[index].isChecked === "true") {
      return { color: "#9e9e9e" };
    } else {
      return { color: "#343a40" };
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Container className="listCard">
        <div>
          <Row>
            {/* List Name */}
            <div className="listNameDisp">{checklist.title}</div>
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
                  <div className="itemListShell" key={index}>
                    <div
                      className="itemName"
                      id={"name" + index}
                      style={checkedStyle(index)}
                    >
                      {item.itemName}
                    </div>
                    <div className="checkDiv">
                      <input
                        type="checkbox"
                        id={index}
                        className="checky"
                        onClick={() => handleCheck(index)}
                        checked={checkedValue(index)}
                        readOnly
                      />
                      <label for={index}>
                        <div id="tick_mark"></div>
                      </label>
                    </div>
                  </div>
                );
              })}
            </Row>
          </div>
        </div>

        {/* \/ for debugging */}
        {/* <pre style={{ marginTop: 20 }}>
          {JSON.stringify(checklist, null, 4)}
        </pre> */}
        <div style={{ textAlign: "right" }}>
          <Link to={"/list/edit/" + id}>
            <Button
              variant="secondary"
              className="bottomBtn"
              // onClick={(window.location.href = "/list/edit/" + id)}
            >
              Edit
            </Button>
          </Link>
          <Link to={"/preview/" + id}>
            <Button variant="secondary" className="bottomBtn">
              Preview
            </Button>
          </Link>
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="top"
            overlay={<Tooltip>Copied Link</Tooltip>}
          >
            <Button
              variant="secondary"
              className="bottomBtn"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            >
              Share
            </Button>
          </OverlayTrigger>
        </div>
      </Container>
    </div>
  );
}

export default ListPage;
