import React from "react";
import PropTypes from "prop-types";
import Routes from "./routes";
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
                </Menu>
            </div>
        );
    }
}

Navbar.propTypes = {
    activeItem: PropTypes.string
};

export default Navbar;