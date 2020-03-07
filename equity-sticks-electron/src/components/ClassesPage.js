import React from "react";
import propTypes from "prop-types";
import { Header, Button, Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import Routes from "./routes";
import DataProvider from "./DataProvider";

class ClassesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar activeItem={Routes.classes} />
        <DataProvider.Consumer>
          {
            dataCtx => {
              const { classId, classData, globalData, changeData } = dataCtx;
              return (
                <Container>
                  <Header className="title mt-md" as="h1">My Classes</Header>

                  <Button fluid>
                    <Header
                      as='h3'
                      content='Biology Honors'
                      subheader='Period 7 • 16 students'
                    />
                  </Button>
                </Container>
              );
            }
          }
        </DataProvider.Consumer>
      </div>
    );
  }
}

ClassesPage.propTypes = {

};

export default ClassesPage;