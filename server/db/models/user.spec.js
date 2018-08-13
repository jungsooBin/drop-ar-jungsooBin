const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Sequelize = require('sequelize')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('model properties', () => {
    let user

    beforeEach(async () => {
      user = await User.create({
        firstName: "Graf",
        lastName: "Fiti",
        email: "arGraffiti@email.com",
      })
    })
    
    it('returns true if model has firstName property', () => {
      expect(user).to.have.property('firstName')
    })

    it('returns true if firstName is a string', () => {
      expect(user.firstName).to.be.a('string')
    })

    it('returns true if model has lastName property', () => {
      expect(user).to.have.property('lastName')
    })

    it('returns true if lasttName is a string', () => {
      expect(user.lastName).to.be.a('string')
    })

    it('returns true if model has email property', () => {
      expect(user).to.have.property('email')
    })

    it('returns true if email is a string', () => {
      expect(user.email).to.be.a('string')
    })
  })
})