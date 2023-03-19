import { findProductIncentives } from './incentives-engine.js'

const session = {
  'id': 'fb79f9a8-bc5e-423a-83e0-658411387d6f',
  'userId': 'd5bf5bae-f6c6-4dda-b328-74fd30658b03',
  'contractorId': 'dd4e55e4-bdd3-11ed-9a5f-3aebb006c675',
  'startTime': '2023-03-08T20:14:38.237Z',
  'state': 'initiated',
  'email': 'epmiller8464@gmail.com',
}
const questionMap = {
  '0': {
    'checkedSystemTypes': ['cooling', 'heating'],
    'other': '',
    'otherText': '',
  },
  '1': 'single-family',
  '2': {
    'energyProvider': {
      'id': '0429dd34-bde6-11ed-9a5f-3aebb006c675',
      'name': 'Austin Energy',
      'type': 'electricity',
    },
    'gasProvider': {
      'id': '0429dda2-bde6-11ed-9a5f-3aebb006c675',
      'name': 'Texas Gas',
      'type': 'natural_gas',
    },
    'tankedGasText': '',
  },
  '3': { 'checkedSystemTypes': [], 'nothingOrNotSure': 'nothing' },
  '4': '12',
  '5': { 'incomeLevel': '5', 'otherIncomeValue': '' },
  '6': {
    'priorityList': [
      {
        'id': 5,
        'type': 'Quietness',
        'name': 'Less noisy system',
      },
      { 'id': 7, 'type': 'air-quality', 'name': 'Improve indoor air quality' },
      { 'id': 3, 'type': 'emissions', 'name': 'Reduce carbon emissions' },
      { 'id': 6, 'type': 'Speed', 'name': 'Quicker replacement' },
      {
        'id': 2,
        'type': 'energy',
        'name': 'Reduce monthly energy/utility bills',
      },
      { 'id': 4, 'type': 'comfort', 'name': 'Improve home\'s comfort' },
      { 'id': 1, 'type': 'cost', 'name': 'Lower upfront cost' }],
    'originalList': [{ 'type': 'temp' }],
  },
  '7': {
    'address1': '7700 Linnie Lane',
    'address2': '',
    'city': 'Austin',
    'state': 'TX',
    'country': 'US',
    'postalCode': '78724',
  },
}

const productIncentives = findProductIncentives(session, questionMap)
console.log(productIncentives)
