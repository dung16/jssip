import Logger from './Logger';

const logger = new Logger('storage');
// eslint-disable-next-line import/no-anonymous-default-export
export default
	{
		get() {
			const data = localStorage.getItem('settings');
			let settings;

			if (data)
				settings = JSON.parse(data);

			logger.debug('get() [settings:%o]', settings);

			return settings;
		},

		set(settings) {
			logger.debug('set() [settings:%o]', settings);

			localStorage.setItem('settings', JSON.stringify(settings));
		},

		clear() {
			logger.debug('clear()');

			localStorage.removeItem('settings');
		}
	};
