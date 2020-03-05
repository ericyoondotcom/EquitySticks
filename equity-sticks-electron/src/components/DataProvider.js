import React from "react";

const { Provider, Consumer } = React.createContext();

class DataProvider extends React.Component {
    state = {
        classId: "abc123",
        classData: {
            displayName: "Defense Against the Dark Arts: Period 2",
            students: [
                {
                    "firstName": "Timmothy",
                    "lastName": "Westlake",
                    "tallies": 0
                },
                {
                    "firstName": "Jimmothy",
                    "lastName": "Harvard",
                    "tallies": 1
                }
            ]
        },
        globalData: {
            "maxTallies": 3
        }
    };

    changeData = () => {
        alert("Not implemented!");
    }

    render() {
        return (
            <Provider
                value={{
                    classId: this.state.classId,
                    classData: this.state.classData,
                    globalData: this.state.globalData,
                    changeData: this.changeData
                }}
            >
                {this.props.children}
            </Provider>
        );
    }
}

export default {DataProvider, Consumer};