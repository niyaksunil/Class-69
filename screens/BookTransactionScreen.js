import * as React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity, TextInput ,Image} from 'react-native';
import * as Permissions from "expo-permissions";
import {BarCodeScanner} from 'expo-barcode-scanner';
import firebase from "firebase";
import db from "../config";

export default class BookTransaction extends React.Component {

  constructor (){
    super();
    this.state = {
      hasCameraPermissions : null,
      scanned  : false,
      scannedBookId : 'BK001',
      scannedStudentId : '',
      buttonState : "normal"
    }
  }

  getCameraPermissions=async(id)=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions : status === "granted",
      buttonState : id,
      scanned : false
    })
  }

  handleBarCodeScanned = async({type,data})=>{
    const {buttonState}= this.state
    if(buttonState === "BookId"){
      this.setState ({
        scanned : true,
        scannedBookId : data,
        buttonState : "normal"
      })
    }else if(buttonState ==="StudentId"){
      this.setState ({
        scanned : true,
        scannedStudentId : data,
        buttonState : "normal"
      })
    }
  }

  handleTransaction = async ()=>{
    console.log("Inside handle transaction");
    db.collection("books").doc(this.state.scannedBookId).get()
    .then((doc)=>{
     // var book = doc.data();
      console.log("******************"+doc.data())
    })
  }

  componentDidMount(){
    console.log("**************************");
  }
  render(){
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    {if(buttonState !== "normal" && hasCameraPermissions ){
      return(
        <BarCodeScanner onBarCodeScanned = {scanned?undefined : this.handleBarCodeScanned}/>
      )
    }else if(buttonState === "normal"){
      return (
        <View style = {styles.container}>
          <View>
            <Image 
            source = {require("../assets/booklogo.jpg")} style = {{width : 200, height : 200}}/>
            <Text style = {{textAlign : "center",fontSize : 30}}>Willy App</Text>
          </View>

          <View style = {styles.inputView}>
            <TextInput style = {styles.inputBox}
            placeholder = "BookId"
            value ={this.state.scannedBookId}
            
            />
            <TouchableOpacity style = {styles.scanButton} 
            onPress = {()=>{
              this.getCameraPermissions("BookId")
            }}>
              <Text>Scan</Text>
          </TouchableOpacity>
          </View>
            
          <View style = {styles.inputView}>
          <TextInput style = {styles.inputBox}
            placeholder = "StudentId"
            value = {this.state.scannedStudentId}
            />
            <TouchableOpacity style = {styles.scanButton} 
            onPress = {()=>{
              this.getCameraPermissions("StudentId")
            }}>
              <Text>Scan</Text>
          </TouchableOpacity>

          </View>
          <TouchableOpacity style = {styles.submitButton}
          onPress = {async ()=>{
            console.log("inside onPress");
             this.handleTransaction()
            }}>
            <Text style = {styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          
        </View>
      );
    }
  }
  }
  
}

const styles = StyleSheet.create({
  container :{
    flex : 1,
    justifyContent : "center",
    alignItems : "center",
    
  },
  displayText :{
    fontSize : 50,
    textDecorationLine : "underline",
     
  },
  scanButton :{
    backgroundColor : "#A456B4",
    width : 50,
    borderWidth : 1.5,
    borderLeftWidth : 0
  },
   buttonText:{
     fontSize : 20
   },
   inputView :{
     flexDirection : "row",
     margin : 20,
   },
   inputBox :{
     width : 200,
     height : 40,
     borderWidth : 1.5,
     fontSize : 20,

   },
   submitButton :{
     backgroundColor : "#fbc02d",
     width : 100,
     height : 50,
    
   },
   submitButtonText:{
     padding : 10,
     textAlign : "center",
     fontSize : 20,
     fontWeight : "bold",
     color : "white"
   }
})

