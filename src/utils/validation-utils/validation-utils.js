
export const isEmpty = (input) => {
    if (input == null || input.trim() === "") {
        return true;
    }
    return false;
}

export const isValidMinimumLength = (input, MIN_LENGTH) => {

    return !(input == null || input.trim().length < MIN_LENGTH);
}

export const isValidMaximumLength = (input, MAX_LENGTH) => {
   return !(input != null && input.length > MAX_LENGTH);
}

export const isValidContent = (input, REGEX, matchingFlag = true) => {
   return matchingFlag? REGEX.test(input):!REGEX.test(input);
    
}



