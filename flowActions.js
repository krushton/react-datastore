//https://github.com/FranciscoMendes10866/soav/tree/master/src <---where I got this idea from
import { GUID, extractIdxAndPath, generateLoremIpsum } from '../../utils/helpers';
import { diffFlows } from '../../utils/FlowDiffer';

const buildCard = (template) => {
  let card = { ...template };
  card.id = GUID();
  card.template = template;
  return card;
}


const buildNote = () => {
  const note = {
    id: GUID(),
    name: 'Note',
    type: 'note',
    inputGroups: [
      {
        name: null,
        fields: [
          {
            name: 'title',
            type: 'text',
            defaultValue: '',
            placeholder: 'Title'
          },
          {
            name: 'content',
            type: 'text',
            defaultValue: '',
            placeholder: 'Here you can write comments and descriptions about your flow'
          },
        ]
      }
    ]
  }
  return note;
}

export const addNoteAtPath = (path) => (dispatch) => {
  dispatch({
    type: "INSERT_CARD_AT_PATH",
    payload: { card: buildNote(), path: path},
  });
 
};

export const addCardAtPath = (template, path) => (dispatch) => {
  dispatch({
    type: "INSERT_CARD_AT_PATH",
    payload: { card: buildCard(template), path: path },
  });
 
};

export const removeEventCard = (path) => (dispatch) => {
  dispatch({
    type: "REMOVE_CARD",
    payload: { path: path },
  });
};

export const removeTriggerCard = () => (dispatch) => {
  dispatch({
    type: "REMOVE_TRIGGER_CARD"
  });
};

export const updateCard = (path, key, data) => (dispatch) => {
  
  dispatch({
      type: "UPDATE_CARD",
      payload: { path: path, key: key, data: data }
  });
 
};

export const updateInlineTrigger = (path, key, data) => (dispatch) => {
  
  dispatch({
      type: "UPDATE_INLINE_TRIGGER",
      payload: { path: path, key: key, data: data }
  });
 
};

export const moveCard = (oldPath, newPath, data) => (dispatch) => {

  const oldPathPieces = extractIdxAndPath(oldPath);
  const newPathPieces = extractIdxAndPath(newPath);
  let cardData = {...data};
  cardData.moved = true;

  let nextPath = newPath;
  if (oldPathPieces.index < newPathPieces.index){
    //moving right
    nextPath = newPathPieces.path + '[' + (newPathPieces.index-1) + ']';
  }  

  dispatch({
    type: "REMOVE_CARD",
    payload: { path: oldPath },
  });

  dispatch({
    type: "INSERT_CARD_AT_PATH",
    payload: { card: cardData, path: nextPath },
  });

}

export const updateTriggerCard = (key, data) => (dispatch) => {
  dispatch({
      type: "UPDATE_TRIGGER_CARD",
      payload: { key: key, data: data }
  });
};

export const setTriggerCard = (template) => (dispatch) => {
  
  let card = { ...template };
  card.template = template;
  card.id = GUID();

  dispatch({
    type: "SET_TRIGGER_CARD",
    payload: card,
  });
};


export const updateScenario = () => (dispatch) => {
  dispatch({
    type: "SET_SCENARIO",
  });
}


export const save = (flowState) => (dispatch) => {

  let diffArray = null;
  let log = '';

  if (flowState.versions && flowState.versions.length > 0){
    //there are previous versions
    const previousVersion = flowState.versions[0];
    const newFlow = { actionCards : flowState.actionCards, triggerCard: flowState.triggerCard };
    diffArray = diffFlows(flowState.versions[0].flow, newFlow);
    const change = diffArray.length > 1 ? ' changes' : ' change';
    log = ' made ' + diffArray.length + change;
  } else {
    //there are no previous versions
    log = ' saved the first version of the flow';
  }
  

  const version = {
    timestamp: new Date(),
    id: flowState.versions.length + 1,
    name: '',
    description: '',
    user: {
      name: 'Janice Lee',
      username: 'j.lee'
    },
    flow: {
      actionCards: flowState.actionCards,
      triggerCard: flowState.triggerCard
    },
    executions: {
      success: 0,
      failed: 0
    },
    changeLog: log,
    changeArray: diffArray
  }

  dispatch({
    type: "SAVE_VERSION",
    payload: version
  })

  dispatch({
    type: "CLEAR_MOVED"
  })
}


