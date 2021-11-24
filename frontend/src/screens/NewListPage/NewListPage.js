import { Container, Row, Button } from "react-bootstrap";
import "./NewListPage.css";
import { AddItem } from "../../components/AddItem/AddItem";

function NewListPage() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Container className="newListCard">
          <form>
            <Row>
              <input
                type="text"
                placeholder="List Name"
                autoFocus="autofocus"
                className="listNameBox"
              ></input>
              <hr />
            </Row>
            <Row>
              <input
                type="text"
                placeholder="Details..."
                className="listDetailsBox"
              ></input>
            </Row>
            <AddItem />
            <Row style={{ display: "flex", justifyContent: "right" }}>
              <Button variant="dark" className="saveBtn">
                Save
              </Button>
            </Row>
          </form>
        </Container>
      </div>
    </>
  );
}

export default NewListPage;
