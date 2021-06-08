const init={
    dataScanned:[],
    counted:1,
    //url:"http://192.168.1.98/lapromesse/public/"
    //url:"http://192.168.1.129/lapromesse/public/",
    url:"http://192.168.1.88/public/",
    removal:[],
};

function ChangeStore(state=init,action){
    let nextState;
    //console.log("action:",action);
    switch(action.type){
        case 'ADD_CODE_BAR':
            //console.log("nous sommes dans le cas desiré");
            const index_wanted=state.dataScanned.findIndex(item=> item.split("-")[0]==action.value/*+"-"+action.libelle*/)
           // console.log("index cherché:",index_wanted);
            if(index_wanted==-1){
                nextState={
                    ...state,
                    dataScanned:[...state.dataScanned,action.value+"-"+action.libelle],
                    counted:state.counted+1
                }
                //nextState=state;
                //nextState.dataScanned.push(action.value);
                //console.log("nexState:",nextState.dataScanned);
            }
                
            return nextState || state;
        case 'REINITIALIZE_DATA':
            nextState={
                ...state,
                dataScanned:[],
                counted:1
            }
            return nextState
        case 'CHANGE_uRL':
                nextState={
                    ...state,
                   url:action.value
                }
            return nextState
        case 'PUT_TO_REMOVE':
            const pos=state.removal.findIndex(item=> item==action.value)
            //console.log("valeur de pos:",pos);
            if(pos==-1){
                nextState={
                    ...state,
                    removal:[...state.removal,action.value]
                }  
            }
            else{
                nextState={
                    ...state,
                    removal:state.removal.filter(item=>item!==action.value)
                }
            }
                
            return nextState || state;
        case 'NONE_TO_REMOVE':
                
                nextState={
                        ...state,
                        removal:[]
                    }                      
            return nextState;
        case 'PUT_COUNT_TO_ONE':
            nextState={
                        ...state,
                        counted:1
                    }                      
            return nextState;    
        default:
            return state;
    }
}
export default ChangeStore;