const {expect} = require('chai')
const {formValidator, checkEachField} = require('./formValidator')

describe('Tests for form validator file', () => {

  describe('formValidator function', () => {

    //Function Signature
    it('returns true if formValidator takes two parameters', () => {
      expect(formValidator.length).to.equal(2)
    })

    //First Name Property
    it('returns true if firstName is a string', () => {
      expect(formValidator({firstName: 'test'}, 'firstName')).to.equal(true)    
    })

    it('returns false if firstName is not a string', () => {
      expect(formValidator({firstName: 123}, 'firstName')).to.equal(false)
    })

    it('returns false if firstName an empty string', () => {
      expect(formValidator({firstName: ''}, 'firstName')).to.equal(false)
    })

    //Last Name Property
    it('returns true if lastName is a string', () => {
      expect(formValidator({lastName: 'test'}, 'lastName')).to.equal(true)    
    })

    it('returns false if lastName is not a string', () => {
      expect(formValidator({lastName: 123}, 'lastName')).to.equal(false)
    })

    it('returns false if lastName an empty string', () => {
      expect(formValidator({lastName: ''}, 'lastName')).to.equal(false)
    })

    //Email Property
    it('returns false if email is not a valid email', () => {
      expect(formValidator({email: 'asdf'}, 'email')).to.equal(false)
    })

    //Password
    it('returns false if the password is less than 8 characters', () => {
      expect(formValidator({password: '1234'}, 'password')).to.equal(false)
    })

    //Re-Enter Password
    it('returns false if the re-entered password is different from password', () => {
      let passwordTest = {
        password: '12345678', 
        rePassword: '12345679'
      }
      expect(formValidator(passwordTest, "rePassword")).to.equal(false)
    })

    //Terms
    it('returns false if the terms box is not checked', () => {
      expect(formValidator({terms: false}, 'terms')).to.equal(false)
    })

  })

  describe('checkEachField function', () => {

    it('returns an array', () => {
      expect(Array.isArray(checkEachField())).to.equal(true)
    })
  })

  describe('individualizedErrMsg function', () => {

    it('returns an array', () => {
      expect(Array.isArray(checkEachField())).to.equal(true)
    })
  })

})