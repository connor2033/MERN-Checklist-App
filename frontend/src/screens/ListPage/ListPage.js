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

  // const putChecklist = async () => {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   const { data } = await axios.put(
  //     "/api/checklist/" + checklist.id,
  //     checklist,
  //     config
  //   );

  //   console.log(data);
  //   window.location.href = "/preview/" + data._id;
  // };

  // const handleCheck = (index) => {
  //   const newChecklist = {
  //     title: checklist.title,
  //     details: checklist.details,
  //     listItems: [...checklist.listItems],
  //   };

  //   if (newChecklist.listItems[index].isChecked === "true")
  //     newChecklist.listItems[index].isChecked = "false";
  //   else newChecklist.listItems[index].isChecked = "true";

  //   setChecklist(newChecklist);
  // };

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
              {checklist.listItems.map((item, index) => {
                if (item.itemType === "heading") {
                  return (
                    <Row className="headingListShell" key={item._id}>
                      <Col>{item.itemName}</Col>
                    </Row>
                  );
                }

                return (
                  <Row className="itemListShell" key={item._id}>
                    <Col>{item.itemName}</Col>
                    <Col style={{ display: "flex", justifyContent: "right" }}>
                      <input
                        type="checkbox"
                        id={"check" + item._id}
                        className="checky"
                        // checked
                        // onClick={() => handleCheck(index)}
                      />
                      <label for={"check" + item._id}>
                        <div id="tick_mark"></div>
                      </label>
                    </Col>
                  </Row>
                );

                // if (item.isChecked === "true") {
                //   return (
                //     <Row className="itemListShell" key={item._id}>
                //       <Col>{item.itemName}</Col>
                //       <Col style={{ display: "flex", justifyContent: "right" }}>
                //         <input
                //           type="checkbox"
                //           id={"check" + item._id}
                //           className="checky"
                //           checked
                //           // onClick={() => handleCheck(index)}
                //         />
                //         <label for={"check" + item._id}>
                //           <div id="tick_mark"></div>
                //         </label>
                //       </Col>
                //     </Row>
                //   );
                // } else {
                //   return (
                //     <Row className="itemListShell" key={item._id}>
                //       <Col>{item.itemName}</Col>
                //       <Col style={{ display: "flex", justifyContent: "right" }}>
                //         <input
                //           type="checkbox"
                //           id={"check" + item._id}
                //           className="checky"
                //           unchecked
                //           // onClick={() => handleCheck(index)}
                //         />
                //         <label for={"check" + item._id}>
                //           <div id="tick_mark"></div>
                //         </label>
                //       </Col>
                //     </Row>
                //   );
                // }
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
        {/* \/ for debugging */}
        {/* <div style={{ marginTop: 20 }}>{JSON.stringify(checklist)}</div> */}
      </Container>
    </div>
  );
}

export default ListPage;
