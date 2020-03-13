import React from "react";
import PropTypes from "prop-types";
import Routes from "./routes";
import DataProvider from "./DataProvider";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
const {webFrame} = window.require("electron");


class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleZoomClick = (zoomOut) => {
		const currentZoomFactor = webFrame.getZoomFactor();
		webFrame.setZoomFactor(currentZoomFactor + (zoomOut ? -0.2 : 0.2));
	}

	render() {
		const { activeItem } = this.props;
		return (
			<DataProvider.Consumer>
				{
					dataCtx => {
						const { currentClass } = dataCtx;

						return (
							<div>
								<Menu pointing secondary>
									<Link to={Routes.classes}>
										<Menu.Item
											name='My Classes'
											active={activeItem === Routes.classes}
										>
											My Classes
										</Menu.Item>
									</Link>
									{
										currentClass != null ? (
											<div style={{ display: "flex" }}>
												<Link to={Routes.tally}>
													<Menu.Item
														name='Tally'
														active={activeItem === Routes.tally}
													>
														Tally
													</Menu.Item>
												</Link>

												<Link to={Routes.edit}>
													<Menu.Item
														name='Edit'
														active={activeItem === Routes.edit}
													>
														Edit Class
													</Menu.Item>
												</Link>
											</div>
										) : null
									}
									<Link to={Routes.settings}>
										<Menu.Item
											name='Settings'
											active={activeItem === Routes.settings}
										>
											Settings
										</Menu.Item>
									</Link>
									<Menu.Item position="right">
										<Icon name="zoom-out" onClick={() => {
											this.handleZoomClick(true);
										}} />
										<Icon name="zoom-in" onClick={() => {
											this.handleZoomClick(false);
										}} />
									</Menu.Item>
								</Menu>
							</div>
						);
					}
				}
			</DataProvider.Consumer>
		);
	}
}

Navbar.propTypes = {
	activeItem: PropTypes.string
};

export default Navbar;