function getRandomExecutionTime() {
  return Math.floor(Math.random() * 500) + 200;
}

function fakeDataByType(type){

  switch(type) {
    case 'number':
      return Math.floor(Math.random(100));
    case 'text':
      return generateLoremIpsum(1)
    case 'list':
    case 'objectlist':
      return JSON.stringify([0,0,0,0,0,0,0].map(a => generateLoremIpsum(1)))
    case 'object':
      return JSON.stringify({ "foo": generateLoremIpsum(1), "bar": generateLoremIpsum(1)})
  }
}

function populateDataForCard(card){

  var c = JSON.parse(JSON.stringify(card));

  if (c.inputGroups){
    for (var i = 0; i < c.inputGroups.length; i++){
      for (var j = 0; j < c.inputGroups[i].fields.length; j++){
        c.inputGroups[i].fields[j].value = fakeDataByType(c.inputGroups[i].fields[j].type);
      }
    }
  }

  if (c.outputGroups){

    for (var i = 0; i < c.outputGroups.length; i++){
      for (var j = 0; j < c.outputGroups[i].fields.length; j++){
        c.outputGroups[i].fields[j].value = fakeDataByType(c.outputGroups[i].fields[j].type);
      }
    }
  }
  return c;
}

function addStatusToCard(card, nested) {

  var c = {...card};

  let newStatus = 'Success';
  let statusMessage = '';

  const rand = Math.floor(Math.random() * 10) + 1;

  if (rand === 2 && nested && !card.inlineIterator) {
    newStatus = 'Error';
    statusMessage = generateLoremIpsum(12);
  }

  c.executionData = {
    status: newStatus,
    duration: getRandomExecutionTime(),
    statusMessage: statusMessage,
    timestamp: new Date(),
    id: c.id
  }
  c = populateDataForCard(c);
  return c;
}



