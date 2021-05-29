import React from 'react';
import {View, Text, TextInput,Image, ImageBackground, Button,TouchableOpacity} from 'react-native';
import { State } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import {styles} from "../Styles/Styles";

class Menu extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            loading:false
        }
    }
    go=(menu)=>{
        //console.log("voici la valeur de user:",this.props.navigation.getParam('user'));
        this.props.navigation.navigate(""+menu,{user:this.props.navigation.getParam('user')});
    }
    loadData=()=>{
        this.setState({loading:true});
        const action1={type:'REINITIALIZE_DATA'};
        this.props.dispatch(action1);
        //console.log("...");
        fetch(this.props.url)
        .then(re=>re.json())
        .then(data=>{
            //console.log("loading data stem 1...");
            data.map((item,index)=>{
                const action={type:"ADD_CODE_BAR",value:item.codeBare,libelle:item.libelle};
                this.props.dispatch(action);
            })
            this.setState({loading:false});
        })
        .catch(error=>{
            this.setState({loading:false});
        })
    }
    componentDidMount(){
        this.loadData();
    }
    loading=()=>{
        if(this.state.loading==false)
            return  <Image source={require("../assets/reload.png")} style={{width:50,height:50,margin:"auto",marginLeft:"40%",marginTop:5}}/>
        else
            return  <Text style={{fontSize:25,color:"#fff",lineHeight:40,textAlign:"center",paddingBottom:2}} >Reloading ...</Text>
                           
    }

    render(){
        return(
            <View style={{flex:1}}>
                <ImageBackground source={require("../assets/Dance.png")} style={styles.backgroundContainer}>
                    <View style={styles.logoContainer}>
                        <Image source={require("../assets/true_logo.png")} style={styles.logo}/>
                    </View>
                    <View style={styles.form}>
                    <TouchableOpacity style={styles.formButton} onPress={()=>{this.go("ScannerCode")}}>
                            <Text style={{fontSize:25,color:"#fff",lineHeight:40,textAlign:"center",paddingBottom:2}} >
                            <Image source={require("../assets/scanner.png")} style={{height:40}}/>
                            </Text>
                            
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.formButton} onPress={()=>{this.loadData()/*go("ScannerCode")*/}} >
                            {this.loading()}
                            
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.formButton} onPress={()=>{this.go("Search")}}>
                            
                        <Image source={require("../assets/search.png")} style={{width:50,height:50,margin:"auto",marginLeft:"40%",marginTop:5}}/>

                            
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.formButton} onPress={()=>{this.go("Config")}}>
                            <Image source={require("../assets/settings.png")} style={{width:70,height:50,margin:"auto",marginLeft:"40%",marginTop:5}}/>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                
                
            </View>
        )
    }
}
const mapStateToProps=(state)=>{
    return state;
}
export default connect(mapStateToProps)(Menu);