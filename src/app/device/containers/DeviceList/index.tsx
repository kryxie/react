import * as React from "react";
import CreateDeviceModal from "../../components/CreateDeviceModal";
import DeviceListTable from "../../components/DeviceListTable";
import {withRouter} from "react-router";

const DeviceList: React.FC = () => {
	return (
		<div>
			<div className="container-fluid">
				<div className="card">
					<div className="card-header">
						Device list
					</div>
					<div className="card-body">
						<CreateDeviceModal/>
						<DeviceListTable/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(DeviceList);
