import * as React from "react";
import {Layout} from "./app/layout";
import Login from "./app/login/containers/Login";
import DeviceList from "./app/device/containers/DeviceList";
import DeviceInfo from "./app/device/containers/deviceInfo";

interface IRoute {
	path: string;
	component: React.ComponentClass;
	layout?: React.FC;
}

export const router: IRoute[] = [
	{path: '/device-list/device/:deviceObjectId', component: DeviceInfo, layout: Layout},
	{path: '/device-list', component: DeviceList, layout: Layout},
	{path: '/', component: Login},
];
