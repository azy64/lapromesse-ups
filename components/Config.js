import React from "react";
import {Button, TextInput,TouchableOpacity,View,Text} from 'react-native';
import {connect} from 'react-redux';
//import TextInputMask from 'react-native-text-input-mask';
import MaskInput from 'react-native-mask-input';

class Config extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            url:"http://192.168.1.98/lapromesse/public/",
        }
        this.text="";
    }
    
    
    render(){
        return(
            <View style={{padding:8}}>
                <Text style={{fontWeight:"bold",fontSize:15,paddingLeft:13}}>Api Link</Text>
                <TextInput 
                onChangeText={value=>{
                    let regex=/^http(s)?:\/\/([a-zA-Z ]+)/
                    if(value.match(regex)){
                        let action={type:'CHANGE_uRL',value:value}
                        this.props.dispatch(action);
                        console.log("il respecte le deal:",value);
                    }
                    else
                        console.log("il ne respecte pas le deal");
                    this.text=value;
                }} 
                placeholder={this.props.url} style={{height:40,borderColor:"black",paddingLeft:7,margin:15}}/>
            </View>
        )
    }
}
const mapStateToProps=(state)=>{
    return state;
}
export default connect(mapStateToProps)(Config);