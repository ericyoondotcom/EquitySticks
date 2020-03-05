import React from "react";
import propTypes from "prop-types";
import { Button, Header } from "semantic-ui-react";

import DataProvider from "./DataProvider";
import Navbar from "./Navbar";
import Routes from "./routes";

export default class TallyPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return (
            <div>
                <Navbar activeItem={Routes.tally} />
                <DataProvider.Consumer>
                    {
                        dataCtx => {
                            const {classId, classData, globalData, changeData} = dataCtx;
                            return (
                                <div>
                                    <Header className="title">{classData.displayName}</Header>
                                    {
                                        classData.students.map((student) => {
                                            return (
                                                <div>
                                                    <p>{student.lastName}, {student.firstName}: {student.tallies}</p>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
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