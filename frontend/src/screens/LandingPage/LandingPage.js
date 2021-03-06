import React from "react";
import "./LandingPage.css";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="main">
      <Container>
        <Row className="createButtonDiv">
          <Button variant="success" size="lg" className="m-auto createButton">
            <Link to="/newlist">Create a List</Link>
          </Button>
        </Row>
        <Row>
          <div className="taglineText">Create, Share, and Collaborate</div>
        </Row>
        <Row>
          <div className="descText">
            With Checkable you can <b>Create</b> custom checklists, <b>Share</b>{" "}
            templates with large groups,
            <b> Collaborate</b> with peers on personal lists, or keep it
            private.
          </div>
        </Row>
        <Row>
          <div className="contactText">
            If you'd like to get in contact with me or find more of my work, my
            website is{" "}
            <a
              href="https://connorhaines.net"
              rel="noreferrer"
              target="_blank"
              className="personalLink"
            >
              ConnorHaines.net
            </a>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
