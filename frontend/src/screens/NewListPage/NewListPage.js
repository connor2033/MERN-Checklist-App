import {
  Container,
  Row,
  Button,
  Col,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";
import "./NewListPage.css";
import { useState } from "react";

function NewListPage() {
  const [inputList, setInputList] = useState([
    { itemType: "check", itemName: "" },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    if (inputList.length > 1) {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    }
  };

  //add Heading object to list
  const handleAddHeadingClick = (index) => {
    if (inputList[index].itemType !== "heading") {
      const listStart = [...inputList.splice(index, inputList.length)];
      const listEnd = [...inputList.splice(0, index)];
      setInputList([
        ...listEnd,
        { itemType: "heading", itemName: "" },
        ...listStart,
      ]);
    }
  };

  // handle click event of the Add button with index
  const handleAddClick = (index) => {
    const listStart = [...inputList.splice(index + 1, inputList.length)];
    const listEnd = [...inputList.splice(0, index + 1)];
    setInputList([
      ...listEnd,
      { itemType: "check", itemName: "" },
      ...listStart,
    ]);
  };

  // handle keyDown event for add
  const handleAddKey = (event, index) => {
    if (event.key === "Enter") {
      handleAddClick(index);
    }
  };

  // send focus to specified id on Enter
  const handleFocus = (event, id) => {
    if (event.key === "Enter") {
      document.getElementById(id.toString()).focus();
    }
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
                maxlength="48"
                autocomplete="off"
                autoFocus="autofocus"
                className="listNameBox"
                id="titleBox"
                onKeyUp={(e) => {
                  handleFocus(e, "detailBox");
                }}
              ></input>
              <hr />
            </Row>
            {/* Details */}
            <Row>
              <input
                type="text"
                placeholder="Details..."
                maxlength="240"
                autocomplete="off"
                className="listDetailsBox"
                id="detailBox"
                onKeyUp={(e) => {
                  handleFocus(e, 0);
                }}
              ></input>
            </Row>
            {/* Item Row */}
            <div className="scrollBox" id="scrollBox">
              {inputList.map((x, i) => {
                // HEADING
                if (x.itemType === "heading") {
                  return (
                    <Row style={{ marginLeft: "0px", width: "100%" }}>
                      <Col className="newHeadingShell">
                        <input
                          name="itemName"
                          value={x.itemName}
                          onChange={(e) => handleInputChange(e, i)}
                          id={i}
                          type="text"
                          placeholder="Add a subheading..."
                          maxlength="48"
                          autocomplete="off"
                          className="inputBox"
                          onKeyDown={(e) => {
                            handleAddKey(e, i);
                          }}
                          onKeyUp={(e) => {
                            handleFocus(e, i + 1);
                          }}
                        ></input>
                        <hr style={{ width: "70%" }} />
                      </Col>
                      <Col>
                        <Dropdown as={ButtonGroup} style={{ marginTop: "5px" }}>
                          <Button
                            variant="success"
                            onClick={() => handleAddClick(i)}
                          >
                            +
                          </Button>

                          <Dropdown.Toggle></Dropdown.Toggle>

                          <Dropdown.Menu align="end">
                            <Dropdown.Item
                              onClick={() => handleAddHeadingClick(i)}
                            >
                              Add Subheading
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleRemoveClick(i)}>
                              Remove
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                    </Row>
                  );
                }

                // CHECKLIST ITEM
                return (
                  <Row style={{ marginLeft: "0px", width: "100%" }}>
                    <Col className="newItemshell">
                      <input
                        name="itemName"
                        value={x.itemName}
                        onChange={(e) => handleInputChange(e, i)}
                        id={i}
                        type="text"
                        placeholder="Add an item..."
                        maxlength="90"
                        autocomplete="off"
                        className="inputBox"
                        onKeyDown={(e) => {
                          handleAddKey(e, i);
                        }}
                        onKeyUp={(e) => {
                          handleFocus(e, i + 1);
                        }}
                      ></input>
                    </Col>
                    <Col>
                      <Dropdown as={ButtonGroup} style={{ marginTop: "5px" }}>
                        <Button
                          variant="success"
                          onClick={() => handleAddClick(i)}
                        >
                          +
                        </Button>

                        <Dropdown.Toggle></Dropdown.Toggle>

                        <Dropdown.Menu align="end">
                          <Dropdown.Item
                            onClick={() => handleAddHeadingClick(i)}
                          >
                            Add Subheading
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleRemoveClick(i)}>
                            Remove
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                );
              })}
            </div>
            <Row style={{ display: "flex", justifyContent: "right" }}>
              {/* Temp href to /preview */}
              <Button variant="dark" className="saveBtn" href="/preview">
                Create
              </Button>
            </Row>
          </div>
          {/* \/ for testing list as JSON */}
          {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
        </Container>
      </div>
    </>
  );
}

export default NewListPage;
