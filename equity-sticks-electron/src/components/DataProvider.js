import React from "react";
import objectPath from "object-path";

const { Provider, Consumer } = React.createContext();

class DataProvider extends React.Component {
	state = {
		currentClass: null,
		classes: {
			"1-4ugi578gj4e86thf74": {
				displayName: "Defense Against the Dark Arts: Period 2",
				color: "olive",
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
					},
					{
						"firstName": "Johnny",
						"lastName": "Teststudent",
						"tallies": 3
					}
				]
			}
		},
		preferences: {
			idIncrementor: 2,
			maxTallies: 3
		}
	};

	changeClass = (newClass, callback) => {
		this.setState({currentClass: newClass}, callback);
	}
	editClass = (id, data, callback) => {
		//also useable to add class
		const newClasses = Object.assign(this.state.classes);
		newClasses[id] = data;
		this.setState({classes: newClasses}, callback);
	}
	editPrefs = (prefId, newData) => {
		const newPrefs = Object.assign(this.state.preferences);
		newPrefs[prefId] = newData;
		this.setState({preferences: newPrefs});
	}

	render() {
		return (
			<Provider
				value={{
					currentClass: this.state.currentClass,
					classes: this.state.classes,
					preferences: this.state.preferences,
					changeClass: this.changeClass,
					editClass: this.editClass,
					editPrefs: this.editPrefs
				}}
			>
				{this.props.children}
			</Provider>
		);
	}
}

export default {DataProvider, Consumer};