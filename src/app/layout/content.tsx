import './content.css';

import * as React from "react";
import {Link} from "react-router-dom";

interface IContentLayoutProps {
	children: React.ReactNode;
}

export class ContentLayout extends React.Component<IContentLayoutProps> {
	public render() {
		return (
			<div className="container-fluid page-wrapper">
				<div className="row">
					<div className="col-lg-3 col-xl-2 menu">
						<div className="profile">
							Mike's profile
						</div>
						<Link className="item" to="/device-list">Device list</Link>
						<Link className="item" to="#">Menu item</Link>
						<Link className="item" to="#">Menu item</Link>
						<Link className="item" to="#">Menu item</Link>
						<Link className="item" to="#">Menu item</Link>
						<Link className="item" to="#">Menu item</Link>
						<Link className="item" to="#">Menu item</Link>
					</div>
					<div className="col-lg-9 col-xl-10 offset-lg-3 offset-xl-2">
						<div className="page">
							{this.props.children}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
