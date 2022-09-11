import * as utils from "./validation-utils";


describe("Testing sequence utility functionalities - isValidMinimumLength", () => {

  it("validate that sequence isValidMinimumLength - with chars length < min length", () => {

    let sequence = "atggppppgggggggcctttttt";
    let checkFlag = utils.isValidMinimumLength(sequence,100);
    expect(checkFlag).toEqual(false);
  });

  it("validate that sequence isValidMinimumLength  - with valid chars length > min length", () => {

    let sequence = "atggppppgggggggccttttttatggppppgggggggccttttttatggppppgggggggccttttttatggppppgggggggccttttttatggppppgggggggcctttttt                             333333333333";
    let checkFlag = utils.isValidMinimumLength(sequence,100);
    expect(checkFlag).toEqual(true);
  });

  it("validate that sequence isValidMinimumLength - with valid chars length but when trimmed < min length", () => {
    let sequence = "atggppppgggggggcctttttta                                                                                           ";
    let checkFlag = utils.isValidMinimumLength(sequence,100);
    expect(checkFlag).toEqual(false);
  });
});

describe("Testing sequence utility functionalities - isValidMaximumLength", () => {

  it("validate that sequence isValidMaximumLength - valid sequence length", () => {

    let sequence = "atggpppAAApgggggggcctttttt";
    let checkFlag = utils.isValidMaximumLength(sequence,1000);
    expect(checkFlag).toEqual(true);
  });

  it("validate that sequence isValidMaximumLength - invalid sequence length", () => {

    let sequence = "atggpppAAApgggggggcctttttt";
    let checkFlag = utils.isValidMaximumLength(sequence,5);
    expect(checkFlag).toEqual(false);
  });


});


