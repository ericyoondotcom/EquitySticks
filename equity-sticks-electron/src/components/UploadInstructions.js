import React from "react";
import PropTypes from "prop-types";
import { Header, Modal, Icon, List, Button } from "semantic-ui-react";
import UploadClassButton from "./UploadClassButton";

class UploadInstructions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}

	render() {
		return (
			<Modal open={this.state.open} onClose={() => {
				this.setState({open: false});
			}} trigger={
				<Button labelPosition="left" icon="upload" color={this.props.color} content="Import Data" onClick={() => {
					this.setState({open: true});
				}} />
			}>
				<Header className="title">Import Class</Header>
				<div className="p-lg">
					<Header as="h2" icon="file alternate outline" content="Step 1: Export Students File" />
					<List ordered>
						<List.Item>Click on <b>My Classes</b> under the <b>Faculty</b> tab.</List.Item>
						<List.Item>Double click on the <b>{this.props.classDisplayName}</b> class.</List.Item>
						<List.Item>Navigate to the <b>Students</b> tab.</List.Item>
						<List.Item>Right click on the list in an empty space.</List.Item>
						<List.Item>Select <b>Export List</b> <Icon name="chevron right" style={{display: "inline"}} /> <b>To Text File...</b></List.Item>
						<List.Item>Save the file to a convienent location, such as your Desktop.</List.Item>
						<List.Item>Drag and drop or select your file below.</List.Item>
					</List>
					<Header as="h2" icon="upload" content="Step 2: Upload" />
					<div className="mt-md">
						<UploadClassButton classId={this.props.classId} onUploadFinished={
							() => {
								this.setState({open: false});
								this.props.onUploadFinished();
							}
						} />
					</div>
				</div>
			</Modal>
		);
	}
}

UploadInstructions.propTypes = {
	classId: PropTypes.string,
	classDisplayName: PropTypes.string,
	color: PropTypes.string,
	onUploadFinished: PropTypes.func
};

export default UploadInstructions;