import React from "react";
import PropTypes from "prop-types";
import Routes from "./routes";
import DataProvider from "./DataProvider";
import {Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";


class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        const {activeItem} = this.props;
        return (
			<DataProvider.Consumer>
				{
					dataCtx => {
						const {currentClass, classes, preferences, changeClass } = dataCtx;

						return (
							<div>
								<Menu>
									<Link to={Routes.classes}>
										<Menu.Item
											name='My Classes'
											active={activeItem === "classes"}
										>
											My Classes
										</Menu.Item>
									</Link>
									{
										currentClass != null ? (
											<div style={{display: "flex"}}>
												<Link to={Routes.tally}>
													<Menu.Item
														name='Tally'
														active={activeItem === "classes"}
													>
														Tally
													</Menu.Item>
												</Link>

												<Link to={Routes.edit}>
													<Menu.Item
														name='Edit'
														active={activeItem === "classes"}
													>
														Edit Class
													</Menu.Item>
												</Link>
											</div>
										) : null
									}
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