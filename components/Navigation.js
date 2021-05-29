
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Menu from './Menu';
import ScannerCode from './ScannerCode'; 
import Search from "./Search";
import Config from './Config';
//import MessageTunaweza from '../Components/MessageTunaweza';

const StackNavigator=createStackNavigator({
    /*Connection:{
        screen:Connection,
        navigationOptions:{
            title:"connection",
            headerShown:false,
        }
    },*/
    Menu:{
        screen:Menu,
        navigationOptions:{title:"Menu",
        headerShown:false
    }
    },
    Search:{
        screen:Search,
        navigationOptions:{title:"Search a Package",
            headerShown:true,
        },
    
    },
    ScannerCode:{
        screen:ScannerCode,
        navigationOptions:{title:"Scan the package",headerShown:true}
    },
    Config:{
        screen:Config,
        navigationOptions:{title:"Settings",headerShown:true}
    },
    
});

export default createAppContainer(StackNavigator);