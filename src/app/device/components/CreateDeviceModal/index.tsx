import React from "react";
import {Modal} from 'react-bootstrap';
import CreateDeviceForm from "../CreateDeviceForm";
import {Button} from "../../../../common/formComponents";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

library.add(faPlus);

interface ICreateDeviceModalProps {}
interface ICreateDeviceModalState {
	show: boolean;
}

export default class CreateDeviceModal extends React.Component<ICreateDeviceModalProps, ICreateDeviceModalState> {

	constructor(props: ICreateDeviceModalProps) {
		super(props);
		this.state = {
			show: false,
		};
	}

	public render(): React.ReactNode {
		return (
			<>
				<div className="text-right my-3">
					<Button type="success" title="add device" icon='plus' onClick={() => this.handleShow()}/>
				</div>
				<Modal show={this.state.show} onHide={() => this.handleClose()}>
						<Modal.Header closeButton>
							<Modal.Title>Add new device</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<CreateDeviceForm onCreated={() => this.handleClose()}/>
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
