const ERROR_CODES = {
    INVALID_LOGIN_CREDENTIALS: 'Пользователь с таким email или password не был найден',
    auth: 'Пожайлуста, войдите в систему'
}
export function error(code) {
    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}