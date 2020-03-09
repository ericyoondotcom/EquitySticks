import React from "react";
import propTypes from "prop-types";
import { Button } from "semantic-ui-react";

class UploadClassButton extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}
	
	onUploadClicked = () => {
		alert("Not implemented!");
	}

	render(){
		return (
			<div>
				<Button primary labelPosition="left" icon="upload" content="Upload File" onClick={this.onUploadClicked} />
			</div>
		);
	}
}

UploadClassButton.propTypes = {
	classId: propTypes.string
};

export default UploadClassButton;