const pageNumber = (state = 1, action) => {
    if(action.type === 'INCREMENT'){
            return state + 1;
    }
    else{
        return state;
    }
}

export default pageNumber;