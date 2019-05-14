import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

interface IInputProps {
	title: string;
	name: string;
	inputType: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	icon?: IconProp;
}

export const Input = (props: IInputProps) => {
	return (
		<div className="form-group position-relative">
			<label htmlFor={props.name} className="form-label">{props.title}:</label>
			<div className="input-group">
				{props.icon &&
					<div className='input-group-prepend'>
						<div className='input-group-text'>
							<span className="input-group-addon">
								<FontAwesomeIcon icon={props.icon}/>
							</span>
						</div>
                    </div>
				}
				<input
					className="form-control"
					id={props.name}
					name={props.name}
					type={props.inputType}
					value={props.value}
					onChange={props.onChange}
					placeholder={props.placeholder}
				/>
			</div>
		</div>
	);
};
