import React from "react";

interface ISelectProps {
	title: string;
	name: string;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	options: ISelectOption[];
}

export interface ISelectOption {
	key: string;
	value: string;
}

export const Select = (props: ISelectProps) => {
	return (
		<div className="form-group">
			<label htmlFor={props.name}> {props.title} </label>
			<select
				id={props.name}
				name={props.name}
				value={props.value}
				onChange={props.onChange}
				className="form-control"
			>
				<option value="" disabled>{props.placeholder}</option>
				{props.options.map(option => (
					<option key={option.key} value={option.key} label={option.value}>
						{option.value}
					</option>
				))}
			</select>
		</div>
	);
};
