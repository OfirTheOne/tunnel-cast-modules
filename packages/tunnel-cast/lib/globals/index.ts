

import { Logger } from './../utils/logger'


export const globals = {
    STOP_ON_FIRST_FAIL:  false,
    DEBUG_ERROR:  true,
    FIELD_REQUIRED_DEFAULT:  true,
    FIELD_NULLABLE_DEFAULT:  false,
    FIELD_VALIDATE_DEFAULT:  true,
    VERBOSE_LEVEL:  0,
    LOGGER_STDOUT: process.stdout,
    LOGGER: undefined as Logger
}

globals['LOGGER'] = new Logger(globals)

