import {StyleSheet} from 'react-native';

export const styles=StyleSheet.create({

    logoContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        marginTop:"1%",
        padding:10,
    },
    logo:{
        width:200,
        height:200,
    },
    form:{
        flex:1,
        padding:10,
    },
    backgroundContainer:{
        flex:1,
        resizeMode:"cover",
        justifyContent:"center",
       // color:"linear-gradient(top, #A7A7A7 0%, #E4E4E4 51%)",
    },
    formInput:{
        height:30,
        backgroundColor:"#fff",
        margin:5,
        borderRadius:3,
        paddingLeft:5,
    },
    formText:{
        color:"white",
        fontSize:28,
        textAlign:"center",
        //fontFamily:"ComicSansMS3",
    },
    formButton:{
        backgroundColor:"#ED008C",
        borderRadius:5,
        width:"86%",
        height:60,
        marginLeft:20,
        margin:6,
        textAlign:"center",
        fontFamily:"Comic"
    },
    backgroundVideo:{
        width:300,
        height:300,
        position:'absolute',
        left:0,
        top:1,
        zIndex:3000,
        borderWidth:1,
    }
});