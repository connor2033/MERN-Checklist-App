import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "../../components/AddItem/AddItem.css";

function ListPreviewPage() {
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
    <div>
      <h3>Test Form</h3>
      <Row>
        {inputList.map((x, i) => {
          return (
            <Col className="shell">
              <input
                name="itemName"
                value={x.itemName}
                onChange={(e) => handleInputChange(e, i)}
              />
              <Col>
                <button onClick={() => handleRemoveClick(i)}>Remove</button>
                <button onClick={() => handleAddClick(i)}>Add</button>
              </Col>
            </Col>
          );
        })}
      </Row>
      <button
        onClick={() => handleAddClick(inputList.length)}
        style={{ marginTop: 20 }}
      >
        Add
      </button>
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
    </div>
  );
}

export default ListPreviewPage;
