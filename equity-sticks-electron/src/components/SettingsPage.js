import React from "react";
import { Button, Header, Container, Input, Checkbox, Segment, Icon } from "semantic-ui-react";
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
									<Header as="h3">Always On Top</Header>
									<p>Turn on this setting to make the app float on top of other windows.</p>
									<Checkbox toggle checked={preferences.alwaysOnTop === true} onChange={(e, props) => {
										editPrefs("alwaysOnTop", preferences.alwaysOnTop !== true);
									}} />
									<Header as="h3">About</Header>
									<Header as="h4">
										<Icon name="code" />
										<Header.Content>
										Eric Yoon <span style={{fontWeight: "normal"}}>'23</span>
										<Header.Subheader>Development</Header.Subheader>
										</Header.Content>
									</Header>
									<Header as="h4">
										<Icon name="paint brush" />
										<Header.Content>
										Aariz Irfan <span style={{fontWeight: "normal"}}>'23</span>
										<Header.Subheader>Design</Header.Subheader>
										</Header.Content>
									</Header>
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