export const run = (flowState) => (dispatch) => {

  let lapsedTime = getRandomExecutionTime();
  let triggerCard = {...flowState.triggerCard};
  let newStatus = 'Success';
  let statusMessage = '';
  const id = GUID();

  triggerCard.executionData = {
    status: newStatus,
    duration: lapsedTime,
    timestamp: new Date()
  }

  triggerCard = populateDataForCard(triggerCard);

  const duplicateActionCards = JSON.parse(JSON.stringify(flowState.actionCards));

  let stopped = false;

  for (var i = 0; i < duplicateActionCards.length && !stopped; i++){
    
    var newCard = addStatusToCard(duplicateActionCards[i], false);
    duplicateActionCards[i] = newCard;


    lapsedTime += duplicateActionCards[i].executionData.duration;

    if (duplicateActionCards[i].executionData.status === 'Error') {
      newStatus = 'Error';
      statusMessage = duplicateActionCards[i].executionData.statusMessage;
      stopped = true;
      break;
    }

    //add more swimlanes for each execution
    if (duplicateActionCards[i].inlineIterator){

      var template = duplicateActionCards[i].swimlanes[0];
      duplicateActionCards[i].swimlanes = [];

      var numberOfExecutions = Math.floor(Math.random() * 40) + 3;

      for (var x = 0; x < numberOfExecutions; x++){

        var s = JSON.parse(JSON.stringify(template));
        s.id = GUID();
        s.name = duplicateActionCards[i].name + ': ' +x;
        s.executionData = {
          status: '-',
          timestamp: new Date(),
          duration: lapsedTime,
          id: s.id
        }
        duplicateActionCards[i].swimlanes.push(s);
      }
    }


    if (duplicateActionCards[i].swimlanes && duplicateActionCards[i].swimlanes.length > 0){

      for (var m = 0; m < duplicateActionCards[i].swimlanes.length && !stopped; m++) {

        duplicateActionCards[i].swimlanes[m].executionData.status = 'Success';
        duplicateActionCards[i].swimlanes[m].executionData.timestamp = new Date();
        
        if (duplicateActionCards[i].swimlanes[m].triggerCard) {
          duplicateActionCards[i].swimlanes[m].triggerCard.executionData = {
            status: 'Success',
            duration: getRandomExecutionTime(),
            timestamp: new Date()
          }

          duplicateActionCards[i].swimlanes[m].triggerCard = populateDataForCard(duplicateActionCards[i].swimlanes[m].triggerCard);
        }

        for (var j = 0; j < duplicateActionCards[i].swimlanes[m].actionCards.length && !stopped; j++){

          var newCard2 = addStatusToCard(newCard.swimlanes[m].actionCards[j], true);
          duplicateActionCards[i].swimlanes[m].actionCards[j] = newCard2;

          lapsedTime += duplicateActionCards[i].swimlanes[m].actionCards[j].executionData.duration;

          if (duplicateActionCards[i].swimlanes[m].actionCards[j].executionData.status === 'Error') {

            duplicateActionCards[i].executionData.status = 'Error';
            duplicateActionCards[i].executionData.childError = true;
            duplicateActionCards[i].executionData.statusMessage = duplicateActionCards[i].swimlanes[m].actionCards[j].executionData.statusMessage;

            duplicateActionCards[i].swimlanes[m].executionData.status = 'Error';
            duplicateActionCards[i].swimlanes[m].executionData.statusMessage = newCard.swimlanes[m].actionCards[j].executionData.statusMessage;
            statusMessage = duplicateActionCards[i].swimlanes[m].actionCards[j].executionData.statusMessage;
            duplicateActionCards[i].swimlanes[m].executionData.duration = lapsedTime;
            newStatus = 'Error';
            stopped = true;
            break;
          }

          if (duplicateActionCards[i].swimlanes[m].actionCards[j].inlineIterator) {

            var templateNested = duplicateActionCards[i].swimlanes[m].actionCards[j].swimlanes[0];
            duplicateActionCards[i].swimlanes[m].actionCards[j].swimlanes = [];

            var numEx = Math.floor(Math.random() * 50) + 3;
            for (var y = 0; y < numEx; y++){

              var b = JSON.parse(JSON.stringify(templateNested));
              b.name = duplicateActionCards[i].swimlanes[m].actionCards[j].name + ': ' +y;
              b.id = GUID();
              b.executionData = {
                status: '-',
                timestamp: new Date(),
                duration: getRandomExecutionTime(),
                id: b.id
              }
              duplicateActionCards[i].swimlanes[m].actionCards[j].swimlanes.push(b);
            }
          }

          if (duplicateActionCards[i].swimlanes[m].actionCards[j].swimlanes && duplicateActionCards[i].swimlanes[m].actionCards[j].swimlanes.length > 0) {

            for (var n = 0; n < duplicateActionCards[i].swimlanes[m].actionCards[j].swimlanes.length && !stopped; n++) {

                duplicateActionCards[i].swimlanes[m].actionCards[j].swimlanes[n].executionData.status = 'Success';

                if (duplicateActionCards[i].swimlanes[m].actionCards[j].swimlanes[n].triggerCard) {
                    duplicateActionCards[i].swimlanes[m].actionCards[j].swimlanes[n].triggerCard.executionData = {
                      status: 'Success',
                      duration: getRandomExecutionTime(),
                      timestamp: new Date()
                    }
                }


                for (var k = 0; k < duplicateActionCards[i].swimlanes[m].actionCards[j].swimlanes[n].actionCards.length && !stopped; k++){

                  duplicateActionCards[i].swimlanes[m].actionCards[j].swimlanes[n].executionData.timestamp = new Date();
                  var newCard3 = addStatusToCard(duplicateActionCards[i].swimlanes[m].actionCards[j].swimlanes[n].actionCards[k], true);
                  duplicateActionCards[i].swimlanes[m].actionCards[j].swimlanes[n].actionCards[k] = newCard3;
                  lapsedTime += duplicateActionCards[i].swimlanes[m].actionCards[j].swimlanes[n].actionCards[k].executionData.duration;

                  duplicateActionCards[i].swimlanes[m].executionData.duration = lapsedTime;
                  duplicateActionCards[i].swimlanes[m].actionCards[j].swimlanes[n].executionData.duration = lapsedTime;


                  if (newCard3.executionData.status === 'Error') {
                    duplicateActionCards[i].swimlanes[m].actionCards[j].executionData.status = 'Error';
                    duplicateActionCards[i].swimlanes[m].actionCards[j].executionData.childError = true;  
                    duplicateActionCards[i].swimlanes[m].actionCards[j].swimlanes[n].executionData.status = 'Error';

                    duplicateActionCards[i].swimlanes[m].actionCards[j].swimlanes[n].status = 'Error';

                    duplicateActionCards[i].swimlanes[m].executionData.status = 'Error';
                    duplicateActionCards[i].executionData.status = 'Error';
                    duplicateActionCards[i].executionData.childError = true;


                    statusMessage = duplicateActionCards[i].swimlanes[m].actionCards[j].swimlanes[n].actionCards[k].executionData.statusMessage;
                    duplicateActionCards[i].swimlanes[m].executionData.statusMessage = statusMessage;
                    duplicateActionCards[i].swimlanes[m].actionCards[j].swimlanes[n].executionData.statusMessage = statusMessage;

                    duplicateActionCards[i].swimlanes[m].actionCards[j].executionData.statusMessage = statusMessage;
                    duplicateActionCards[i].swimlanes[m].executionData.statusMessage = statusMessage;
                    duplicateActionCards[i].executionData.statusMessage = statusMessage;

                    newStatus = 'Error';
                    //remove remaining
                    stopped = true;
                    break;
                  }
                }
              }
            }
        }
      }
    }
  }

  
  for (var i = 0; i < duplicateActionCards.length; i++){

    if (!duplicateActionCards[i].inlineIterator && !duplicateActionCards[i].swimlanes) {
      continue;
    }
    //remove outer
    var remove = duplicateActionCards[i].swimlanes.filter(a => a.executionData && a.executionData.status === '-');

    duplicateActionCards[i].swimlanes = duplicateActionCards[i].swimlanes.filter(item => {
      return !remove.includes(item);
    })


    for (var j = 0; j < duplicateActionCards[i].swimlanes.length; j++){
      for (var k = 0; k < duplicateActionCards[i].swimlanes[j].actionCards; k++) {
          if (!duplicateActionCards[i].swimlanes[j].actionCards[k].inlineIterator && !duplicateActionCards[i].swimlanes) {
              continue;
          }

          var removeInner = duplicateActionCards[i].swimlanes[j].actionCards[k].swimlanes.filter(a => a.executionData.status === '-');
          duplicateActionCards[i].swimlanes[j].actionCards[k].swimlanes = duplicateActionCards[i].swimlanes[j].actionCards[k].swimlanes.filter(item => {
            return !removeInner.includes(item);
          })
      }
    }
  }
  
  const execution = {
    executionData: {
      timestamp: new Date(),
      updatedTimestamp: null,
      duration: lapsedTime,
      status: newStatus,
      statusMessage: statusMessage,
      id: id
    },
    id: id,
    user: {
      name: 'Janice Lee',
      username: 'j.lee'
    },
    actionCards: duplicateActionCards,
    triggerCard: triggerCard
  }

  dispatch({
    type: "CREATE_EXECUTION",
    payload: execution
  });

   dispatch({
    type: "SET_EXECUTION_STATE",
    payload: {
      key: 'contextId',
      value: id
    }
  });

   dispatch({
    type: "SET_EXECUTION_STATE",
    payload: {
      key: 'executionId',
      value: id
    }
  });


}

