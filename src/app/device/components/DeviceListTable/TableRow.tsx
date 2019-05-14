import React from "react";
import {IDeviceInfo} from "../../../../types/IDevice";
import DeleteDeviceButton from "../DeleteDeviceButton";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import EditDeviceModal from "../EditDeviceModal";

library.add(faSearch);

interface ITableRow {
	device: IDeviceInfo;
}

export const TableRow = (props: ITableRow) => {
	return (
		<tr>
			<td>{props.device.deviceName}</td>
			<td>{props.device.countryIsoCode}</td>
			<td>{props.device.createdAt}</td>
			<td>
				<div className="btn-group btn-group-sm" role="group">
					<NavLink className="btn btn-outline-info" to={"/device-list/device/" + props.device.objectId}>
						show <FontAwesomeIcon icon="search"/>
					</NavLink>
					<EditDeviceModal device={props.device} />
					<DeleteDeviceButton device={props.device}/>
				</div>
			</td>
		</tr>
	);
};
