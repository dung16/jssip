import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';

import FaceIcon from '@material-ui/icons/Face';
export default class UserChip extends React.Component {
	// eslint-disable-next-line no-useless-constructor
	constructor (props) {
		super(props);
	}

	render() {
		const name = this.props.name;
		const uri = this.props.uri;

		return (
			<Chip
				data-component='UserChip'
				icon={ <FaceIcon /> }
				label={ name + uri }
				color="secondary"
			/>
		);
	}
}

UserChip.propTypes =
{
	name: PropTypes.string.isRequired,
	uri: PropTypes.string.isRequired,
	status: PropTypes.string,
	fullWidth: PropTypes.bool
};