export const clearExecutions = (key, data) => (dispatch) => {
  dispatch({
      type: "CLEAR_EXECUTIONS",
      payload: null
  });
};

export const setExecutionState = (key, value) => (dispatch) => {
  dispatch({
      type: "SET_EXECUTION_STATE",
      payload: {
        key: key,
        value: value
      }
  });
};


export const restoreVersion = (flowState, versionId) => (dispatch) => {

  const versionToRestore = { ...flowState.versions.find(x => x.id === versionId) };
  versionToRestore.id = flowState.versions.length + 1;
  versionToRestore.timestamp = new Date();
  versionToRestore.executions = {
      success: 0,
      failed: 0
  };
  versionToRestore.changeLog = ' restored from a previous version: v' + versionId;
  versionToRestore.changeArray = [];
  dispatch({
    type: "SAVE_VERSION",
    payload: versionToRestore
  })

  dispatch({
    type: "LOAD_VERSION",
    payload: versionToRestore.flow
  })

  return versionToRestore;
}

export const updateVersion = (id, key, data) => (dispatch) => {
  
  dispatch({
      type: "UPDATE_VERSION",
      payload: { id: id, key: key, data: data }
  });
 
};

export const toggleActive = () => (dispatch) => {
  dispatch({
      type: "TOGGLE_ACTIVE",
      payload: {}
  });
 
};
