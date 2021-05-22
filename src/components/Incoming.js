import React from 'react';
import PropTypes from 'prop-types';
import AnswerIcon from '@material-ui/icons/PhoneForwarded';
import RejectIcon from '@material-ui/icons/PhoneDisabled';
import Logger from '../Logger';
import TransitionAppear from './TransitionAppear';
import UserChip from './UserChip';
import { Button } from '@material-ui/core';

const logger = new Logger('Incoming');

export default class Incoming extends React.Component {
	// eslint-disable-next-line no-useless-constructor
	constructor (props) {
		super(props);
	}

	render() {
		const session = this.props.session;
		const name = session.remote_identity.display_name;
		const uri = session.remote_identity.uri.toString();

		return (
			<TransitionAppear duration={ 1000 }>
				<div data-component='Incoming'>
					<UserChip
						name={ name }
						uri={ uri }
					/>

					<div className='buttons'>
						<Button
							onClick={ this.handleClickAnswer.bind(this) }
						>
							<AnswerIcon


							/>
						</Button>
						<Button
							onClick={ this.handleClickReject.bind(this) }
						>
							<RejectIcon
							/>
						</Button>

					</div>
				</div>
			</TransitionAppear>
		);
	}

	handleClickAnswer() {
		logger.debug('handleClickAnswer()');

		this.props.onAnswer();
	}

	handleClickReject() {
		logger.debug('handleClickReject()');

		this.props.onReject();
	}
}

Incoming.propTypes =
{
	session: PropTypes.object.isRequired,
	onAnswer: PropTypes.func.isRequired,
	onReject: PropTypes.func.isRequired
};
