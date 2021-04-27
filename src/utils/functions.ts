import Axios from 'axios';
import { format } from 'date-fns';
import { uniqueId } from 'lodash';

export const sleep = async (milliseconds: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const capFirst = (s: string): string => {
    return s.toLowerCase().charAt(0).toUpperCase() + s.toLowerCase().slice(1);
};

export const findLowerCase = (
    searches: (string | undefined)[],
    searchTerm: string
): boolean => {
    return searches
        .map((w) => (w ? w.toLowerCase() : ''))
        .join('')
        .includes(searchTerm.toLowerCase());
};

export const genRandomCode = (length: number): string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};

export const genTempId = (): string => uniqueId('tempId-') + genRandomCode(10);

export const base64ToBlob = (data: string, fileType: string): Blob => {
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: fileType });
};

export const generatePoNumber = (
    itemCode: string,
    plantCode: string,
    date: Date
): string => {
    plantCode = plantCode.length < 2 ? 'XX' : plantCode;
    itemCode = itemCode.length < 2 ? 'XX' : itemCode;

    let randCodeLen = plantCode.length === 2 && itemCode.length === 2 ? 3 : 2;

    if (plantCode.length === 3 && itemCode.length === 3) randCodeLen = 1;

    return (
        'PO' +
        plantCode +
        format(date, 'DDD') +
        genRandomCode(randCodeLen) +
        itemCode
    );
};

export const pointSlope = (
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    newX: number
): number => {
    const m = (p1.y - p2.y) / (p1.x - p2.x);
    const b = p1.y - m * p1.x;

    return m * newX + b;
};
