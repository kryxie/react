import * as React from "react";
import {connect} from "react-redux";
import {AppState} from "../../../../store";
import {IDeviceState} from "../../../../store/device/types/IDeviceState";
import config from "../../../../common/config";
import request from "../../../../common/request";
import {IDeviceInfo} from "../../../../types/IDevice";
import {AxiosError} from "axios";
import {ResultList} from "../../../../types/ResultList";
import {loadDevices} from "../../../../store/device/actions";
import TableHeadCol from "./TableHeadCol";
import {TableRow} from "./TableRow";

interface IDeviceListProps {
	device: IDeviceState;
	loadDevices: typeof loadDevices;
}

interface IDeviceListState {
	deviceName: string;
	osType: string;
	countryIsoCode: string;
	otherDomesticCountryIsoCode: string;
}

class DeviceListTable extends React.Component<IDeviceListProps, IDeviceListState> {

	public componentWillMount(): void {
		this.getDeviceList()
			.then((response) => response && this.props.loadDevices(response));
	}

	public render(): React.ReactNode {
		const deviceList = this.props.device.deviceList;
		if(!deviceList.length) {
			return <></>;
		}

		return (
			<table className="table table-striped table-bordered">
				<thead className="thead-light">
					<tr>
						<TableHeadCol title="Device name" sortBy="deviceName"/>
						<TableHeadCol title="Country code" sortBy="countryIsoCode"/>
						<TableHeadCol title="Created" sortBy="createdAt"/>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
				{deviceList.map((row, index) => (
					<TableRow key={index} device={row}/>
				))}
				</tbody>
			</table>
		);
	}

	private getDeviceList(): Promise<void|IDeviceInfo[]> {
		return request
			.get<ResultList<IDeviceInfo>>(config.endpoint + '/classes/Device')
			.then((response) => response.data.results)
			.catch((e: AxiosError) => console.error(e.message));
	}
}

const mapStateToProps = (state: AppState) => ({device: state.device});
const mapDispatchToProps = {loadDevices};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceListTable);
