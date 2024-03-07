//https://github.com/FranciscoMendes10866/soav/tree/master/src <---where I got this idea from
import produce from 'immer';

export default (state, { payload, type }) => {

  switch (type) {

    case "ADD_FLOW":
      return produce(state, (draft) => {
        //payload.flow, payload.key, payload.data

        draft.flows.push(flow);
  
    default:
      return state;
  }
};
