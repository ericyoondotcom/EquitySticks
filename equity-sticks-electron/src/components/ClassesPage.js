import React from "react";
import propTypes from "prop-types";
import { Header } from "semantic-ui-react";
import Navbar from "./Navbar";
import Routes from "./routes";
import DataProvider from "./DataProvider";

class ClassesPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return (
            <div>
                <Navbar activeItem={Routes.classes} />
                <DataProvider.Consumer>
                    {
                        dataCtx => {
                            const {classId, classData, globalData, changeData} = dataCtx;
                            return (
                                <div>
                                    <Header className="title">My Classes</Header>
                                    <p>Insert UI here. It should show you all of your classes and you can click on one to select it. I will do the javascript you just do the UI</p>
                                </div>
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