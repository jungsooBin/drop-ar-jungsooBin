/*After we make OAuth call to FB, FB sends back a user object. The object needs to be processed to fit our model so we can sign up/sign in the user.*/

function processFBData(user){
  let userModel = {}
  const space = user.displayName.indexOf(" ")
  const fakeEmail = user.displayName.split(" ").join('') + "@facebook.com"

  //Assigning values to Obj.
  userModel.firstName = user.displayName.slice(0, space)
  userModel.lastName = user.displayName.slice(space + 1)
  userModel.email = user.email ? user.email : fakeEmail
  userModel.terms = true

  return userModel
}

module.exports = processFBData 