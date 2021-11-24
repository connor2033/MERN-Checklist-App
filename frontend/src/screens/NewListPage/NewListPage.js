import { Container, Row, Button, Col } from "react-bootstrap";
import "./NewListPage.css";
import { useState } from "react";

function NewListPage() {
  const [inputList, setInputList] = useState([{ itemName: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button with index
  const handleAddClick = (index) => {
    const listStart = [...inputList.splice(index + 1, inputList.length)];
    const listEnd = [...inputList.splice(0, index + 1)];
    setInputList([...listEnd, { itemName: "" }, ...listStart]);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Container className="newListCard">
          <div>
            {/* List Name */}
            <Row>
              <input
                type="text"
                placeholder="List Name"
                autoFocus="autofocus"
                className="listNameBox"
              ></input>
              <hr />
            </Row>
            {/* Details */}
            <Row>
              <input
                type="text"
                placeholder="Details..."
                className="listDetailsBox"
              ></input>
            </Row>
            {/* Item Row */}
            {inputList.map((x, i) => {
              return (
                <Row>
                  <Col className="shell">
                    <input
                      name="itemName"
                      value={x.itemName}
                      onChange={(e) => handleInputChange(e, i)}
                      type="text"
                      placeholder="Add an item..."
                      className="inputBox"
                    ></input>
                  </Col>
                  <Col>
                    <Button
                      className="addRemoveBtn"
                      variant="danger"
                      style={{ marginRight: 10 }}
                      onClick={() => handleRemoveClick(i)}
                    >
                      -
                    </Button>
                    <Button
                      className="addRemoveBtn"
                      variant="success"
                      onClick={() => handleAddClick(i)}
                    >
                      +
                    </Button>
                  </Col>
                </Row>
              );
            })}
            <Row>
              <Button
                className="addRemoveBtn"
                variant="outline-success"
                onClick={() => handleAddClick(inputList.length)}
              >
                +
              </Button>
            </Row>
            <Row style={{ display: "flex", justifyContent: "right" }}>
              <Button variant="dark" className="saveBtn">
                Save
              </Button>
            </Row>
          </div>
          {/* \/ for testing list as JSON */}
          {/* <div style={{ marginTop: 20, color: "white" }}>
            {JSON.stringify(inputList)}
          </div> */}
        </Container>
      </div>
    </>
  );
}

export default NewListPage;
