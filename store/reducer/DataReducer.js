const init={
    dataScanned:[],
    counted:1,
    url:"http://192.168.1.98/lapromesse/public/"
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
        default:
            return state;
    }
}
export default ChangeStore;