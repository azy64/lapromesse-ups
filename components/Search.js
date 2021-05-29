import React from "react";
import {Button, TextInput,TouchableOpacity,View,Text} from 'react-native';
import {connect} from 'react-redux';
//import TextInputMask from 'react-native-text-input-mask';
import MaskInput from 'react-native-mask-input';

class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            datum:[],
            text:""
        }
        this.tmp="";
    }
    
    findData=(value)=>{
        fetch(this.props.url+"search-by-binder/"+value)
        .then(re=>re.json())
        .then(data=>{
            console.log("data loading:",data);
            if(data!== this.state.datum)
                this.setState({datum:data});
        })
    }
    ScreenPackage=()=>{
        let t=[];
        if(this.state.datum.length>0)
        this.state.datum.map((item,index)=>{
            t.push(
                <Text key={index} style={{fontSize:20,padding:10,borderBottomColor:1,borderColor:"gray"}}>{item.codeBare}--{item.libelle}</Text>
            )
        })
        else
            t.push(<Text style={{margin:12,padding:10,fontSize:16,fontWeight:"bold"}}>No Match</Text>)
        return( t);
    }
    render(){
        return(
            <View style={{padding:8}}>
                <TextInput
                onChangeText={(value)=>{
                   this.setState({text:value});
                }}
                style={{width:'100%',height:40,fontWeight:"bold",padding:5,borderWidth:1,borderColor:"grey"}}
                 />
                 <Button title="Search" onPress={()=> this.findData(this.state.text)
                 } />
                <TouchableOpacity>
               
                 {
                     this.ScreenPackage()
                 }

                </TouchableOpacity>
            </View>
        )
    }
}
const mapStateToProps=(state)=>{
    return state;
}
export default connect(mapStateToProps)(Search);