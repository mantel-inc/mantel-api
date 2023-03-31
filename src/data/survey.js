import {INCENTIVES_SURVEY_DESCRIPTION, INCENTIVES_SURVEY_NAME, INCENTIVES_VERSION} from "../lib/constants/index.js"

export const SEED_SURVEY = {
    name: INCENTIVES_SURVEY_NAME,
    description: INCENTIVES_SURVEY_DESCRIPTION,
    version: INCENTIVES_VERSION,
    // status: STATUSES.ACTIVE,
    // start_time:
    end_time: null,
    session_id: null
}

export const SEED_SURVEY_QUESTIONS = [
    {
        index: 0,
        name: 'SystemType',
        question_text: 'What type of system are you considering buying/replacing?',
        question_response: {
            answer: {"checkedSystemTypes": ["cooling_heating"], "other": "", "otherText": ""}
        },
    },
    {
        index: 1,
        name: 'HomeType',
        question_text: 'What sort of home do you live in?',
        question_response: {answer: 'single-family'},
    },
    {
        index: 2,
        name: 'UtilityProvider',
        question_text: 'Who provides your home with power?',
        question_response: {
            answer: {
                "energyProvider": {
                    "id": "0429dd34-bde6-11ed-9a5f-3aebb006c675",
                    "name": "Austin Energy",
                    "type": "electricity"
                },
                "gasProvider": {
                    "id": "0429dda2-bde6-11ed-9a5f-3aebb006c675",
                    "name": "Texas Gas",
                    "type": "natural_gas"
                },
                "tankedGasText": ""
            }
        },
    },
    // {
    //   id: 3,
    //   name: 'ExistingSystem',
    //   text: 'What do you have today?',
    //   answer: {},
    // },
    {
        index: 3,
        name: 'SystemAge',
        question_text: 'How many years old is your existing system?',
        question_response: {answer: {"systemAge": 12, "notSure": false}},
    },
    {
        index: 4,
        name: 'CustomerIncome',
        question_text: 'What do you estimate your taxable income (after deductions) to be this year?',
        question_response: {answer: {"incomeLevel": "5", "otherIncomeValue": ""}},
    },
    {
        index: 5,
        name: 'CustomerPriority',
        question_text: 'How would you prioritize these factors?',
        question_response: {
            answer: {
                "priorityList": [
                    {"id": 3, "type": "emissions", "name": "Reduce carbon emissions"}, {
                        "id": 4,
                        "type": "comfort",
                        "name": "Improve home's comfort"
                    }, {"id": 5, "type": "quietness", "name": "Quieter system"}, {
                        "id": 6,
                        "type": "max-incentives",
                        "name": "Maximize rebates & incentives"
                    }, {"id": 2, "type": "energy", "name": "Reduce monthly energy bills"}, {
                        "id": 7,
                        "type": "air-quality",
                        "name": "Improve indoor air quality"
                    }, {"id": 1, "type": "cost", "name": "Lower upfront cost"}], "originalList": [{"type": "temp"}]
            }
        },
    },
    {
        index: 6,
        name: 'CustomerAddress',
        question_text: 'What is your home’s address?',
        question_response: {
            answer: {
                "address1": "7700 Linnie Lane",
                "address2": "",
                "city": "Austin",
                "state": "TX",
                "country": "US",
                "postalCode": "78724"
            }
        },
    },

]
