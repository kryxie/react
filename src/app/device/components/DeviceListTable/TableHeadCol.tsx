import React from "react";
import {connect} from "react-redux";
import {sortDevices} from "../../../../store/device/actions";
import {SORT_BY, SORT_TYPE} from "../../../../store/device/types/IDeviceActions";

interface ITableHeadColProps {
	title: string;
	sortBy: SORT_BY;
	sortDevices: typeof sortDevices;
}

interface ITableHeadColState {
	sortType: SORT_TYPE;
}

class TableHeadCol extends React.Component<ITableHeadColProps, ITableHeadColState> {

	constructor(props: ITableHeadColProps) {
		super(props);
		this.state = {
			sortType: "ASC"
		}
	}

	public render(): React.ReactNode {
		return (
			<th>
				<span onClick={() => this.sortDevice()}>{this.props.title}</span>
			</th>
		);
	}

	private sortDevice(): void {
		this.props.sortDevices(this.props.sortBy, this.state.sortType);
		this.setState({sortType: this.state.sortType === "ASC" ? "DESC" : "ASC"});
	}
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {sortDevices};

export default connect(mapStateToProps, mapDispatchToProps)(TableHeadCol);
