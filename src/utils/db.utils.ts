import moment from 'moment';
import { TIMESTAMP_FORMAT } from '../db/db.constants';

export const getCurrentTimestamp = (): string => moment().format(TIMESTAMP_FORMAT);
