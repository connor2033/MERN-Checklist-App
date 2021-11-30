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
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3" style={{ color: "#dedede" }}>
            <a href="http://ConnorHaines.net" target="_blank" rel="noreferrer">
              Connor Haines
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
