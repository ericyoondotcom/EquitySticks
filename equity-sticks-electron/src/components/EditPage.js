import React from "react";
import propTypes from "prop-types";
import { Button, Header } from "semantic-ui-react";
import Navbar from "./Navbar";
import Routes from "./routes";
import UploadInstructions from "./UploadInstructions";
import DataProvider from "./DataProvider";

class EditPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return (
            <div>
                <Navbar activeItem={Routes.edit} />
                <DataProvider.Consumer>
                    {
                        dataCtx => {
                            const {classId, classData, globalData, changeData} = dataCtx;
                            return (
                                <div>
                                    <Header className="title">Edit {classData.displayName}</Header>
                                    <UploadInstructions trigger={
                                        <Button labelPosition="left" icon="upload" primary content="Import Data" />
                                    } />
                                    <p>Insert UI here. Just make the UI components, I will make everything functional once you're done. It should show every student and have fields to edit student name</p>
                                </div>
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