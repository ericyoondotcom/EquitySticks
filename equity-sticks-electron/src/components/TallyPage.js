import React from "react";
import propTypes from "prop-types";
import { Button, Header, Container, Icon, Rating, Label } from "semantic-ui-react";

import DataProvider from "./DataProvider";
import Navbar from "./Navbar";
import Routes from "./routes";

export default class TallyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar activeItem={Routes.tally} />
        <DataProvider.Consumer>
          {
            dataCtx => {
              const { classId, classData, globalData, changeData } = dataCtx;
              return (
                <Container>
                  <Header
                    className="mt-md"
                    as='h1'
                    content={classData.displayName}
                    subheader='Period 7 • 16 students'
                  />
                  <Button basic compact icon labelPosition="left">
                    <Icon name='edit' /> Edit Class
                  </Button>
                  <div class="mt-lg">
                    {
                      classData.students.map((student) => {
                        return (
                          <div className="mt-md">
                            <Button icon compact className="mr-md">
                              <Icon name='plus' />
                            </Button>
                            <span className="ui header mr-md" basic primary compact>{student.lastName}, {student.firstName}</span>
                            <Rating maxRating={3} defaultRating={student.tallies} icon='edit' size="large" />
                          </div>
                        );
                      })
                    }
                  </div>
                </Container>
              );
            }
          }
        </DataProvider.Consumer>
      </div>
    );
  }
}

// TallyPage.propTypes = {
// };

// export default TallyPage;