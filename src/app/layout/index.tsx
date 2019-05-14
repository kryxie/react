import * as React from "react";
import {HeaderLayout} from "./header";
import {ContentLayout} from "./content";

export const Layout: React.FC = (props) => {
	return (
		<div>
			<HeaderLayout/>
			<ContentLayout>{props.children}</ContentLayout>
		</div>
	);
};
