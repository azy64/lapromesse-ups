import React from "react";
import {Button, TextInput,TouchableOpacity,View,Text} from 'react-native';
import {connect} from 'react-redux';
import ItemToDelete from './ItemToDelete';
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
    
    remove=()=>{
        //console.log("suppression des données...");
        if(this.props.removal.length==0) return "";
        let ids=this.props.removal.join("-");
        //console.log("data joined:",ids);
        fetch(this.props.url+ids+"/remove")
        .then(re=>re.json())
        .then(data=>{
            console.log("reponse server:",data.result);
            if(data.result=="success"){
                this.props.removal.map(el=>{
                    let d=this.state.datum;
                    d=d.filter(item=>item.id!=el);
                    this.setState({datum:d});
                });
                //console.log("voici d:",this.state.datum);
                
                const action={type:'NONE_TO_REMOVE'}
                this.props.dispatch(action);
                //console.log("data removal:",this.props.removal)
                alert("DATA REMOVED  SUCCESSEFULLY")
            }
                
        })
        .catch(errror=>{
            alert("SOME ERRORS OCCURED! PLEASE CHECK YOUR CONNECTION");
        });
    }
    findData=(value)=>{
        if(value.length==0) return "";
        fetch(this.props.url+"search-by-binder/"+value)
        .then(re=>re.json())
        .then(data=>{
            //console.log("data loading:",data);
            if(data!== this.state.datum)
                this.setState({datum:data});
        })
    }
    ScreenPackage=()=>{
        let t=[];
        if(this.state.datum.length>0){
            this.state.datum.map((item,index)=>{
                t.push(
                    <ItemToDelete key={index} id={item.id} codeBare={item.codeBare} libelle={item.libelle}/>
                )
            });
            t.push(<Button key={2324}title="Remove" color="red" onPress={this.remove}/>)
        }
        
        else
            t.push(<Text key={1} style={{margin:12,padding:10,fontSize:16,fontWeight:"bold"}}>No Match</Text>)
        return( t);
    }
    render(){
        return(
            <View style={{padding:8}}>
                <TextInput
                onChangeText={(value)=>{
                   this.setState({text:value});
                }}
                style={{width:'100%',height:40,fontWeight:"bold",padding:5,borderWidth:1,borderColor:"grey",marginBottom:5}}
                 />
                 <Button title="Search" onPress={()=> this.findData(this.state.text)
                 } 
                 color="#ED008C"
                 style={{fontSize:20,fontWeight:"bold"}}
                 />
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