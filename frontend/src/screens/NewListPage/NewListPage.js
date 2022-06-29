import { Container, Row, Button, ButtonGroup, Dropdown } from "react-bootstrap";
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
    var emptyList = true;

    for (var i = 0; i < checklist.listItems.length; i++) {
      if (checklist.listItems[i].itemName.length > 0) {
        emptyList = false;
      }
    }

    if (checklist.title === "" || emptyList) {
      window.alert("List Name and Items can not be left empty.");
      return;
    }

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
    window.location.href = "/list/" + data._id;
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
      if (index === checklist.listItems.length - 1) {
        handleAddClick(index);
      } else if (checklist.listItems[index + 1].itemName !== "") {
        handleAddClick(index);
      }
    }
  };

  // send focus to specified id on Enter
  const handleFocus = (event, id) => {
    if (event.key === "Enter" || event.key === "ArrowDown") {
      if (id < checklist.listItems.length || id === "detailBox")
        document.getElementById(id.toString()).focus();
    } else if (event.key === "ArrowUp") {
      if (id - 1 > 0) document.getElementById((id - 2).toString()).focus();
      else if (id === 1) document.getElementById("detailBox").focus();
      else if (id === 0) document.getElementById("titleBox").focus();
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
                placeholder="New List Name"
                maxLength="48"
                autoComplete="off"
                autoFocus="autofocus"
                className="newListName"
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
                placeholder="Description..."
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
                    <div className="itemRow" key={index}>
                      <div className="newHeadingBlock">
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
                        <hr className="headingUnderline" />
                      </div>
                      <div className="buttonBlock">
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
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  );
                }

                // CHECKLIST ITEM
                return (
                  <div className="itemRow" key={index}>
                    <div className="newItemBlock">
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
                    </div>
                    <div className="buttonBlock">
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
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                );
              })}
            </div>
            <Row style={{ display: "flex", justifyContent: "right" }}>
              <Button
                variant="success"
                className="saveBtn"
                onClick={() => postChecklist()}
              >
                Create
              </Button>
            </Row>
          </div>
          {/* \/ for debugging */}
          {/* <pre style={{ marginTop: 20 }}>
            {JSON.stringify(checklist, null, 4)}
          </pre> */}
        </Container>
      </div>
    </>
  );
}

export default NewListPage;
