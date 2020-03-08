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
		this.state = {
			studentsData: [],
			loading: false
		};
	}

	render() {
		return (
			<div>
				<Navbar activeItem={Routes.edit} />
				<DataProvider.Consumer>
					{
						dataCtx => {
							const {currentClass, classes, preferences, editClass } = dataCtx;
							if(currentClass == null || !(currentClass in classes)){
								window.location.href = "/#" + Routes.classes;
								return;
							}
							const classData = classes[currentClass];
							if(this.state.studentsData.length == 0){
								this.setState({studentsData: classData.students});
								return;
							} 
							return (
								<Container>
									<Header className="mt-md" as="h1">Edit Class</Header>

									<Header
										as="h2"
										content={classData.displayName}
										subheader={classData.students.length + " student" + (classData.students.length == 1 ? "" : "s")}
									/>

									<UploadInstructions trigger={
										<Button labelPosition="left" icon="upload" color={classData.color} content="Import Data" />
									} />
									<Button labelPosition="left" icon="pencil" content="Edit Name" />
									<Button labelPosition="left" icon="tint" content="Change Color" />

									<Header as="h2" className="mt-lg">Students</Header>

									<List as="ol">
										
										{
											this.state.studentsData.map((student, i) => {
												return (
													<List.Item as="li">
														<Form>
															<Form.Group widths="equal">
																<Form.Input
																	fluid
																	value={student.firstName}
																	onChange={(e, d) => {
																		const newData = this.state.studentsData;
																		newData[i].firstName = d.value;
																		this.setState({studentsData: newData});
																	}}
																/>
																<Form.Input
																	fluid
																	id="form-subcomponent-shorthand-input-last-name"
																	value={student.lastName}
																	onChange={(e, d) => {
																		const newData = this.state.studentsData;
																		newData[i].lastName = d.value;
																		this.setState({studentsData: newData});
																	}}
																/>
															</Form.Group>
														</Form>
													</List.Item>
												);
											})
										}
										
									</List>

									<div className="mt-lg">
										<Button icon="add" content="Add Student" color={classData.color} labelPosition="left" onClick={() => {
											const newData = this.state.studentsData;
											newData.push({
												"firstName": "Rick",
												"lastName": "Astley",
												"tallies": 0
											});
											this.setState({studentsData: newData});
										}} />
										<Button icon="save" content="Save Changes" positive labelPosition="left" loading={this.state.loading} disabled={this.state.loading} onClick={() => {
											this.setState({loading: true});
											const newData = Object.assign(classData);
											newData.students = this.state.studentsData;
											editClass(currentClass, newData, () => {
												this.setState({loading: false});
											});
										}} />
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