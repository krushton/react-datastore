//https://github.com/FranciscoMendes10866/soav/tree/master/src <---where I got this idea from
import produce from 'immer';
import { extractIdxAndPath, removeKeyFromObject, objectByString, GUID } from '../../utils/helpers';


export default (state, { payload, type }) => {

  switch (type) {

    case "UPDATE_CARD":
      return produce(state, (draft) => {
        //payload.path, payload.key, payload.data
        const pathData = extractIdxAndPath(payload.path); 

        if (pathData.path.length > 0){
          //nested path
          console.log(pathData.path);
          let list = objectByString(draft.actionCards, pathData.path);

          list[pathData.index][payload.key] = payload.data;
        } else {
          //root path
          draft.actionCards[pathData.index][payload.key] = payload.data;
        }
         draft.unsavedChanges = true;
     });
    case "UPDATE_INLINE_TRIGGER":
      return produce(state, (draft) => {
        //payload.path, payload.key, payload.data
        const item = objectByString(draft.actionCards, payload.path); 
        item[payload.key] = payload.data;

        const indexStr = payload.path.split('.')[0].replace('[','').replace(']','');
        const index = parseInt(indexStr);
        draft.actionCards[index].swimlanes[0].triggerCard = item;
         draft.unsavedChanges = true;
        //draft.actionCards[pathData];
     });

    case "UPDATE_TRIGGER_CARD":
      return produce(state, (draft) => {
        draft.triggerCard[payload.key] = payload.data;
         draft.unsavedChanges = true;
      });
      
    case "INSERT_CARD_AT_PATH":
      return produce(state, (draft) => {     
        const pathData = extractIdxAndPath(payload.path);

        if (pathData.path.length > 0){
          //nested path
          let obj = objectByString(draft.actionCards, pathData.path);
          obj.splice(pathData.index, 0, {...payload.card });
        } else {
          //root path
          draft.actionCards.splice(pathData.index, 0, {...payload.card });
        }
         draft.unsavedChanges = true;
        
      });
    case "REMOVE_CARD":
      return produce(state, (draft) => {

        const pathData = extractIdxAndPath(payload.path);
        if (pathData.path.length > 0){
          let obj = objectByString(draft.actionCards, pathData.path);
          obj.splice(pathData.index, 1);
        } else {
          draft.actionCards.splice(pathData.index, 1);
        }
         draft.unsavedChanges = true;
      });
    case "SET_TRIGGER_CARD":
      return produce(state, (draft) => {
        draft.triggerCard = payload;
         draft.unsavedChanges = true;
      });
    case "REMOVE_TRIGGER_CARD":
      return produce(state, (draft) => {
        draft.triggerCard = null;
         draft.unsavedChanges = true;
      });
    case "LOAD_VERSION":
      return produce(state, (draft) => {
        draft.triggerCard = payload.triggerCard;
        draft.actionCards = payload.actionCards;
      });
    case "SAVE_VERSION": 
      return produce(state, (draft) => {
        draft.versions.unshift(payload);
         draft.unsavedChanges = false;
      });
    case "CLEAR_MOVED":
      return produce(state, (draft) => {
       //walk through tree and set all cards to moved false
       removeKeyFromObject(draft.actionCards, 'moved');
      });

    case "CREATE_EXECUTION":
      return produce(state, (draft) => {
       draft.unsavedChanges = false;
       draft.active = true;
       draft.executions.unshift(payload);
    });

    case "UPDATE_EXECUTION":
      return produce(state, (draft) => {
        const execution = draft.executions.find((execution) => execution.id === payload.id);
        execution[payload.key] = payload.data;
    });

    case "TOGGLE_ACTIVE":
      return produce(state, (draft) => {
        draft.active = !draft.active
    });

    case "CLEAR_EXECUTIONS":
      return produce(state, (draft) => {
        draft.executions = [];
    });

    case "SET_EXECUTION_STATE":
      return produce(state, (draft) => {
        draft.executionState[payload.key] = payload.value
    });

    case "SET_SCENARIO":
      return produce(state, (draft) => {
        draft.actionCards = draft.altActionCards;
        draft.executions = [];
    });

    case "UPDATE_VERSION":
      return produce(state, (draft) => {
        //payload.id, payload.key, payload.data
        const version = draft.versions.find((version) => version.id === payload.id);
        version[payload.key] = payload.data;
      });
    default:
      return state;
  }
};
