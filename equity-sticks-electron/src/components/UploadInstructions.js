import React from "react";
import PropTypes from "prop-types";
import { Header, Modal } from "semantic-ui-react";
import UploadClassButton from "./UploadClassButton";

class UploadInstructions extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return (
            <Modal trigger={this.props.trigger}>
                <Header className="title">Import Class</Header>
                <p>This will be a 3-step modal detailling how to export a file from Didax, ending in the following button:</p>
                <UploadClassButton classId={this.props.classId} />
            </Modal>
        );
    }
}

UploadInstructions.propTypes = {
    classId: PropTypes.string,
    trigger: PropTypes.element
};

export default UploadInstructions;