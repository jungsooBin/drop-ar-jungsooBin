import React, {Component} from "react"
import { FormLabel, FormInput, FormValidationMessage, Text, CheckBox} from 'react-native-elements' 
// import ValidationComponent from 'react-native-form-validator';
import {View} from 'react-native'
import Button from './Button'
import axios from 'axios'
import {formValidator, checkEachField} from '../utilities/formValidator'

class SignUpForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rePassword: '',
      terms: false,
      // formErrs: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event){
    event.preventDefault()
    //Post new user in DB
   
    if(checkEachField(formValidator, this.state)){
      try{
        console.log("CLICKED")
        await axios.post('http://localhost:8080/api/user/signup', {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
          terms: this.state.terms
        })
      } catch(err){
          console.log(err)
      }
  
      this.setState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rePassword: '',
        terms: false
      })

    } else {
      
    }
  } 
  


    
    // Some event that: [ (i) validates form, (ii) if valid info sent to backend, (iii) if not, sends err message], 
  

  render(){
    const {terms} = this.state
     
    return (
      <View style={styles.container}>

      <Text h1 style={styles.heading}>Sign Up</Text>
        <FormLabel>First Name</FormLabel>
        <FormInput value={this.state.firstName} onChangeText={firstName => this.setState({firstName})} required={true}/>

        <FormLabel>Last Name</FormLabel>
        <FormInput value={this.state.lastName} onChangeText={lastName => this.setState({lastName})}/>

        <FormLabel>Email</FormLabel>
        <FormInput value={this.state.email} onChangeText={email => this.setState({email})}/>

        <FormLabel>Password</FormLabel>
        <FormInput value={this.state.password} onChangeText={password => this.setState({password})}/>

        <FormLabel>Re-Enter Password</FormLabel>
        <FormInput value={this.state.rePassword} onChangeText={rePassword => this.setState({rePassword})}/>

        <CheckBox title='Terms and Conditions' checked={this.state.terms} onPress={() => this.setState(
          {terms: !terms})} />

        <Button onPress={this.handleSubmit}>Submit</Button>

      </View>
    )
  }
}



//Styles
const styles = {
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: '#ffffff',
    // top: -50
  },
  heading: {
  top: -40
  }
};

export default SignUpForm