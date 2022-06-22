import { Container, Row, Button, ButtonGroup, Dropdown } from "react-bootstrap";
import "./EditListPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditListPage() {
  let { id } = useParams();

  const [checklist, setChecklist] = useState({
    title: "",
    details: "",
    listItems: [{ itemType: "checklistItem", itemName: "", isChecked: false }],
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

  const putChecklist = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(checklist);

    const { data } = await axios.put("/api/checklist/" + id, checklist, config);
    console.log(data);
    window.location.href = "/list/" + id;
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
        <Container className="editListCard">
          <div>
            {/* List Name */}
            <Row>
              <input
                type="text"
                value={checklist.title}
                placeholder="List Name"
                maxLength="48"
                autoComplete="off"
                autoFocus="autofocus"
                className="editListName"
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
                value={checklist.details}
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
                    <div className="itemRow" key={index}>
                      <div className="editHeadingBlock">
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
                        <hr className="editHeadingUnderline" />
                      </div>
                      <div className="editButtonBlock">
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
                      </div>
                    </div>
                  );
                }

                // CHECKLIST ITEM
                return (
                  <div className="itemRow" key={index}>
                    <div className="editItemBlock">
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
                    <div className="editButtonBlock">
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
                    </div>
                  </div>
                );
              })}
            </div>
            <Row style={{ display: "flex", justifyContent: "right" }}>
              {/* Temp href to /preview */}
              <Button
                variant="dark"
                className="saveBtn"
                onClick={() => putChecklist()}
              >
                Save Changes
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

export default EditListPage;
