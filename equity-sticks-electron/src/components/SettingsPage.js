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
		};
	}

	render() {
		return (
			<div>
				<Navbar activeItem={Routes.settings} />
				<DataProvider.Consumer>
					{
						dataCtx => {
							const { currentClass, classes, preferences, editClass } = dataCtx;
							return (
								<Container>
									<Header className="mt-md" as="h1">My Settings</Header>
									<Header as="h4">Max tallies:</Header>
									<p>Max tallies: 8<span>
										<Popup on="click" wide="very" trigger={
											<p>edit</p>
										}>
											<Input value="8" labelPosition="right" label={
												<Button positive icon="save" onClick={() => {

												}} />
											} onChange={(e, d) => {

											}} />
										</Popup>
									</span>
									</p>

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