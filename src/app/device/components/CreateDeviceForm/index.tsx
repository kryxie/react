import * as React from "react";
import {connect} from "react-redux";
import {IDeviceCreated, IDeviceData, IDeviceInfo} from "../../../../types/IDevice";
import {Button, Input, Select} from "../../../../common/formComponents";
import {createDevice} from "../../../../store/device/actions";
import {countries} from "./enums/countries";
import {ostypes} from "./enums/ostypes";
import request from "../../../../common/request";
import config from "../../../../common/config";
import {AxiosError} from "axios";

interface IDeviceFormProps {
	createDevice: typeof createDevice;
	onSubmit?: () => void;
	onClear?: () => void;
	onCreated?: (device: IDeviceInfo) => void;
}

interface IDeviceFormState {
	newDevice: IDeviceData;
}

class CreateDeviceForm extends React.Component<IDeviceFormProps, IDeviceFormState> {

	constructor(props: IDeviceFormProps) {
		super(props);
		this.state = {
			newDevice: CreateDeviceForm.initNewDevice(),
		};
	}

	static initNewDevice(): IDeviceData {
		return {
			deviceName: '',
			osType: '',
			countryIsoCode: '',
			otherDomesticCountryIsoCode: '',
		}
	}

	public render(): React.ReactNode {
		return (
			<form>
				<Input
					inputType={'text'}
					title={'Device name'}
					name={'deviceName'}
					value={this.state.newDevice.deviceName}
					onChange={(e) => this.handleSetDeviceName(e)}
					placeholder={'Enter device name'}
				/>
				<Select
					title={'OS type'}
					name={'osType'}
					value={this.state.newDevice.osType}
					onChange={(e) => this.handleSetOsType(e)}
					placeholder={'Enter OS type'}
					options={ostypes}
				/>
				<Select
					title={'Country iso code'}
					name={'countryIsoCode'}
					value={this.state.newDevice.countryIsoCode}
					onChange={(e) => this.handleSetCountryIsoCode(e)}
					placeholder={'Select country iso code'}
					options={countries}
				/>
				<Select
					title={'Other domestic country iso code'}
					name={'otherDomesticCountryIsoCode'}
					value={this.state.newDevice.otherDomesticCountryIsoCode}
					onChange={(e) => this.handleSetOtherDomesticCountryIsoCode(e)}
					placeholder={'Select country iso code'}
					options={countries}
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

		const {deviceName, osType, countryIsoCode} = this.state.newDevice;

		if(deviceName.length && osType.length && countryIsoCode.length) {
			this.createDevice(this.state.newDevice)
				.then((response) => {
					if(!response) {
						throw new Error('Api error. Device not created.');
					}

					return this.getDevice(response.objectId)
				})
				.then((newDevice) => {
					if(!newDevice) {
						throw new Error('Api error. Device not loaded.');
					}

					this.props.createDevice(newDevice);
					this.props.onCreated && this.props.onCreated(newDevice);
					this.clearForm();
				})
				.catch((e) => console.error(e.message));
		} else {
			console.error('There will be error handling');
		}
	}

	private handleSetDeviceName(e: React.ChangeEvent<HTMLInputElement>): void {
		const value = e.target.value;
		this.setState((prevState) => ({newDevice: {...prevState.newDevice, deviceName: value}}));
	}

	private handleSetOsType(e: React.ChangeEvent<HTMLSelectElement>): void {
		const value = e.target.value;
		this.setState((prevState) => ({newDevice: {...prevState.newDevice, osType: value}}));
	}

	private handleSetCountryIsoCode(e: React.ChangeEvent<HTMLSelectElement>): void {
		const value = e.target.value;
		this.setState((prevState) => ({newDevice: {...prevState.newDevice, countryIsoCode: value}}));
	}

	private handleSetOtherDomesticCountryIsoCode(e: React.ChangeEvent<HTMLSelectElement>): void {
		const value = e.target.value;
		this.setState((prevState) => ({newDevice: {...prevState.newDevice, otherDomesticCountryIsoCode: value}}));
	}

	private clearForm(event?: React.MouseEvent<HTMLButtonElement>): void {
		event && event.preventDefault();

		this.setState({newDevice: CreateDeviceForm.initNewDevice()});
		this.props.onClear && this.props.onClear();
	}

	private getDevice(deviceId: string): Promise<void|IDeviceInfo> {
		return request
			.get<IDeviceInfo>(config.endpoint + '/classes/Device/' + deviceId)
			.then((response) => response.data)
			.catch((e: AxiosError) => console.error(e.message));
	}

	private createDevice(device: IDeviceData): Promise<void|IDeviceCreated> {
		return request
			.post<IDeviceCreated>(config.endpoint + '/classes/Device', device)
			.then((response) => response.data)
			.catch((e: AxiosError) => console.error(e.message));
	}
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {createDevice};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeviceForm);
