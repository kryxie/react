import React from "react";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons';
import {Button, Input} from "../../../../common/formComponents";
import request from "../../../../common/request";
import config from "../../../../common/config";
import Token from "../../../../common/token";
import {AxiosError} from "axios";
import {IUser} from "../../../../types/IUser";

library.add(faUser, faLock);

interface ILoginFormProps {
	onSuccessLogin: () => void;
}

interface ILoginFormState {
	username: string;
	password: string;
}

export class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {

	constructor(props: ILoginFormProps) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
	}

	public render(): React.ReactNode {
		return (
			<form>
				<Input
					inputType={'text'}
					title={'Username'}
					name={'username'}
					value={this.state.username}
					onChange={(e) => this.handleChangeUsername(e)}
					placeholder={'Enter username'}
					icon={'user'}
				/>
				<Input
					inputType={'password'}
					title={'Password'}
					name={'Password'}
					value={this.state.password}
					onChange={(e) => this.handleChangePassword(e)}
					placeholder={'Enter username'}
					icon={'lock'}
				/>
				<Button
					onClick={(e) => this.handleSubmit(e)}
					type={"success"}
					title={"Log in"}
				/>
			</form>
		);
	}

	private handleChangeUsername(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({username: event.target.value});
	}

	private handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({password: event.target.value});
	}

	private handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		event.stopPropagation();

		if(!this.state.password.length || !this.state.username.length) {
		} else {
			this.login()
				.then((user) => user && Token.setToken(user.sessionToken))
				.then(() => this.props.onSuccessLogin());
		}
	}

	private login(): Promise<void|IUser> {
		return request
			.get<IUser>(config.endpoint + '/login', {
				params: {
					username: this.state.username,
					password: this.state.password,
				}
			})
			.then((response) => response.data)
			.catch((e: AxiosError) => console.error(e.message));
	}
}
