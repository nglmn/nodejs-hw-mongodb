
const parseType = (type) => {
    const isString = typeof type === 'string';
    if (!isString) return;
    const isContactType = (type) => ['home', 'personal'].includes(type);

    return isContactType(type) ? type : null;
};

const parseIsFavourite = (boolean) => {
    const isBoolean = typeof boolean === "boolean";
    if (!isBoolean) return;
    return boolean;
};

export const parseFilterParams = (query) => {
    const { isFavourite, type } = query;

    const parsedFavourite = parseIsFavourite(isFavourite);
    const parsedContactType = parseType(type);

    return {
        isFavourite: parsedFavourite,
        type: parsedContactType
    };
};
