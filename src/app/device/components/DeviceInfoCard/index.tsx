import React from "react";
import {connect} from "react-redux";
import {AppState} from "../../../../store";
import {IDeviceState} from "../../../../store/device/types/IDeviceState";
import {IDeviceInfo} from "../../../../types/IDevice";
import request from "../../../../common/request";
import config from "../../../../common/config";
import {createDevice} from "../../../../store/device/actions";

interface IDeviceInfoCardProps {
	device: IDeviceState;
	deviceObjectId: string;
	createDevice: typeof createDevice;
}

class DeviceInfoCard extends React.Component<IDeviceInfoCardProps> {

	constructor(props: IDeviceInfoCardProps) {
		super(props);
	}

	public componentWillMount(): void {
		if(!this.props.device.deviceList.find(item => item.objectId === this.props.deviceObjectId)) {
			this.getDevice()
				.then((device) => 	device && this.props.createDevice(device));
		}
	}

	public render(): React.ReactNode {
		const device = this.props.device.deviceList.find(item => item.objectId === this.props.deviceObjectId);
		if(!device) {
			return (<></>);
		}

		return (
			<div className="card">
				<div className="card-header">
					Info
				</div>
				<div className="card-body">
					<div>
						<strong>Device name: </strong>
						{device.deviceName}
					</div>
					<div>
						<strong>OS type: </strong>
						{device.osType}
					</div>
					<div>
						<strong>Country iso code: </strong>
						{device.countryIsoCode}
					</div>
					<div>
						<strong>Other domestic country iso code: </strong>
						{device.otherDomesticCountryIsoCode}
					</div>
					<div>
						<strong>Traffic counter: </strong>
						{device.trafficCounter || 0}
					</div>
					<div>
						<strong>Created at: </strong>
						{device.createdAt}
					</div>
					<div>
						<strong>Last update: </strong>
						{device.updatedAt}
					</div>
				</div>
			</div>
		);
	}

	private getDevice(): Promise<void|IDeviceInfo> {
		return request
			.get(config.endpoint + '/classes/Device/' + this.props.deviceObjectId)
			.then((response) => response.data)
			.catch((e) => console.error(e.message));
	}
}

const mapStateToProps = (state: AppState) => ({device: state.device});
const mapDispatchToProps = {createDevice};
export default connect(mapStateToProps, mapDispatchToProps)(DeviceInfoCard);
