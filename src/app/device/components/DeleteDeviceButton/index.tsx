import React from "react";
import {Button} from "../../../../common/formComponents";
import request from "../../../../common/request";
import config from "../../../../common/config";
import {deleteDevice} from "../../../../store/device/actions";
import {connect} from "react-redux";
import {IDeviceInfo} from "../../../../types/IDevice";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);

interface IDeleteDeviceButtonProps {
	device: IDeviceInfo;
	deleteDevice: typeof deleteDevice;
}

class DeleteDeviceButton extends React.Component<IDeleteDeviceButtonProps> {

	public render(): React.ReactNode {
		return (
			<Button
				type={"danger"}
				title={"Delete"}
				icon={'trash'}
				onClick={(e) => this.deleteDevice(e)}
			/>
		);
	}

	private deleteDevice(e: React.MouseEvent<HTMLButtonElement>): void {
		e.preventDefault();

		request
			.delete(config.endpoint + '/classes/Device/' + this.props.device.objectId)
			.then(() => this.props.deleteDevice(this.props.device))
			.catch((e) => console.error(e.message));
	}
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {deleteDevice};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDeviceButton);
