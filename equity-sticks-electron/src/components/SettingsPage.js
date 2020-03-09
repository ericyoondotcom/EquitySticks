import React from "react";
import propTypes from "prop-types";
import { Button, Header, Container, Popup, Input } from "semantic-ui-react";
import Navbar from "./Navbar";
import Routes from "./routes";
import DataProvider from "./DataProvider";

class SettingsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newMaxTallies: null
		};
	}

	render() {
		return (
			<div>
				<Navbar activeItem={Routes.settings} />
				<DataProvider.Consumer>
					{
						dataCtx => {
							const { preferences, editPrefs } = dataCtx;

							return (
								<Container>
									<Header className="mt-md" as="h1">My Settings</Header>
									<Header as="h3">Max Tallies</Header>
									<Input value={this.state.newMaxTallies === null ? preferences.maxTallies : this.state.newMaxTallies} type="number" onChange={
										(e, d) => {
											this.setState({newMaxTallies: (d.value < 1) ? 1 : d.value});
										}
									} labelPosition="right" label={
										<Button positive icon="save" disabled={this.state.newMaxTallies === null || this.state.newMaxTallies < 1} onClick={() => {
											editPrefs("maxTallies", this.state.newMaxTallies);
										}} />
									} />
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