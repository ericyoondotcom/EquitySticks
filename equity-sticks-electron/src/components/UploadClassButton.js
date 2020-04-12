import React from "react";
import propTypes from "prop-types";
import { Button, Segment, Header, Icon } from "semantic-ui-react";
import DataProvider from "./DataProvider";
const electron = window.require("electron"); //https://github.com/electron/electron/issues/7300
const remote = electron.remote;
const fs = remote.require("fs");


class UploadClassButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fileIncoming: false,
			loading: false
		};
	}

	onUploadClicked = async (dataCtx) => {
		const res = await remote.dialog.showOpenDialog({
			properties: ["openFile"],
			buttonLabel: "Import File",
			title: "Select Exported File",
			filters: [
				{ name: "Text Files", extensions: ["txt"] }
			]
		});
		if (res.canceled || res.filePaths < 1) return;
		const file = res.filePaths[0];
		this.handleFileChosen(file, dataCtx);
	}

	handleFileChosen = (filePath, dataCtx) => {
		this.setState({ loading: true });
		
		const {currentClass, classes, editClass } = dataCtx;
		if(currentClass == null || !(currentClass in classes)){
			return;
		}
		const classData = classes[currentClass];
		
		try {
			const file = fs.readFileSync(filePath, "utf8");
			const lines = file.split("\n");
			let students = [];
			for(let i = 1; i < lines.length; i++) {
				const line = lines[i];
				if(line.length == 0) continue;
				const tabSplit = line.split("\t");
				if(tabSplit.length < 1) continue;
				let nameBlock = tabSplit[0].trim();
				nameBlock = nameBlock.replace("*", "");
				const firstlast = nameBlock.split(",");
				if(firstlast.length < 2) continue;
				const last = firstlast[0].trim();
				const first = firstlast[1].trim().split(" ")[0]; // Scrub middle names by splitting on a space
				students.push({
					firstName: first,
					lastName: last,
					tallies: 0
				});
			}
			
			const newData = classData;
			newData.students = newData.students.concat(students);
			console.log(newData.students);
			editClass(currentClass, newData, () => {
				this.setState({ loading: false });
				this.props.onUploadFinished();
			});
		} catch (e) {
			console.error(e);
			this.setState({ loading: false });
		}
	}

	render() {
		return (
			<DataProvider.Consumer>
				{
					dataCtx => (
						<Segment inverted={this.state.fileIncoming} loading={this.state.loading} placeholder onDragOver={(e) => {
							e.preventDefault();
							this.setState({ fileIncoming: true });
						}} onDragLeave={(e) => {
							e.preventDefault();
							this.setState({ fileIncoming: false });
						}} onDrop={(e) => {
							this.setState({ fileIncoming: false });
							if (e.dataTransfer.files.length < 1) return;
							const file = e.dataTransfer.files[0];
							this.handleFileChosen(file.path, dataCtx);
						}}>
							<Header icon>
								<Icon name='file alternate outline' />
								Drag And Drop File Here
							</Header>
							<Button primary labelPosition="left" icon="folder open" content="Choose File" onClick={() => {
								this.onUploadClicked(dataCtx);
							}} />
						</Segment>
					)
				}
			</DataProvider.Consumer>
		);
	}
}

UploadClassButton.propTypes = {
	classId: propTypes.string,
	onUploadFinished: propTypes.func
};

export default UploadClassButton;