import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import "./AddItem.css";

export const AddItem = () => {
  return (
    <Row>
      <Col className="shell">
        <input
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
        >
          -
        </Button>
        <Button className="addRemoveBtn" variant="success">
          +
        </Button>
      </Col>
    </Row>
  );
};
