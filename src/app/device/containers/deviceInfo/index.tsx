import './index.css';

import React from "react";
import {RouteComponentProps, withRouter} from "react-router";
import DeviceInfoCard from "../../components/DeviceInfoCard";
import EditDeviceForm from "../../components/EditDeviceForm";

interface IUrlParams {
    deviceObjectId?: string;
}

const DeviceInfo: React.FC<RouteComponentProps<IUrlParams>> = (props) => {
    const deviceId = props.match.params.deviceObjectId;

    return (
        <div>
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                        Device
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                {deviceId && <DeviceInfoCard deviceObjectId={deviceId}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(DeviceInfo);
