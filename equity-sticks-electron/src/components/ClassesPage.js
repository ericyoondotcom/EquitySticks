import React from "react";
import propTypes from "prop-types";
import { Header, Button, Container, Label, Popup, Segment } from "semantic-ui-react";
import Navbar from "./Navbar";
import Routes from "./routes";
import DataProvider from "./DataProvider";
import {getRandomItem, rsuiColors} from "./const";

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
							const {currentClass, classes, preferences, changeClass, editClass, editPrefs } = dataCtx;

							return (
								<Container>
									<Header className="title mt-md" as="h1">My Classes</Header>
									{
										Object.keys(classes).map(classId => {
											const classData = classes[classId];
											return (
												<Button fluid color={classData.color} inverted={currentClass !== classId} style={{marginBottom: "10px"}} onClick={() => {
													changeClass(classId, () => {
														window.location.href = "/#" + Routes.tally;
													});
												}}>
													<Header
														as="h3"
														content={classData.displayName}
														subheader={classData.students.length + " student" + (classData.students.length == 1 ? "" : "s")}
													/>
												</Button>
											);
										})
									}
									<Segment basic textAlign="center">
										<Popup inverted position="top center" trigger={
											<Button icon="plus" circular positive size="huge" onClick={() => {
												const randomId = preferences.idIncrementor.toString() + Math.random().toString(36).substring(2, 15);
												editClass(randomId, {
													displayName: "My New Class " + preferences.idIncrementor,
													color: getRandomItem(rsuiColors),
													students: [
														{
															"firstName": "Eric",
															"lastName": "Yoon",
															"tallies": 0
														},
														{
															"firstName": "Aariz",
															"lastName": "Irfan",
															"tallies": 0
														}
													]
												});
												editPrefs("idIncrementor", preferences.idIncrementor + 1);
											}} />
										}>
											New class
										</Popup>
									</Segment>
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