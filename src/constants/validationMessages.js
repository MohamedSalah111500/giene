export const validationMessages = {
  requiredInputValue:'Please add a value',
  requiredSelectValue:'Please select a value',
  requiredMultipleSelectValue:'Please select at least one value',
  sectionError:'* Please fix the below errors before submitting your input',
  requiredValue: displayName => `Please add valid ${displayName}`,
  minSelection: (displayName, count) => `At least ${count} ${displayName} must be selected`,
  numericValue: displayName => `${displayName?? ''} Only numbers can be used in this search.`,
  minValue: (minValue,display="input",field="field",type="char") => `Please add a valid ${display}, the ${field} shall not be less than ${minValue} ${type}.`,
  maxValue:(maxValue,display="input",field="field",type="char") => `Please add a valid ${display}, the ${field} accepts up to ${maxValue} ${type}.`,
  invalidContent: (displayName) =>`An invalid ${displayName} inserted, please add a valid ${displayName} data.`
};

export const requiredGDNASequence="gDNA sequence is required when feature type is either Promoter or Terminator.";
export const validNumber = (maxValue,type)=>`Please add a valid input, the field accepts up to ${maxValue} ${type}.`;

export const invalidNucleotideSequence="Please add a valid sequence data, only A, C, G, T, N, X characters are accepted, the field also accepts numbers and special characters (*, -) but they will be omitted";
export const invalidProteinSequence="Please add a valid sequence data, only A, B, C, D, E, F, G, H, I, K, L, M, N, P, Q, R, S, T, U, V, W, Y, Z, X characters are accepted, the field also accepts numbers and special characters (*, -) but they will be omitted";

export const featureValidationMessages={
  existingFeature:(value)=>`Sequence is same as sequence for existing feature ${value}.`,
  sameAsNewSequence:(matchingEntities)=>`Sequence is same as sequence entered in ${matchingEntities}.`
};

