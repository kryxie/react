import './header.css';

import * as React from "react";
import Token from "../../common/token";

export class HeaderLayout extends React.Component {
	public render() {
		return (
			<div className="top-wrapper">
				<div className="container-fluid">
					<div className="row">
						<div className="col-6">
							<a href="/">Lantern app</a>
						</div>
						<div className="col-6 text-right">
							<button className="btn-sm btn btn-danger" onClick={() => Token.deleteToken()}>logout</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
