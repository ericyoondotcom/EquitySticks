import React from "react";
import path from "path";
import PropTypes from "prop-types";
const electron = window.require("electron"); //https://github.com/electron/electron/issues/7300
const remote = electron.remote;
const fs = remote.require("fs");

const { Provider, Consumer } = React.createContext();

class DataProvider extends React.Component {
	constructor(props){
		super(props);
		const userDataPath = (electron.app || electron.remote.app).getPath("userData");
		this.path = path.join(userDataPath, "equitysticks_userdat.json");
		
		try {
			const file = fs.readFileSync(this.path);
			this.state = JSON.parse(file);
			this.state.currentClass = null;
		} catch(e) {
			console.error(e);
			this.state = {
				currentClass: null,
				classes: {},
				preferences: {
					idIncrementor: 2,
					maxTallies: 3
				}
			};
		}
	}

	changeClass = (newClass, callback) => {
		this.setState({currentClass: newClass}, callback);
	}
	editClass = (id, data, callback) => {
		//also useable to add class
		const newClasses = Object.assign(this.state.classes);
		newClasses[id] = data;
		this.setState({classes: newClasses}, callback);
		this.saveData();
	}
	editPrefs = (prefId, newData) => {
		const newPrefs = Object.assign(this.state.preferences);
		newPrefs[prefId] = newData;
		this.setState({preferences: newPrefs});
		this.saveData();
	}

	deleteClass = (id) => {
		const newClasses = Object.assign(this.state.classes);
		delete newClasses[id];
		this.setState({classes: newClasses});
		this.saveData();
	}

	saveData = () => {
		fs.writeFile(this.path, JSON.stringify({
			classes: this.state.classes,
			preferences: this.state.preferences
		}), () => {
			console.log("Data save success!");
		});
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
					editPrefs: this.editPrefs,
					deleteClass: this.deleteClass
				}}
			>
				{this.props.children}
			</Provider>
		);
	}
}

DataProvider.propTypes = {
	children: PropTypes.object
};

export default {DataProvider, Consumer};