export const userQuery = (userId)=>{
    // here 8 represent document means get the the document whose type is user and id is which ever comes
    const query = `*[_type == "user" && _id == '${userId}']`
    return query
}

export const searchQuery = (searchTerm)=>{
    // here * after } means it start searching without full searchTerm coming
    const query = `*[_type =="pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
            asset ->{
                url
            }
        },_id,
        destination,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[]{
            _key,
            postedBy -> {
                _id,
                userName,
                image
            }
        }

    }`
    return query
}

export const FeedQuery = `*[_type == "pin"] | order(_createAt desc){
    image{
        asset ->{
            url
        }
    },_id,
    destination,
    postedBy -> {
        _id,
        userName,
        image
    },
    save[]{
        _key,
        postedBy -> {
            _id,
            userName,
            image
        }
    }

}`