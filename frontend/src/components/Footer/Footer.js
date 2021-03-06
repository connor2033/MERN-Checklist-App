import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: -1,
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3" style={{ color: "#dedede" }}>
            <a href="https://ConnorHaines.net" target="_blank" rel="noreferrer">
              Created by Connor Haines
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
