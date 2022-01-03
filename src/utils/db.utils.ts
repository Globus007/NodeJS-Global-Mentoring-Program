import moment from 'moment';
import { TIMESTAMP_FORMAT_DB } from '../constants';

export const getCurrentTimestamp = (): string => moment().format(TIMESTAMP_FORMAT_DB);
