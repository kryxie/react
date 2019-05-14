import React from "react";
import {Modal} from 'react-bootstrap';
import {Button} from "../../../../common/formComponents";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import EditDeviceForm from "../EditDeviceForm";
import {IDeviceInfo} from "../../../../types/IDevice";

library.add(faPencilAlt);

interface IEditDeviceModalProps {
	device: IDeviceInfo;
}
interface IEditDeviceModalState {
	show: boolean;
}

export default class EditDeviceModal extends React.Component<IEditDeviceModalProps, IEditDeviceModalState> {

	constructor(props: IEditDeviceModalProps) {
		super(props);
		this.state = {
			show: false,
		};
	}

	public render(): React.ReactNode {
		return (
			<>
				<Button type="primary" title="edit" icon='pencil-alt' onClick={() => this.handleShow()}/>
				<Modal show={this.state.show} onHide={() => this.handleClose()}>
						<Modal.Header closeButton>
							<Modal.Title>Edit device</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<EditDeviceForm
								deviceObjectId={this.props.device.objectId}
								deviceName={this.props.device.deviceName}
								onEdited={() => this.handleClose()}
							/>
						</Modal.Body>
				</Modal>
			</>
		);
	}

	private handleShow(): void {
		this.setState({show: true});
	}

	private handleClose(): void {
		this.setState({show: false});
	}
}
