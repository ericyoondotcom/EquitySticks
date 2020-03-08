import React from "react";
import propTypes from "prop-types";
import { Button, Header, Container, Icon, Rating, Label, Table } from "semantic-ui-react";
import {Link} from "react-router-dom";
import DataProvider from "./DataProvider";
import Navbar from "./Navbar";
import Routes from "./routes";

export default class TallyPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	setTally = (n, student, dataCtx) => {
		const newData = Object.assign(dataCtx.classes[dataCtx.currentClass]);
		newData.students[student].tallies = n;
		dataCtx.editClass(dataCtx.currentClass, newData);
	}

	renderTallies = (student, dataCtx) => {
		const currentClass = dataCtx.classes[dataCtx.currentClass];
		let tallies = [];
		for (let i = 0; i < dataCtx.preferences.maxTallies; i++) {
			const punchedIn = i < currentClass.students[student].tallies;
			const lastOnePunched = i == currentClass.students[student].tallies - 1;
			tallies.push(
				<Icon name={punchedIn ? "star" : "star outline"} color={currentClass.color} onClick={() => {
					this.setTally(lastOnePunched ? i : i + 1, student, dataCtx);
				}} />
			);
		}
		return (
			<span style={{fontSize: "20px"}}>{tallies}</span>
		);
	}

	render() {

		return (
			<div>
				<Navbar activeItem={Routes.tally} />
				<DataProvider.Consumer>
					{
						dataCtx => {
							const {currentClass, classes, preferences, editClass } = dataCtx;
							if(!(currentClass in classes) || currentClass == null){
								window.location.href = "/#" + Routes.classes;
							}
							const classData = classes[currentClass];

							return (
								<Container>
									<Header
										className="mt-md"
										as="h1"
										content={classData.displayName}
										subheader={classData.students.length + " student" + (classData.students.length == 1 ? "" : "s")}
									/>
									<Button labelPosition="left" icon="refresh" content="Reset All" color={classData.color} onClick={() => {
										for(let i in classData.students){
											this.setTally(0, i, dataCtx);
										}
									}} />
									<Link to={Routes.edit}>
										<Button labelPosition="left" icon="edit" content="Edit Class" />
									</Link>
									<Table celled unstackable>
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell>Student</Table.HeaderCell>
												<Table.HeaderCell>Tally</Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{
												classData.students.map((student, i) => {
													return (
														<Table.Row key={"student-" + i}>
															<Table.Cell>
																<Button icon compact className="mr-md" color={classData.color} circular inverted={student.tallies !== 0} disabled={student.tallies == preferences.maxTallies} onClick={() => {
																	this.setTally(student.tallies + 1, i, dataCtx);
																}}>
																	<Icon name="plus" />
																</Button>
																<span className="ui header mr-md" basic primary compact>{student.lastName}, {student.firstName}</span>
															</Table.Cell>
															<Table.Cell>
																{
																	this.renderTallies(i, dataCtx)
																}
															</Table.Cell>
														</Table.Row>
													);
												})
											}
										</Table.Body>
									</Table>
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