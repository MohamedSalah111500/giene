
// helps function check if value is a number or not
export const isNumeric = (val) => /^-?\d+$/.test(val);

//helps function find object from array by name of props
export const findObjFromArrayByProp = (array, prop, value) => {
    return array.find(v => v[prop] === value);
}

// helps function check if value is a number or not
export const handelDateFormatter = (date, options = { day: '2-digit', month: 'short', year: 'numeric' }) => {
    return new Date(date).toLocaleDateString("en-US", options)
};



// helps function sort ascending or descending and return new array
export const sortMaterials = (list, key) => {
    if (!list || !key) return
    let newList = [...list]

    switch (key) {
        case "ascending":
            return newList.sort((a, b) => (+a.constructName) - (+b.constructName));
        case "descending":
            return newList.sort((a, b) => (b.constructName) - (a.constructName));
        case "nto":
            return newList.sort((a, b) => (new Date(b.handoffDate) - new Date(a.handoffDate)));
        case "otn":
            return newList.sort((a, b) => (new Date(a.handoffDate) - new Date(b.handoffDate)));

        default:
            return newList
    }

}

// helps function filter materials and  return new array
export const filterMaterials = (list, key) => {
    if (!list || !key) return
    let newList = [...list]

    switch (key) {
        case "placed":
            return newList.filter((item) => item.locationId ? true : false);
        case "unplaced":
            return newList.filter((item) => item.locationId ? false : true);
        case "expired":
            return newList.filter((item) => item.expired === true);
        case "all":
            return newList

        default:
            return newList
    }

}
// helps function filter materials and  return new array
export const getMaterialsCategoriesCount = (list, tabList) => {
    if (!list || !tabList) return;
    let newTabList = [...tabList]
    newTabList.map(key => key.count = filterMaterials(list, key.key).length)
    return newTabList
}


// helps function filter by prop name  and  return new array
export const filterByProps = (list, prop, key) => {

    if (!list || !prop || !key) return new Error('you should send all prams to make function work');
    let newList = [...list]
    return newList.filter(item => item[prop].includes(key));
}

// helps function filter by prop name matches and  return new array
export const filterMatchByProps = (list, prop, key) => {

    if (!list || !prop || !key) return new Error('you should send all prams to make function work');
    let newList = [...list]
    return newList.filter(item => item[prop] === key);
}


// helps function filter by date range  and  return new array
export const filterByDateRange = (list, start, end) => {
    if (list && start && end) {
        let newList = [...list];
        let startDate = new Date(start);
        let endDate = new Date(end);

        return newList.filter(a => {
            let date = new Date(a.handoffDate);
            return (date >= startDate && date <= endDate);
        });
    }

}


// helps function Generate list of objects 
export const GenerateDropDownList = (number, name, object = {}) => {
    let newList = []
    for (let i = 0; i < number; i++) {
        newList.push({ ...object, number: i + 1, name: name + ' ' + (i + 1) })
    }
    return newList
}

const generateHorizontalList = (totalPositionsCount) => {
    let rowNum = Math.sqrt(totalPositionsCount)
    var horizontalList = [];
    let number = 0;
    let counter = 0
    for (let i = 0; i < rowNum; i++) {
        number = i + 1
        let row = 0
        for (let y = 0; y < rowNum; y++) {
            counter += 1
            row = number + (y * rowNum);
            horizontalList.push({ [counter]: row });
        }
    }
    return horizontalList
}



// helps function sort list of random numbers in horizontal way base on row length 
export const sortListHorizontal = (positions, totalPositionsCount) => {
    let horizontalList = generateHorizontalList(totalPositionsCount);
    var sortPositionsHorizontal = [];
    let positionsObj = {}

    for (let i = 0; i < positions.length; i++) {
        positionsObj[positions[i].number] = positions[i]
    }

    for (let i = 0; i < horizontalList.length; i++) {
        if (Object.keys(positionsObj).includes(horizontalList[i][i + 1].toString())) {
            sortPositionsHorizontal.push(positionsObj[horizontalList[i][i + 1]])
        }
    }
    return sortPositionsHorizontal
}



// helps function sort list of random numbers in vertical way 
export const sortListVertical = (positions) => {
    return positions.sort((a, b) => +a.number - +b.number);
}


// helps function filter by prop name  and  return new array
export const replaceObjInListByProps = (list, objList, prop) => {

    if (!list || !prop || !objList) return new Error('you should send all prams to make function work');
    let newList = [...list];
    objList.map(obj => {
        const indexOfItemInArray = newList.findIndex(q => q[prop] === obj[prop]);
        if (indexOfItemInArray > -1) {
            newList[indexOfItemInArray] = obj;
        }
    })
    return newList;
}