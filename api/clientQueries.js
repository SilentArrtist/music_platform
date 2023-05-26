export const trackQuery = (trackId) => {
    const query = `*[_type == "track" && _id == '${trackId}']{
        picture{
            asset -> {
                url
            }
        },
        audio,
        _id,
        name,
        artist,
        text,
        listens,
        comments[]{
            _key,
            username,
            text,
        }
    }`;
    return query;
}

export const searchQueryFunction = (searchTerm) => {
    const query = `*[_type == "track" && name match '${searchTerm}*' || artist match '${searchTerm}*' || text match '${searchTerm}*'] {
        picture{
            asset -> {
                url
            }
        },
        audio{
            asset -> {
                file
            }
        },
        _id,
        name,
        artist,
        text,
        listens,
        
        postedBy -> {
            _id,
            userName,
            image
        },
        comments[]{
            _key,
            coment -> {
                _id,
                username,
                text,
            }
        }
    }`;

    return query;
}

export const feedQuery = () => {
    const query = `*[_type == "track"] {
        picture{
            asset -> {
                url
            }
        },
        audio,
        _id,
        name,
        artist,
        text,
        listens,
        comments[]{
            _key,
            coment -> {
                _id,
                username,
                text,
            }
        }
    }`;
    return query;
}
