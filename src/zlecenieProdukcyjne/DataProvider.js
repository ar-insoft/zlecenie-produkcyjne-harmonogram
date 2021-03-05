export const consts = {
    ENDPOINT_URL: '/eoffice/production/harmonogramowanie/zlecenie_produkcyjne_harmonogram_json_endpoint.xml',
}

export const DataProvider = {

    pobierzZlecenie: (additionalFields, promiseHandler, errorHandler) => {
        const {idZlecenie} = additionalFields
        //const doWyslania = Object.assign({}, { ...additionalFields })
        //const doWyslaniaJson = JSON.stringify(doWyslania)

        fetch(consts.ENDPOINT_URL + '?action=zlecenie_obiekty_harmonogramowania&id=' + idZlecenie, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' //'Content-Type': 'application/json' 
            },
        })
            .then(response => {
                if (!response.ok) {
                    return Promise.reject();
                }
                return response.json()
            })
            .then(json => {
                // if (json.is_request_successful === false) {
                //     const error_message = json.error_message
                //     const errorCause = json.cause
                //     return Promise.reject({ error_message, errorCause })
                // }
                const fromServer = json

                promiseHandler(fromServer)
            })
            .catch(error => errorHandler(error))
    },

}