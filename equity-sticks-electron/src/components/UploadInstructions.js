import React from "react";
import PropTypes from "prop-types";
import { Header, Modal, Embed } from "semantic-ui-react";
import UploadClassButton from "./UploadClassButton";

class UploadInstructions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Modal trigger={this.props.trigger}>
				<Header className="title">Import Class</Header>
				<div className="p-md">
					<Header as="h1">Upload Data Tutorial</Header>
					<Embed
						id='125292332'
						placeholder='https://cdn.wpdownloadmanager.com/wp-content/uploads/2016/01/maximum-file-upload-size.png'
						// ^^^ image for thumbnail
						source='vimeo'
					/>
					{/* <p>This will be a 3-step modal detailling how to export a file from Didax, ending in the following button:</p> */}
					<div className="mt-md">
						<UploadClassButton classId={this.props.classId} />
					</div>
				</div>
			</Modal>
		);
	}
}

UploadInstructions.propTypes = {
	classId: PropTypes.string,
	trigger: PropTypes.element
};

export default UploadInstructions;