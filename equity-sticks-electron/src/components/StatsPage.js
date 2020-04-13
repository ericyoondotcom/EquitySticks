import React from "react";
import moment from "moment";
import { Button, Header, Container, Popup, Table, Message, Icon, Label, Segment } from "semantic-ui-react";
import {Link} from "react-router-dom";
import DataProvider from "./DataProvider";
import Navbar from "./Navbar";
import Routes from "./routes";

const electron = window.require("electron");
const remote = electron.remote;
const fs = remote.require("fs");

export default class StatsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayAsNumbers: false
		};
	}

	exportData = (history, classData) => {
		if(history == undefined || history.length == 0){
			return;
		}
		let str = `Student`;

		for(const i of history) {
			str += `,${moment(i.timestamp).format("MM/DD/Y hh:mm A")}`;
		}
		str += "\n";
		
		for(const student of classData.students) {
			str += `"${student.lastName}, ${student.firstName}"`;
			for(const i of history) {
				const stu = i.students.find(s => s.firstName == student.firstName && s.lastName == student.lastName);
				if(stu === undefined){
					str += `,N/A`;
					continue;
				}
				str += `,${stu.tallies}`;
			}
			str += `\n`;
		}

		remote.dialog.showSaveDialog({
			title: "Save CSV to...",
			buttonLabel: "Save",
			defaultPath: `*/${classData.displayName} Data.csv`,
			properties: [
				"createDirectory"
			],
			filters: [
				{ name: "CSV", extensions: ["csv"] }
			]
		}).then((res) => {
			if(res.canceled) {
				return;
			}

			fs.writeFile(res.filePath, str, () => {
				console.log("Export success!");
			});
		});

	}

	render() {

		return (
			<div>
				<Navbar activeItem={Routes.stats} />
				<DataProvider.Consumer>
					{
						dataCtx => {
							const {currentClass, classes, preferences, editClass } = dataCtx;
							if(currentClass == null || !(currentClass in classes)){
								window.location.href = "#" + Routes.classes;
								return;
							}
							const classData = classes[currentClass];
							
							let history = classData.history;
							if(history != undefined && history.length > 0){
								history.sort((a, b) => a.timestamp - b.timestamp);
							}
							return (
								<Container>
									<Header className="mt-md" as="h1">Data & Statistics</Header>
									<Button labelPosition="left" icon="file excel outline" color={classData.color} content="Export" disabled={classData.history == undefined || classData.history.length == 0} onClick={() => {
										this.exportData(history, classData);
									}} />
									<Popup on="click" wide="very" trigger={
										<Button labelPosition="left" icon="trash alternate" negative content="Clear Data" disabled={classData.history == undefined || classData.history.length == 0} />
									} style={{textAlign: "center"}}>
										<div>
											<p><b>Are you sure?</b></p>
											<Button labelPosition="left" negative icon="check" content="Permanently Delete" onClick={() => {
												const newData = classData;
												newData.history = [];
												editClass(currentClass, newData);
											}} />
										</div>
									</Popup>
									<Header as="h3">History</Header>
									{
										history == undefined || history.length == 0 ? (
											<Message
												icon="lightbulb"
												header="Nothing to see here..."
												info
												content={
													<span>There is no data to show. Data gets added each time you click <b><Icon name="refresh" /> Reset All</b> in the Tally tab.</span>
												}
											/>
										) : 
										(
											<Container>
												<Container>
													<p style={{display: "inline"}}>Display as </p>
													<Button
														size="mini"
														inverted
														circular
														labelPosition="left"
														color={classData.color}
														icon={this.state.displayAsNumbers ? "hashtag" : "star"}
														content={this.state.displayAsNumbers ? "Numbers" : "Tallies"}
														style={{display: "inline", marginLeft: "5px"}} 
														onClick={() => {
															this.setState({displayAsNumbers: !this.state.displayAsNumbers});
														}}
													/>
												</Container>
												<Segment basic style={{overflowX: "auto"}}>
													<Table celled definition unstackable striped fixed>
														<Table.Header>
															<Table.Row>
																<Table.HeaderCell style={{width: "300px"}}>Student</Table.HeaderCell>
																{
																	history.map((i, idx) => {
																		return (
																			<Table.HeaderCell style={{width: "200px", position: "relative"}}>
																				{moment(i.timestamp).format("MMM D 'YY [at] hh:mma")}
																				<Popup position="top center" inverted on="hover" trigger={
																					<span style={{right: "5px", position: "absolute", margin: "auto"}}>
																						<Icon name="trash alternate" onClick={() => {
																							const newData = classData;
																							newData.history.splice(idx, 1);
																							editClass(currentClass, newData);
																						}} />
																					</span>
																				}>
																					Delete column
																				</Popup>
																				
																			</Table.HeaderCell>
																		);
																	})
																}
															</Table.Row>
														</Table.Header>
														<Table.Body>
															{
																classData.students.map((student, studentIdx) => {
																	return (
																		<Table.Row>
																			<Table.Cell style={{width: "300px"}}>{student.lastName}, {student.firstName}</Table.Cell>
																			{
																				history.map((i, idx) => {
																					const stu = i.students.find(s => s.firstName == student.firstName && s.lastName == student.lastName);
																					if(stu === undefined){
																						return (
																							<Table.cell style={{width: "200px"}}>
																								N/A
																							</Table.cell>
																						);
																					}
																					if(this.state.displayAsNumbers){
																						return (
																							<Table.Cell style={{width: "200px"}}>
																								{stu.tallies}
																							</Table.Cell>
																						);
																					}
																					let tallies = [];
																					for (let i = 0; i < dataCtx.preferences.maxTallies; i++) {
																						const punchedIn = i < stu.tallies;
																						tallies.push(
																							<Icon name={punchedIn ? "star" : "star outline"} color={classData.color}/>
																						);
																					}
																					return (
																						<Table.Cell style={{width: "200px"}}>
																							<span style={{fontSize: "20px"}}>{tallies}</span>
																						</Table.Cell>
																					);
																				})
																			}
																		</Table.Row>
																	);
																})
															}
														</Table.Body>
													</Table>
												</Segment>
											</Container>
										)
									}
								</Container>
							);
						}
					}
				</DataProvider.Consumer>
			</div>
		);
	}
}