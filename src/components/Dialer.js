import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Logger from '../Logger';
import UserChip from './UserChip';
import { Button, TextField } from '@material-ui/core';

const logger = new Logger('Dialer');

export default class Dialer extends React.Component {
	constructor (props) {
		super(props);

		this.state =
		{
			uri: props.callme || ''
		};
	}

	render() {
		const state = this.state;
		const props = this.props;
		const settings = props.settings;

		return (
			<div data-component='Dialer'>
				<div className='userchip-container'>
					<UserChip
						name={ settings.display_name }
						uri={ settings.uri || '' }
						status={ props.status }
						fullWidth
					/>
				</div>

				<form
					className={ classnames('uri-form', { hidden: props.busy }) }
					action=''
					onSubmit={ this.handleSubmit.bind(this) }
				>
					<div className='uri-container' style={ { maxWidth: '500px' } }>
						<TextField
							placeholder='SIP URI or username'
							fullWidth
							disabled={ !this._canCall() }
							value={ state.uri }
							onChange={ this.handleUriChange.bind(this) }
						/>
					</div>

					<Button
						color="primary"

						disabled={ !this._canCall() || !state.uri }
						onClick={ this.handleClickCall.bind(this) }
					>
						Call
					</Button>

				</form>
			</div>
		);
	}

	handleUriChange(event) {
		this.setState({ uri: event.target.value });
	}

	handleSubmit(event) {
		logger.debug('handleSubmit()');

		event.preventDefault();

		if (!this._canCall() || !this.state.uri)
			return;

		this._doCall();
	}

	handleClickCall() {
		logger.debug('handleClickCall()');

		this._doCall();
	}

	_doCall() {
		const uri = this.state.uri;

		logger.debug('_doCall() [uri:"%s"]', uri);

		this.setState({ uri: '' });
		this.props.onCall(uri);
	}

	_canCall() {
		const props = this.props;

		return (
			!props.busy &&
			(props.status === 'connected' || props.status === 'registered')
		);
	}
}

Dialer.propTypes =
{
	settings: PropTypes.object.isRequired,
	status: PropTypes.string.isRequired,
	busy: PropTypes.bool.isRequired,
	callme: PropTypes.string,
	onCall: PropTypes.func.isRequired
};
