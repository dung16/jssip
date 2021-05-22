import React from 'react';
import PropTypes from 'prop-types';
import SettingsIcon from '@material-ui/icons/Settings';
import classnames from 'classnames';
import randomString from 'randomstring';
import Logger from '../Logger';
import settingsManager from '../settingsManager';
import TransitionAppear from './TransitionAppear';
import Logo from './Logo';
import Settings from './Settings';
import { Button, Fab, TextField } from '@material-ui/core';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
const logger = new Logger('Login');

export default class Login extends React.Component {
	constructor (props) {
		super(props);

		this.state =
		{
			settings: props.settings,
			showSettings: false,
			errors:
			{
				name: null
			}
		};
	}

	render() {
		const state = this.state;
		const settings = state.settings;

		return (
			<TransitionAppear>
				<div data-component='Login'>
					<div className='logo-container'>
						<Logo
							size='big'
						/>
					</div>

					<form action='' onSubmit={ this.handleSubmit.bind(this) }>
						<div className='settings-icon-container'>
							<SettingsIcon
								className='icon'
								onClick={ this.handleClickSettings.bind(this) }
							/>
						</div>

						<div className='form-container'>
							<TextField
								placeholder='Your Name'
								variant="outlined"
								color="secondary"
								value={ settings.display_name || '' }
								fullWidth
								onChange={ this.handleChangeName.bind(this) }
							/>
							<Button onClick={ this.handleClickReset.bind(this) }
								variant="contained"
								style={ {
									display: 'table',
									margin: '20px auto 0 auto'
								} }>
								Reset
							</Button>

						</div>
					</form>

					<div className='submit-container'>


						<Fab className={ classnames('submit-button', { disabled: !this._checkCanPlay() }) }
							color="secondary"
							onClick={ this.handleSubmitClick.bind(this) }>
							<TrendingFlatIcon />
						</Fab>

					</div>

					{
						state.showSettings &&
						<div className='settings-container'>
							<Settings
								showSettings={ state.showSettings }
								settings={ settings }
								onSubmit={ this.handleSettingsSubmit.bind(this) }
								onCancel={ this.handleSettingsCancel.bind(this) }
							/>
						</div>
					}


				</div>
			</TransitionAppear>
		);
	}

	handleChangeName(event) {
		const settings = this.state.settings;
		const errors = this.state.errors;
		const name = event.target.value;

		settings[ 'display_name' ] = name;
		errors.name = null;

		this.setState({ settings, errors });
	}

	handleClickReset() {
		logger.debug('handleClickReset()');

		settingsManager.clear();

		this.setState({ settings: settingsManager.get() });
	}

	handleSubmit(event) {
		logger.debug('handleSubmit()');

		event.preventDefault();
		this._checkForm();
	}

	handleSubmitClick() {
		logger.debug('handleSubmitClick()');

		this._checkForm();
	}

	handleClickSettings() {
		logger.debug('handleClickSettings()');

		this.setState({ showSettings: true });
	}

	handleSettingsSubmit(settings) {
		logger.debug('handleSettingsSubmit()');

		this.setState({ settings, showSettings: false });
	}

	handleSettingsCancel() {
		logger.debug('handleSettingsCancel()');

		this.setState({ showSettings: false });
	}

	_checkCanPlay() {
		const state = this.state;

		if (state.settings.display_name && !state.showSettings)
			return true;
		else
			return false;
	}

	_checkForm() {
		logger.debug('_checkForm()');

		const state = this.state;
		const settings = state.settings;
		const errors = state.errors;
		let ok = true;

		// Check name
		// eslint-disable-next-line no-lone-blocks
		{
			if (settings.display_name.length < 3) {
				ok = false;
				errors.name = 'Name too short';
			}
		}

		if (!ok) {
			this.setState({ errors });

			return;
		}

		// If no SIP URI is set, set a random one
		if (!settings.uri) {
			const username =
				`${settings.display_name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}_${randomString({ length: 6 }).toLowerCase()}`;
			const domain = settingsManager.getDefaultDomain();

			settings.uri = `sip:${username}@${domain}`;
		}

		// Fire event
		this.props.onLogin(settings);
	}
}

Login.propTypes =
{
	settings: PropTypes.object.isRequired,
	onLogin: PropTypes.func.isRequired
};
