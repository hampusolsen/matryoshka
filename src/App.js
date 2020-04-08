import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import './styles/App.scss';

// Animations ///
import { preventFlashingOnLoad } from "./utils/animations";

// Components ///
import Home from "./Components/Home/Home";
import Landing from "./Components/Landing/Landing";

// Utilities ///
import { debounce } from "./utils/helpers";

const App = () => {
	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth
	});

	useEffect(
		() => {
			preventFlashingOnLoad('body');

			const vh = dimensions.height * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);

			const handleResize = debounce(() => {
				setDimensions({
					height: window.innerHeight,
					width: window.innerWidth
				});
			}, 150);

			window.addEventListener("resize", handleResize);

			return () => {
				window.removeEventListener("resize", handleResize);
			};
		},
		[dimensions]
	);

	return (
		<React.Fragment>
			<Helmet>
				<title>matryoshka - A subjectively prettier Dropbox</title>
			</Helmet>
			<Switch>
				<Route exact path="/login" component={Landing} />
				<Route path="/" component={Home} />
			</Switch>
		</React.Fragment>
	);
};

export default App;
