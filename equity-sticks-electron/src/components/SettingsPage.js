import React from "react";
import propTypes from "prop-types";
import { Button, Header, Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import Routes from "./routes";
import DataProvider from "./DataProvider";

class SettingsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<div>
				<Navbar activeItem={Routes.settings} />
				<DataProvider.Consumer>
					{
						dataCtx => {
							const {currentClass, classes, preferences, editClass } = dataCtx;
							return (
								<Container>
									<Header className="mt-md" as="h1">My Settings</Header>
									<p>Not implemented!</p>
									<p>On this page you would change global settings such as max tallies, etc</p>
								</Container>
							);
						}
					}
				</DataProvider.Consumer>
			</div>
		);
	}
}

SettingsPage.propTypes = {
};

export default SettingsPage;