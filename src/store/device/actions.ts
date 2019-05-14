import {
	ADD_DEVICE,
	EDIT_DEVICE,
	DELETE_DEVICE,
	ICreateDeviceAction,
	IEditDeviceAction,
	IDeleteDeviceAction,
	ILoadDevicesAction,
	ISortDevicesAction,
	LOAD_DEVICES,
	SORT_DEVICES,
	SORT_BY, SORT_TYPE,
} from './types/IDeviceActions';
import {IDeviceInfo} from "../../types/IDevice";

export function createDevice(device: IDeviceInfo): ICreateDeviceAction {
	return {
		type: ADD_DEVICE,
		data: device
	}
}

export function editDevice(objectId: string, deviceName: string): IEditDeviceAction {
	return {
		type: EDIT_DEVICE,
		objectId: objectId,
		deviceName: deviceName
	}
}

export function deleteDevice(device: IDeviceInfo): IDeleteDeviceAction {
	return {
		type: DELETE_DEVICE,
		data: device
	}
}

export function loadDevices(devices: IDeviceInfo[]): ILoadDevicesAction {
	return {
		type: LOAD_DEVICES,
		data: devices
	}
}

export function sortDevices(sortBy: SORT_BY, sortType: SORT_TYPE): ISortDevicesAction {
	return {
		type: SORT_DEVICES,
		sortBy: sortBy,
		sortType: sortType
	}
}
