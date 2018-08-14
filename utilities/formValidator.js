const formValidator = (obj, key) => {
  if (key === "firstName"){
    return typeof key === "string" && obj[key].length > 0
  } else if (key === "lastName"){
    return typeof key === "string" && obj[key].length > 0
  } else if (key === "password"){
    return obj[key].length >= 8
  } else if (key === "rePassword"){
    return obj[key] === obj["password"]
  } else if (key === "terms"){
    return obj[key]
  }
}

const checkEachField = (validatorFunc, obj) => {
  for (let key in obj){
    if (!validatorFunc(obj, key)){
     return false
    }
  }
  return true
}

export {
  formValidator,
  checkEachField
}