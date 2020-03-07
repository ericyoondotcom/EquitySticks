import React from "react";
import propTypes from "prop-types";
import { Button, Header, Container, Form, Input, List, Icon } from "semantic-ui-react";
import Navbar from "./Navbar";
import Routes from "./routes";
import UploadInstructions from "./UploadInstructions";
import DataProvider from "./DataProvider";

class EditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar activeItem={Routes.edit} />
        <DataProvider.Consumer>
          {
            dataCtx => {
              const { classId, classData, globalData, changeData } = dataCtx;
              return (
                <Container>
                  <Header className="mt-md" as="h1">Edit Class</Header>

                  <Header
                    as='h3'
                    content={classData.displayName}
                    subheader='Period 7 • 16 students'
                  />

                  <UploadInstructions trigger={
                    <Button labelPosition="left" icon="upload" primary content="Import Data" />
                  } />

                  <Header as="h2" className="mt-lg">Students </Header>

                  <List as="ol">
                    <List.Item as="li">
                      {/* <Input value="Eric Yoon" className="mt-md" fluid placeholder='Student Name' />
                      <Input value="Eric Yoon" className="mt-md" fluid placeholder='Student Name' /> */}

                      <Form>
                        <Form.Group widths='equal'>
                          <Form.Input
                            fluid
                            id='form-subcomponent-shorthand-input-first-name'
                            value="Eric"
                          />
                          <Form.Input
                            fluid
                            id='form-subcomponent-shorthand-input-last-name'
                            value='Yoon'
                          />
                        </Form.Group>
                      </Form>
                    </List.Item>
                  </List>

                  <div className="mt-lg">
                    <Button icon className="mr-md">Add student <Icon name="plus"></Icon></Button>
                    <Button color="green" basic icon>Save changes <Icon name="check"></Icon></Button> (add "loading" attribute when saving changes)
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

EditPage.propTypes = {
};

export default EditPage;