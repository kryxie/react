export interface IDeviceInfo {
	deviceName: string;
	trafficCounter: number;
	objectId: string;
	countryIsoCode: string;
	otherDomesticCountryIsoCode: string;
	updatedAt: string;
	osType: string;
	roaming: boolean;
	createdAt: string;
}

export interface IDeviceData {
	deviceName: string;
	osType: string;
	countryIsoCode: string;
	otherDomesticCountryIsoCode: string;
}

export interface IDeviceCreated {
	objectId: string;
	createdAt: string;
}

export interface IDeviceUpdated {
	updatedAt: string;
}
