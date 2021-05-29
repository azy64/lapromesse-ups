import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {connect} from 'react-redux';
import axios from "axios";

 class ScannerCode extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data:[],
            type:"",
            hadPermission:false,
            scanned:false,
            lettreOfDay:"Z"
        }
       // console.log(props);
    }
    getLetterOfDay=()=>{
        let d= new Date()
        let n=d.getDay();
        let lettre="Z";
        if(n<1 || n>6){
            return lettre;
        }
        switch(n){
            case 1:
                return "A";
            case 2:
                return "B";
            case 3:
                return "C";
            case 4:
                return "D";
            case 5:
                return "E";
            case 6:
                return "F";                

            default:
                return "Z"
        }

        console.log("le number of day:",d.getDay());
    }
    componentDidMount(){
        this.setState({lettreOfDay: this.getLetterOfDay()})
        const t= BarCodeScanner.requestPermissionsAsync();
        t.then(retour=>{
            this.setState({scanned:retour.status=="granted"})
        })
    }
    handleBarCodeScanned = ({ type, data }) => {
        this.setState({scanned:true});
        let tmp=this.state.data;
        //this.setState({data:data,type:type})
        const action={type:"ADD_CODE_BAR",value:data,libelle:this.state.lettreOfDay+""+this.props.counted};
        if(action.value.indexOf("1Z")!=-1){
            this.props.dispatch(action);
            alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        }
        
        //tmp.push(action.value+" "+action.libelle);
        //this.setState({data:tmp});
        
      }
    attributeLabel=()=>{
          let tab=[]
          this.props.dataScanned.map((item,index)=>{
              tab.push(<Text style={{color:"white",fontWeight:"bold",fontSize:18}} key={index}>{item}</Text>)
          })
          return tab;
    }
    saveData=()=>{
        
        let ch="";
        let data=[];
        this.props.dataScanned.map((item)=>{
            let ob={}
            let d=item.split("-");
            ob.codeBar=d[0];
            ob.libelle=d[1];
            ch+=ob.codeBar+"-"+ob.libelle+"??";
            data.push(ob)
        })
        //data=JSON.stringify(data);
       // console.log("l'objet ob:",data);
        
        console.log("url:",this.props.url);
        fetch(this.props.url+"save-package?data="+ch)
        .then(r=>{
            //console.log("voici r:",r);
            return r.json()
        })
        .then(d=>{
            if(d=="ok")
                alert("we saved data")
            console.log("données sauvegardées:",d);
    })

    }

    render(){
        return(
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                {this.state.scanned && <Button title={'Tap to Scan Again'} onPress={() => this.setState({scanned:false})} />}
                <Text style={{color:"green",fontWeight:"bold",fontSize:16,padding:8}}>packages scanned:{this.props.dataScanned.length} == letter of the day:{this.state.lettreOfDay}</Text>
                <Button title="Finish the scan" style={{marginTop:100,border:"red"}} onPress={this.saveData}/>
                <ScrollView style={{marginHorizontal: 10,marginBottom:58 ,height:10}}>
                    <TouchableOpacity style={{padding:5,paddingLeft:15,borderWidth:1,borderColor:"white"}}>
                        {this.attributeLabel()}
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
  });
  const mapStateToProps=(state)=>{
      return state;
  }
 export default connect(mapStateToProps)(ScannerCode); 