import React from "react";
import "semantic-ui-css/semantic.min.css";
import { HashRouter, Route } from "react-router-dom";

import "./App.css";
import TallyPage from "./components/TallyPage";
import EditPage from "./components/EditPage";
import ClassesPage from "./components/ClassesPage";
import DataProvider from "./components/DataProvider";
import Routes from "./components/routes";
import SettingsPage from "./components/SettingsPage";
import StatsPage from "./components/StatsPage";


function App() {
	return (
		<DataProvider.DataProvider>
			<div>
				<HashRouter>
					<Route path="/" exact component={TallyPage} />
					<Route path={Routes.tally} component={TallyPage} />
					<Route path={Routes.edit} component={EditPage} />
					<Route path={Routes.classes} component={ClassesPage} />
					<Route path={Routes.settings} component={SettingsPage} />
					<Route path={Routes.stats} component={StatsPage} />
				</HashRouter>
			</div>
		</DataProvider.DataProvider>
	);
}

export default App;
