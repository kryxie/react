import React from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface IButtonProps {
	type: string;
	title: string;
	icon?: IconProp;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = (props: IButtonProps) => {
	return (
		<button className={"btn btn-sm btn-outline-" + props.type} onClick={(e) => props.onClick(e)}>
			{props.title}{' '}
			{props.icon && <FontAwesomeIcon icon={props.icon}/>}
		</button>
	);
};
