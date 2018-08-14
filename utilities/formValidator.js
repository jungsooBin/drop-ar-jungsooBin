const formValidator = (obj, key) => {
  if (key === "firstName"){
    return typeof key === "string" && obj[key].length > 0
  } else if (key === "lastName"){
      return typeof key === "string" && obj[key].length > 0
  } else if (key === "email"){
      return obj[key].includes('@')
  } else if (key === "password"){
      return obj[key].length >= 8
  } else if (key === "rePassword"){
      return obj[key] === obj["password"]
  } else if (key === "terms"){
      return obj[key]
  }
}

const checkEachField = (validatorFunc, obj) => {
  let invalidEntries = []
  for (let key in obj){
    if (!validatorFunc(obj, key) && key !== 'formErrs'){
      invalidEntries.push(key)
    }
  }
  return invalidEntries
}

const individualizedErrMsg = (errorsArray) => {
  let messages = []

  const messageObj = {
    firstName: 'First name is required.',
    lastName: 'Last name is required.',
    email: 'A valid email is required.', 
    password: 'Password must be at least eight characters.',
    rePassword: 'This field does not match password.',
    terms: 'Please accept our terms and conditions'
  }

  for (let i = 0; i < errorsArray.length; i++){
    messages.push(messageObj[errorsArray[i]])
  }
  return messages
}

export {
  formValidator,
  checkEachField,
  individualizedErrMsg
}