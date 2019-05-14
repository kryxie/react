import * as React from "react";
import {connect} from "react-redux";
import {IDeviceUpdated} from "../../../../types/IDevice";
import {Button, Input} from "../../../../common/formComponents";
import {editDevice} from "../../../../store/device/actions";
import request from "../../../../common/request";
import config from "../../../../common/config";
import {AxiosError} from "axios";

interface IEditDeviceFormProps {
	editDevice: typeof editDevice;
	deviceName: string;
	deviceObjectId: string;
	onSubmit?: () => void;
	onClear?: () => void;
	onEdited?: () => void;
}

interface IEditDeviceFormState {
	deviceName: string;
}

class EditDeviceForm extends React.Component<IEditDeviceFormProps, IEditDeviceFormState> {

	constructor(props: IEditDeviceFormProps) {
		super(props);
		this.state = {
			deviceName: this.props.deviceName,
		};
	}

	public render(): React.ReactNode {
		return (
			<form>
				<Input
					inputType={'text'}
					title={'Device name'}
					name={'deviceName'}
					value={this.state.deviceName}
					onChange={(e) => this.handleSetDeviceName(e)}
					placeholder={'Enter device name'}
				/>
				<div className="btn-group float-right">
					<Button
						onClick={(e) => this.handleSubmit(e)}
						type={"success"}
						title={"Save"}
					/>
					<Button
						onClick={(e) => this.clearForm(e)}
						type={"dark"}
						title={"Clear"}
					/>
				</div>
			</form>
		);
	}

	private handleSubmit(event: React.MouseEvent<HTMLButtonElement>): void {
		event.preventDefault();
		this.props.onSubmit && this.props.onSubmit();

		if(this.state.deviceName.length) {
			this.editDevice(this.state.deviceName)
				.then((response) => {
					if(!response) {
						throw new Error('Api error. Device not created.');
					}
				})
				.then(() => {
					this.props.editDevice(this.props.deviceObjectId, this.state.deviceName);
					this.props.onEdited && this.props.onEdited();
					this.clearForm();
				})
				.catch((e) => console.error(e.message));
		} else {
			console.error('There will be error handling');
		}
	}

	private handleSetDeviceName(e: React.ChangeEvent<HTMLInputElement>): void {
		this.setState({deviceName: e.target.value});
	}

	private clearForm(event?: React.MouseEvent<HTMLButtonElement>): void {
		event && event.preventDefault();

		this.setState({deviceName: ''});
		this.props.onClear && this.props.onClear();
	}

	private editDevice(deviceName: string): Promise<void|IDeviceUpdated> {
		return request
			.put<IDeviceUpdated>(config.endpoint + '/classes/Device/' + this.props.deviceObjectId, deviceName)
			.then((response) => response.data)
			.catch((e: AxiosError) => console.error(e.message));
	}
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {editDevice};

export default connect(mapStateToProps, mapDispatchToProps)(EditDeviceForm);
