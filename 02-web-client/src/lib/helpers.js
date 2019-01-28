import dateformat from 'dateformat';

export const parseDate = date => {
    if (!date) return null;
    const tmp = date.split('T');
    const tmpDate = tmp[0].split('-');
    const tmpTime = tmp[1].split(':');
    return `${tmpDate.join('-')} ${tmpTime[0]}:${tmpTime[1]}:${tmpTime[2].split('.')[0]}`;
};

export const toDate = date => {
    return new Date(date);
}

export const formatDate = date => {
    const tmp = new Date(date);
    const year = tmp.getFullYear();
    const month = tmp.getMonth() + 1;
    const day = tmp.getDate();
    const hour = tmp.getHours();
    const minutes = tmp.getMinutes();
    const seconds = tmp.getSeconds();
    return `${year}-${month < 9 ? `0${month}` : month}-${day} ${hour}:${minutes}:${seconds}`;
};

export const prettyDate = date => {
    const datePattern = 'dd.mm.yyyy HH:MM:ss';
    return dateformat(new Date(date), datePattern);
}

export const strBase64ToBin = strBase64 => {
    const blobBin = atob(strBase64.split(',')[1]);
    let array = [];
    for (let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
    }
    const file = new Blob([new Uint8Array(array)], { type: 'image/png' });
    return file;
}