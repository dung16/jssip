import React from 'react';
import PropTypes from 'prop-types';

import clone from 'clone';
import Logger from '../Logger';
import TransitionAppear from './TransitionAppear';
import { Box, Button, Dialog, FormControlLabel, MenuItem, Select, Switch, TextField } from '@material-ui/core';


const logger = new Logger('Settings');

export default class Settings extends React.Component {
	constructor (props) {
		super(props);

		const settings = props.settings;

		this.state =
		{
			settings: clone(settings, false)
		};
	}

	render() {
		const settings = this.state.settings;

		return (
			<Dialog onClose={ this.handleCancel.bind(this) } aria-labelledby="customized-dialog-title" open={ this.props.showSettings } className='settings'>
				<TransitionAppear duration={ 250 }>

					<div style={ { padding: 20 } }>
						<h1>JsSIP UA settings</h1>

						<div className='item'>
							<TextField
								placeholder='SIP URI'
								value={ settings.uri || '' }
								variant="outlined"
								fullWidth
								onChange={ this.handleChangeSipUri.bind(this) }
							/>
						</div>
						<br />
						<div className='item'>
							<TextField
								placeholder='SIP password'
								value={ settings.password || '' }
								variant="outlined"
								fullWidth
								type='password'
								onChange={ this.handleChangePassword.bind(this) }
							/>
						</div>
						<br />
						<div className='item'>
							<TextField
								placeholder='WebSocket URI'
								value={ settings.socket.uri || '' }
								variant="outlined"
								fullWidth
								onChange={ this.handleChangeWebSocketUri.bind(this) }
							/>
						</div>
						<br />
						<div className='item'>
							<Select
								placeholder='Via transport'
								value={ settings.socket.via_transport || 'auto' }
								fullWidth
								onChange={ this.handleChangeViaTransport.bind(this) }
							>
								<MenuItem value='auto'>auto</MenuItem>
								<MenuItem value='tcp'>tcp</MenuItem>
								<MenuItem value='tls'>tls</MenuItem>
								<MenuItem value='tls'>tls</MenuItem>
								<MenuItem value='ws'>ws</MenuItem>
								<MenuItem value='wss'>WSS</MenuItem>
							</Select>
						</div>
						<br />
						<div className='item'>
							<TextField
								placeholder='Registrar server'
								value={ settings.registrar_server || '' }
								variant="outlined"
								fullWidth
								onChange={ this.handleChangeRegistrarServer.bind(this) }
							/>
						</div>
						<br />
						<div className='item'>
							<TextField
								placeholder='Contact URI'
								value={ settings.contact_uri || '' }
								variant="outlined"
								fullWidth
								onChange={ this.handleChangeContactUri.bind(this) }
							/>
						</div>
						<br />
						<div className='item'>
							<TextField
								placeholder='Authorization user'
								value={ settings.authorization_user || '' }
								variant="outlined"
								fullWidth
								onChange={ this.handleChangeAuthorizationUser.bind(this) }
							/>
						</div>
						<br />
						<div className='item'>
							<TextField
								placeholder='Instance ID'
								value={ settings.instance_id || '' }
								variant="outlined"
								fullWidth
								onChange={ this.handleChangeInstanceId.bind(this) }
							/>
						</div>
						<br />
						<div className='separator' />

						<FormControlLabel
							control={ <Switch checked={ settings.session_timers } onChange={ this.handleToogleSessionTimers.bind(this) } name="checkedA" /> }
							label="Session Timers"
						/>

						<br />


						<FormControlLabel
							control={ <Switch checked={ settings.use_preloaded_route } onChange={ this.handleToogleUsePreloadedRoute.bind(this) } /> }
							label="Preloaded Route"
						/>


						<br />
						<div className='separator' />

						<h1>callstats.io settings</h1>
						<FormControlLabel
							control={ <Switch checked={ settings.callstats.enabled } onChange={ this.handleToogleCallstatsEnabled.bind(this) } /> }
							label="Send call statistics to callstats.io"
						/>


						<div className='separator' />

						<div className='item'>
							<TextField
								placeholder='AppID'
								value={ settings.callstats.AppID || '' }
								disabled={ !settings.callstats.enabled }
								variant="outlined"
								fullWidth
								onChange={ this.handleChangeCallstatsAppID.bind(this) }
							/>
						</div>
						<br />
						<div className='item'>
							<TextField
								placeholder='AppSecret'
								value={ settings.callstats.AppSecret || '' }
								disabled={ !settings.callstats.enabled }
								variant="outlined"
								fullWidth
								onChange={ this.handleChangeCallstatsAppSecret.bind(this) }
							/>
						</div>
						<br />
						<div className='separator' />

						<Box className='buttons' style={ { display: 'flex', justifyContent: 'space-around' } }>
							<Button
								variant="outlined"
								onClick={ this.handleCancel.bind(this) }
								style={ { display: 'block' } }
							>
								Cancel
							</Button>
							<Button
								variant="outlined"
								onClick={ this.handleSubmit.bind(this) }
								style={ { display: 'block' } }
								color="primary"
							>
								OK
							</Button>
						</Box>
					</div>
				</TransitionAppear>
			</Dialog >

		);
	}

	handleChangeSipUri(event) {
		const settings = this.state.settings;

		settings.uri = event.target.value;
		this.setState({ settings });
	}

	handleChangePassword(event) {
		const settings = this.state.settings;

		settings.password = event.target.value;
		this.setState({ settings });
	}

	handleChangeWebSocketUri(event) {
		const settings = this.state.settings;

		settings.socket.uri = event.target.value;
		this.setState({ settings });
	}

	handleChangeViaTransport(event, key, value) {
		const settings = this.state.settings;

		settings.socket[ 'via_transport' ] = value;
		this.setState({ settings });
	}

	handleChangeRegistrarServer(event) {
		const settings = this.state.settings;

		settings[ 'registrar_server' ] = event.target.value;
		this.setState({ settings });
	}

	handleChangeContactUri(event) {
		const settings = this.state.settings;

		settings[ 'contact_uri' ] = event.target.value;
		this.setState({ settings });
	}

	handleChangeAuthorizationUser(event) {
		const settings = this.state.settings;

		settings[ 'authorization_user' ] = event.target.value;
		this.setState({ settings });
	}

	handleChangeInstanceId(event) {
		const settings = this.state.settings;

		settings[ 'instance_id' ] = event.target.value;
		this.setState({ settings });
	}

	handleToogleSessionTimers() {
		const settings = this.state.settings;

		settings[ 'session_timers' ] = !settings.session_timers;
		this.setState({ settings });
	}

	handleToogleUsePreloadedRoute() {
		const settings = this.state.settings;

		settings[ 'use_preloaded_route' ] = !settings.use_preloaded_route;
		this.setState({ settings });
	}

	handleToogleCallstatsEnabled() {
		const settings = this.state.settings;

		settings[ 'callstats' ][ 'enabled' ] = !settings.callstats.enabled;
		this.setState({ settings });
	}

	handleChangeCallstatsAppID(event) {
		const settings = this.state.settings;

		settings.callstats.AppID = event.target.value;
		this.setState({ settings });
	}

	handleChangeCallstatsAppSecret(event) {
		const settings = this.state.settings;

		settings.callstats.AppSecret = event.target.value;
		this.setState({ settings });
	}

	handleSubmit() {
		logger.debug('handleSubmit()');

		const settings = this.state.settings;

		this.props.onSubmit(settings);
	}

	handleCancel() {
		logger.debug('handleCancel()');

		this.props.onCancel();
	}
}

Settings.propTypes =
{
	settings: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired
};
