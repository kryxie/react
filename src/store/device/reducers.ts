import {
	ADD_DEVICE,
	EDIT_DEVICE,
	DELETE_DEVICE,
	DeviceActionTypes,
	LOAD_DEVICES, SORT_BY_COUNTRY, SORT_BY_CREATED,
	SORT_BY_NAME,
	SORT_DEVICES, SORT_TYPE_ASC, SORT_TYPE_DESC
} from "./types/IDeviceActions";
import {IDeviceState} from "./types/IDeviceState";

const initialState: IDeviceState = {
	deviceList: []
};

export function deviceReducer(state = initialState, action: DeviceActionTypes): IDeviceState {
	switch(action.type) {
		case ADD_DEVICE: {
			return {
				deviceList: [...state.deviceList, action.data]
			};
		}
		case EDIT_DEVICE: {
			return {
				deviceList: state.deviceList.map(item => {
					if(item.objectId === action.objectId) {
						item.deviceName = action.deviceName;
					}

					return item;
				})
			};
		}
		case DELETE_DEVICE: {
			return {
				deviceList: state.deviceList.filter((item) => item !== action.data)
			};
		}
		case LOAD_DEVICES: {
			return {
				deviceList: action.data
			};
		}
		case SORT_DEVICES: {
			switch(action.sortBy) {
				case SORT_BY_NAME: {
					switch(action.sortType) {
						case SORT_TYPE_ASC: {
							return {
								deviceList: state.deviceList.sort((a, b) => a.deviceName.localeCompare(b.deviceName))
							};
						}
						case SORT_TYPE_DESC: {
							return {
								deviceList: state.deviceList.sort((a, b) => b.deviceName.localeCompare(a.deviceName))
							};
						}
						default:
							return state;
					}
				}
				case SORT_BY_COUNTRY: {
					switch(action.sortType) {
						case SORT_TYPE_ASC: {
							return {
								deviceList: state.deviceList.sort((a, b) => a.countryIsoCode.localeCompare(b.countryIsoCode))
							};
						}
						case SORT_TYPE_DESC: {
							return {
								deviceList: state.deviceList.sort((a, b) => b.countryIsoCode.localeCompare(a.countryIsoCode))
							};
						}
						default:
							return state;
					}
				}
				case SORT_BY_CREATED: {
					switch(action.sortType) {
						case SORT_TYPE_ASC: {
							return {
								deviceList: state.deviceList.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
							};
						}
						case SORT_TYPE_DESC: {
							return {
								deviceList: state.deviceList.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
							};
						}
						default:
							return state;
					}
				}
				default:
					return state;
			}
		}
		default:
			return state;
	}
}
