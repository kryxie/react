import {IDeviceInfo} from "../../../types/IDevice";

export const ADD_DEVICE = "ADD_DEVICE";
export type ADD_DEVICE = typeof ADD_DEVICE;

export const EDIT_DEVICE = "EDIT_DEVICE";
export type EDIT_DEVICE = typeof EDIT_DEVICE;

export const DELETE_DEVICE = "DELETE_DEVICE";
export type DELETE_DEVICE = typeof DELETE_DEVICE;

export const LOAD_DEVICES = "LOAD_DEVICES";
export type LOAD_DEVICES = typeof LOAD_DEVICES;

export const SORT_DEVICES = "SORT_DEVICES";
export type SORT_DEVICES = typeof SORT_DEVICES;

export const SORT_BY_NAME = "deviceName";
export type SORT_BY_NAME = typeof SORT_BY_NAME;

export const SORT_BY_COUNTRY = "countryIsoCode";
export type SORT_BY_COUNTRY = typeof SORT_BY_COUNTRY;

export const SORT_BY_CREATED = "createdAt";
export type SORT_BY_CREATED = typeof SORT_BY_CREATED;

export const SORT_TYPE_ASC = "ASC";
export type SORT_TYPE_ASC = typeof SORT_TYPE_ASC;

export const SORT_TYPE_DESC = "DESC";
export type SORT_TYPE_DESC = typeof SORT_TYPE_DESC;

export type SORT_BY = SORT_BY_NAME|SORT_BY_COUNTRY|SORT_BY_CREATED;
export type SORT_TYPE = SORT_TYPE_ASC|SORT_TYPE_DESC;

export interface ICreateDeviceAction {
	type: typeof ADD_DEVICE;
	data: IDeviceInfo;
}

export interface IEditDeviceAction {
	type: typeof EDIT_DEVICE;
	objectId: string;
	deviceName: string;
}

export interface IDeleteDeviceAction {
	type: typeof DELETE_DEVICE;
	data: IDeviceInfo;
}

export interface ILoadDevicesAction {
	type: typeof LOAD_DEVICES;
	data: IDeviceInfo[];
}

export interface ISortDevicesAction {
	type: typeof SORT_DEVICES;
	sortBy: SORT_BY;
	sortType: SORT_TYPE;
}

export type DeviceActionTypes =
	ICreateDeviceAction|
	ILoadDevicesAction|
	IDeleteDeviceAction|
	ISortDevicesAction|
	IEditDeviceAction;
