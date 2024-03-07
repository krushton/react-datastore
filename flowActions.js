//https://github.com/FranciscoMendes10866/soav/tree/master/src <---where I got this idea from

export const addFlow = (data) => (dispatch) => {
  dispatch({
    type: "ADD_FLOW",
    payload: { flow: data },
  });
 
};
