//https://github.com/FranciscoMendes10866/soav/tree/master/src <---where I got this idea from
/*
export default {
	name: 'New Badge Request',
	description: '',
	folder: 'HR Flows',
	active: false,
	showMappings: false,
	triggerCard: null,
  	actionCards: [],
  	executions: [],
    versions: []
};
*/

export default {
  "name": "Example flow",
  "description": "",
  "folderName": "AtkoChat",
  "isSubfolder": true,
  "active": false,
  "showMappings": false,
  "unsavedChanges": false,
  "executions": [
      {
        "executionData": {
          "timestamp": "2023-01-31T16:52:20.179Z",
          "updatedTimestamp": null,
          "duration": 958,
          "status": "Success",
          "statusMessage": "",
          "id": "ldkh9kr76n5sbcbmidn"
        },
        "id": "ldkh9kr76n5sbcbmidn",
        "user": {
          "name": "Janice Lee",
          "username": "j.lee"
        },
        "actionCards": [
          {
            "id": "ld97web3w48wty31st",
            "type": "function",
            "categoryId": "list",
            "popularFunction": true,
            "description": "Construct a list from multiple inputs",
            "name": "Construct",
            "inputGroups": [
              {
                "name": null,
                "fields": [
                  {
                    "name": "item",
                    "type": "text",
                    "canChangeType": false,
                    "removeable": true,
                    "value": "tempor"
                  },
                  {
                    "name": "item",
                    "type": "text",
                    "canChangeType": false,
                    "removeable": true,
                    "value": "sed"
                  },
                  {
                    "name": "item",
                    "type": "text",
                    "canChangeType": false,
                    "removeable": true,
                    "value": "magna"
                  },
                  {
                    "name": "item",
                    "type": "text",
                    "canChangeType": false,
                    "removeable": true,
                    "value": "elit"
                  }
                ],
                "extensible": true
              }
            ],
            "outputGroups": [
              {
                "name": null,
                "fields": [
                  {
                    "name": "list",
                    "type": "list",
                    "value": "[\"ipsum\",\"et\",\"magna\",\"magna\",\"dolor\",\"adipiscing\",\"sit\"]"
                  }
                ]
              }
            ],
            "template": {
              "id": "function_list_construct",
              "type": "function",
              "categoryId": "list",
              "popularFunction": true,
              "description": "Construct a list from multiple inputs",
              "name": "Construct",
              "inputGroups": [
                {
                  "name": null,
                  "fields": [],
                  "extensible": true
                }
              ],
              "outputGroups": [
                {
                  "name": null,
                  "fields": [
                    {
                      "name": "List",
                      "type": "objectlist"
                    }
                  ]
                }
              ]
            },
            "executionData": {
              "status": "Success",
              "duration": 213,
              "statusMessage": "",
              "timestamp": "2023-01-31T16:52:20.179Z",
              "id": "ld97web3w48wty31st"
            }
          },
          {
            "id": "ldafws03oiyl5zmga5b",
            "name": "Note",
            "type": "note",
            "inputGroups": [
              {
                "name": null,
                "fields": [
                  {
                    "name": "title",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "Title",
                    "value": "dolore"
                  },
                  {
                    "name": "content",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "Here you can write comments and descriptions about your flow",
                    "value": "et"
                  }
                ]
              }
            ],
            "executionData": {
              "status": "Success",
              "duration": 406,
              "statusMessage": "",
              "timestamp": "2023-01-31T16:52:20.179Z",
              "id": "ldafws03oiyl5zmga5b"
            }
          }
        ],
        "triggerCard": {
          "id": "l29nwk56t2dvz7tmgto",
          "type": "trigger",
          "appId": "schedule",
          "name": "Schedule Flow",
          "description": "Flow runs on a schedule, e.g. every hour or Mondays at 9am",
          "schedule": {
            "frequency": "minute",
            "interval": 15,
            "timezone": "America/Los Angeles"
          },
          "outputGroups": [
            {
              "name": "context",
              "fields": [
                {
                  "name": "Current Time",
                  "type": "text",
                  "value": "adipiscing"
                },
                {
                  "name": "Execution ID",
                  "type": "text",
                  "value": "amet"
                }
              ]
            }
          ],
          "template": {
            "id": "trigger_schedule",
            "type": "trigger",
            "appId": "schedule",
            "name": "Schedule Flow",
            "description": "Flow runs on a schedule, e.g. every hour or Mondays at 9am",
            "schedule": {
              "frequency": "minute",
              "interval": 15,
              "timezone": "America/Los Angeles"
            },
            "outputGroups": [
              {
                "name": "context",
                "fields": [
                  {
                    "name": "Current Time",
                    "type": "text"
                  },
                  {
                    "name": "Execution ID",
                    "type": "text"
                  }
                ]
              }
            ]
          },
          "executionData": {
            "status": "Success",
            "duration": 339,
            "timestamp": "2023-01-31T16:52:20.179Z"
          }
        }
      }
    ],
  "executionState": {
    "executionId": null,
    "contextId": null
  },
  "triggerCard": {
    "id": "l29nwk56t2dvz7tmgto",
    "type": "trigger",
    "appId": "schedule",
    "name": "Schedule Flow",
    "description": "Flow runs on a schedule, e.g. every hour or Mondays at 9am",
    "schedule": {
      "frequency": "minute",
      "interval": 15,
      "timezone": "America/Los Angeles"
    },
    "outputGroups": [
      {
        "name": "context",
        "fields": [
          {
            "name": "Current Time",
            "type": "text"
          },
          {
            "name": "Execution ID",
            "type": "text"
          }
        ]
      }
    ],
    "template": {
      "id": "trigger_schedule",
      "type": "trigger",
      "appId": "schedule",
      "name": "Schedule Flow",
      "description": "Flow runs on a schedule, e.g. every hour or Mondays at 9am",
      "schedule": {
        "frequency": "minute",
        "interval": 15,
        "timezone": "America/Los Angeles"
      },
      "outputGroups": [
        {
          "name": "context",
          "fields": [
            {
              "name": "Current Time",
              "type": "text"
            },
            {
              "name": "Execution ID",
              "type": "text"
            }
          ]
        }
      ]
    }
  },
  "altActionCards": [
  {
    "id": "ld9egki88altdqhzspb",
    "type": "function",
    "categoryId": "text",
    "popularFunction": true,
    "description": "Combine a list of text into a single string",
    "name": "Concatenate",
    "inputGroups": [
      {
        "name": null,
        "fields": [
          {
            "name": "text 1",
            "type": "text",
            "required": true,
            "value": "https://api.atko.biz"
          },
          {
            "name": "text 2",
            "type": "text",
            "required": true,
            "value": "/get_users?offset="
          }
        ],
        "extensible": true
      }
    ],
    "outputGroups": [
      {
        "name": null,
        "fields": [
          {
            "name": "output",
            "type": "text"
          }
        ]
      }
    ],
    "template": {
      "id": "function_text_concat",
      "type": "function",
      "categoryId": "text",
      "popularFunction": true,
      "description": "Combine a list of text into a single string",
      "name": "Concatenate",
      "inputGroups": [
        {
          "name": null,
          "fields": [
            {
              "name": "text 1",
              "type": "text",
              "required": true
            },
            {
              "name": "text 2",
              "type": "text",
              "required": true
            }
          ],
          "extensible": true
        }
      ],
      "outputGroups": [
        {
          "name": null,
          "fields": [
            {
              "name": "output",
              "type": "text"
            }
          ]
        }
      ]
    }
  },
  {
    "id": "ldafws03oiyl5zmga5b",
    "name": "Note",
    "type": "note",
    "inputGroups": [
      {
        "name": null,
        "fields": [
          {
            "name": "title",
            "type": "text",
            "defaultValue": "",
            "placeholder": "Title",
            "value": "<----- URL to query"
          },
          {
            "name": "content",
            "type": "text",
            "defaultValue": "",
            "placeholder": "Here you can write comments and descriptions about your flow",
            "value": "The URL to the left expects a GET request in the format \n/get_users?offset=X where X is the row index of the first item to retrieve\n\nThis API returns 10 names at a time as a simple JSON string array: \n[ \n “Joe Chang”,\n“Maria Baker”,\n“Lee Winslow”,\n …\n ] \n\nUse the While card to query the API for users 10 at a time until there are none remaining. For each page of data, send yourself a slack message with the names returned from the API. "
          }
        ]
      }
    ]
  }
],
  "actionCards": [
  {
  "id": "ld97web3w48wty31st",
  "type": "function",
  "categoryId": "list",
  "popularFunction": true,
  "description": "Construct a list from multiple inputs",
  "name": "Construct",
  "inputGroups": [
    {
      "name": null,
      "fields": [
        {
          "name": "item",
          "type": "text",
          "canChangeType": false,
          "removeable": true,
          "value": "Abby Alston"
        },
        {
          "name": "item",
          "type": "text",
          "canChangeType": false,
          "removeable": true,
          "value": "Barry Baker "
        },
        {
          "name": "item",
          "type": "text",
          "canChangeType": false,
          "removeable": true,
          "value": "Chris Carlington"
        },
        {
          "name": "item",
          "type": "text",
          "canChangeType": false,
          "removeable": true,
          "value": "Devi Dall"
        }
      ],
      "extensible": true
    }
  ],
  "outputGroups": [
    {
      "name": null,
      "fields": [
        {
          "name": "list",
          "type": "list"
        }
      ]
    }
  ],
  "template": {
    "id": "function_list_construct",
    "type": "function",
    "categoryId": "list",
    "popularFunction": true,
    "description": "Construct a list from multiple inputs",
    "name": "Construct",
    "inputGroups": [
      {
        "name": null,
        "fields": [],
        "extensible": true
      }
    ],
    "outputGroups": [
      {
        "name": null,
        "fields": [
          {
            "name": "List",
            "type": "objectlist"
          }
        ]
      }
    ]
  }
},
{
        "id": "ldafws03oiyl5zmga5b",
        "name": "Note",
        "type": "note",
        "inputGroups": [
          {
            "name": null,
            "fields": [
              {
                "name": "title",
                "type": "text",
                "defaultValue": "",
                "placeholder": "Title",
                "value": "<------ outputs a list"
              },
              {
                "name": "content",
                "type": "text",
                "defaultValue": "",
                "placeholder": "Here you can write comments and descriptions about your flow",
                "value": "For each item in the list on the left, send yourself a Slack direct message with the name"
              }
            ]
          }
        ]
      }
  ],
  "versions": []
}