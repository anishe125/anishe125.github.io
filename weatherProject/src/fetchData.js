import 'babel-polyfill';

export const load = async function(url, callback) {
    let result = await fetchData(url);
    handleResponse(result, callback);
};

export const fetchData = async function (url) {
    const response = await fetch(url);
    if (response.ok){
        let data = {};
        if (response.body !== null) {
            data = await response.json();
        }
        return {'success': true, data: data};
    }
    else{
       return {'success': false, 'error': response.status}
    }
};

export const handleResponse = function (result, callback) {
    if (result.success) {
        callback(null, result.data);
    }
    else {
        callback(result.error, null);
    }
};