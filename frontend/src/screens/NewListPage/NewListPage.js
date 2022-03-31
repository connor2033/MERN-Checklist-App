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
import axios from "axios";

function NewListPage() {
  const [checklist, setChecklist] = useState({
    title: "",
    details: "",
    listItems: [{ itemType: "checklistItem", itemName: "", isChecked: false }],
  });

  const postChecklist = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/checklist/create",
      checklist,
      config
    );

    console.log(data);
    window.location.href = "/preview/" + data._id;
  };

  // handle input change
  const handleTopInputChange = (e, field) => {
    const { value } = e.target;
    const newChecklist = {
      title: checklist.title,
      details: checklist.details,
      listItems: [...checklist.listItems],
    };

    if (field === "title") {
      newChecklist.title = value;
    } else if (field === "details") {
      newChecklist.details = value;
    }

    setChecklist(newChecklist);
  };

  // handle list input change
  const handleListInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...checklist.listItems];
    list[index][name] = value;

    const newChecklist = {
      title: checklist.title,
      details: checklist.details,
      listItems: list,
    };

    setChecklist(newChecklist);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    if (checklist.listItems.length > 1) {
      const list = [...checklist.listItems];
      list.splice(index, 1);

      const newChecklist = {
        title: checklist.title,
        details: checklist.details,
        listItems: list,
      };

      setChecklist(newChecklist);
    }
  };

  //add Heading object to list
  //Don't allow headings next to eachother
  const handleAddHeadingClick = (index) => {
    if (checklist.listItems[index].itemType !== "heading") {
      if (
        (index > 0 && checklist.listItems[index - 1].itemType !== "heading") ||
        index === 0
      ) {
        const listStart = [
          ...checklist.listItems.splice(index, checklist.listItems.length),
        ];
        const listEnd = [...checklist.listItems.splice(0, index)];

        const newChecklist = {
          title: checklist.title,
          details: checklist.details,
          listItems: [
            ...listEnd,
            { itemType: "heading", itemName: "", isChecked: false },
            ...listStart,
          ],
        };

        setChecklist(newChecklist);
      }
    }
  };

  // handle click event of the Add button with index
  const handleAddClick = (index) => {
    const listStart = [
      ...checklist.listItems.splice(index + 1, checklist.listItems.length),
    ];
    const listEnd = [...checklist.listItems.splice(0, index + 1)];

    const newChecklist = {
      title: checklist.title,
      details: checklist.details,
      listItems: [
        ...listEnd,
        { itemType: "checklistItem", itemName: "", isChecked: false },
        ...listStart,
      ],
    };

    setChecklist(newChecklist);
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
                maxLength="48"
                autoComplete="off"
                autoFocus="autofocus"
                className="listNameBox"
                id="titleBox"
                onKeyUp={(e) => {
                  handleFocus(e, "detailBox");
                }}
                onChange={(e) => handleTopInputChange(e, "title")}
              ></input>
              <hr />
            </Row>
            {/* Details */}
            <Row>
              <input
                type="text"
                placeholder="Details..."
                maxLength="240"
                autoComplete="off"
                className="listDetailsBox"
                id="detailBox"
                onKeyUp={(e) => {
                  handleFocus(e, 0);
                }}
                onChange={(e) => handleTopInputChange(e, "details")}
              ></input>
            </Row>
            {/* Item Row */}
            <div className="scrollBox" id="scrollBox">
              {checklist.listItems.map((item, index) => {
                // HEADING
                if (item.itemType === "heading") {
                  return (
                    <Row
                      style={{ marginLeft: "0px", width: "100%" }}
                      key={index}
                    >
                      <Col className="newHeadingShell">
                        <input
                          name="itemName"
                          value={item.itemName}
                          onChange={(e) => handleListInputChange(e, index)}
                          id={index}
                          type="text"
                          placeholder="Add a subheading..."
                          maxLength="48"
                          autoComplete="off"
                          className="inputBox"
                          onKeyDown={(e) => {
                            handleAddKey(e, index);
                          }}
                          onKeyUp={(e) => {
                            handleFocus(e, index + 1);
                          }}
                        ></input>
                        <hr style={{ width: "70%" }} />
                      </Col>
                      <Col>
                        <Dropdown as={ButtonGroup} style={{ marginTop: "5px" }}>
                          <Button
                            variant="success"
                            onClick={() => handleAddClick(index)}
                          >
                            +
                          </Button>

                          <Dropdown.Toggle></Dropdown.Toggle>

                          <Dropdown.Menu align="end">
                            <Dropdown.Item
                              onClick={() => handleAddHeadingClick(index)}
                            >
                              Add Subheading
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleRemoveClick(index)}
                            >
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
                  <Row style={{ marginLeft: "0px", width: "100%" }} key={index}>
                    <Col className="newItemshell">
                      <input
                        name="itemName"
                        value={item.itemName}
                        onChange={(e) => handleListInputChange(e, index)}
                        id={index}
                        type="text"
                        placeholder="Add an item..."
                        maxLength="90"
                        autoComplete="off"
                        className="inputBox"
                        onKeyDown={(e) => {
                          handleAddKey(e, index);
                        }}
                        onKeyUp={(e) => {
                          handleFocus(e, index + 1);
                        }}
                      ></input>
                    </Col>
                    <Col>
                      <Dropdown as={ButtonGroup} style={{ marginTop: "5px" }}>
                        <Button
                          variant="success"
                          onClick={() => handleAddClick(index)}
                        >
                          +
                        </Button>

                        <Dropdown.Toggle></Dropdown.Toggle>

                        <Dropdown.Menu align="end">
                          <Dropdown.Item
                            onClick={() => handleAddHeadingClick(index)}
                          >
                            Add Subheading
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleRemoveClick(index)}
                          >
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
              <Button
                variant="dark"
                className="saveBtn"
                onClick={() => postChecklist()}
              >
                Create
              </Button>
            </Row>
          </div>
          {/* \/ for testing list as JSON */}
          {/* <div style={{ marginTop: 20 }}>{JSON.stringify(checklist)}</div> */}
        </Container>
      </div>
    </>
  );
}

export default NewListPage;
