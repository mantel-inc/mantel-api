import { INCOME_LEVEL_OPTIONS } from './component-options.js'

const CUSTOMER_INPUTS = {
  '0': {
    'checkedSystemTypes': ['central_ac', 'furnace'],
    'heatPumpOrOther': '',
  },
  '1': {
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
  },
  '2': {
    'checkedSystemTypes': ['central_ac', 'furnace'],
    'heatPumpNothingOrOther': '',
  },
  '3': '12',
  '4': { 'incomeLevel': '5', 'otherIncomeValue': '' },
  '5': {
    'priorityList': [
      {
        'id': 6,
        'type': 'Speed',
        'name': 'Speed of replacement',
      },
      { 'id': 4, 'type': 'comfort', 'name': 'Improve comfort inside my house' },
      { 'id': 2, 'type': 'energy', 'name': 'Reduce monthly utility bills' },
      { 'id': 1, 'type': 'cost', 'name': 'Lower upfront cost' },
      { 'id': 3, 'type': 'emissions', 'name': 'Reduce carbon emissions' },
      { 'id': 5, 'type': 'Quietness', 'name': 'Quietness' }],
    'originalList': [
      { 'type': 'temp' },
      { 'type': 'temp' },
      { 'type': 'temp' },
      { 'type': 'temp' },
      { 'type': 'temp' },
      { 'type': 'temp' }],
  },
  '6': {
    'address1': '7700 Linnie Lane',
    'address2': '',
    'city': 'Austin',
    'state': 'TX',
    'country': 'US',
    'postalCode': '78724',
  },
  '7': '3000',
  '8': {
    'firstName': 'Eric',
    'lastName': 'Miller',
    'email': 'epmiller8464@gmail.com',
    'phoneNumber': '4147084254',
  },
}
// export { CUSTOMER_INPUTS }
const CustomerInput = {
  sessionId: '',
  surveyId: '',
  customerId: '',
  contractorId: '',
  utility: {
    electricityProvider: {
      id: '0429dd34-bde6-11ed-9a5f-3aebb006c675',
      name: 'Austin Energy',
      type: 'electricity',
    },
    gasProvider: {
      id: '0429dda2-bde6-11ed-9a5f-3aebb006c675',
      name: 'Texas Gas',
      type: 'natural_gas',
    },
  },
  income: {
    incomeLevel: '',
    incomeLevelRange: '',
    incomeEligibleFlag: '',
  },
  contactInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  },
  address: {
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
  },
  newSystemTypes: [],
  existingSystemTypes: [],
  existingSystemAge: '',
  homeSqFt: '',
  customerPriorities: {
    '1': null,
    '2': null,
    '3': null,
    '4': null,
    '5': null,
    '6': null,
  },
}
/**
 *
 * @param session
 * @param questionMap
 * @returns {{income: ({incomeLevelRange: string, rebate_eligible: boolean, incomeLevel: number, income_eligibility_flag: string}|{show_free_form: boolean, incomeLevelRange: string, rebate_eligible: boolean, incomeLevel: number, income_eligibility_flag: string}|{incomeLevelRange: string, incomeLevel: number, income_eligibility_flag: string}|{incomeLevelRange: string, incomeLevel: number, income_eligibility_flag: string}|{incomeLevelRange: string, incomeLevel: number, income_eligibility_flag: string}), address: {[p: string]: *}, contactInfo: {[p: string]: *}, customerPriorities, existingSystemAge, contractorId, existingSystemTypes: *[], customerId, newSystemTypes: *[], utility: {gasProvider: *, electricityProvider: *}, sessionId, homeSqFt}}
 */
const transformSurveyQuestions = (session, questionMap) => {

  const { userId, sessionId, contractorId, email } = session

  const questionIndexes = Object.keys(questionMap)

  // console.log(questionIndexes)

  let utility, income, contactEmail, address, newSystemTypes, homeType,
    existingSystemTypes, existingSystemAge, customerPriorities
  for (const index in questionIndexes) {

    const questionResponse = questionMap[index]
    // console.log(questionResponse)

    switch (index) {
      case  '0':
        //newSystemTypes
        newSystemTypes = questionResponse.checkedSystemTypes.join('_')
        break
      case  '1':
        //homeType
        homeType = questionResponse
        break
      case  '2':
        //utility
        utility = {
          electricityProvider: questionResponse.energyProvider,
          gasProvider: questionResponse.gasProvider,
        }
        break
      case  '3':
        // existingSystemTypes
        existingSystemTypes = [...questionResponse.checkedSystemTypes]
        break
      case '4':
        existingSystemAge = questionResponse
        break
      case  '5':
        //income
        income = INCOME_LEVEL_OPTIONS.find((io) => {
          return io.incomeLevel === Number(questionResponse.incomeLevel)
        })
        break
      case  '6':
        //customerPriorities
        const { priorityList } = questionResponse

        const pMap = priorityList.reduce((result, value, i) => {
          result[i] = value
          return result
        }, {})
        console.log(pMap)

        customerPriorities = pMap
        break
      case  '7':
        //address
        address = {
          ...questionResponse,
        }
        break
      default:
        console.warn('question index out of bounds')
    }
  }

  return {
    sessionId,
    customerId: userId,
    contractorId,
    utility,
    income,
    newSystemTypes,
    existingSystemTypes,
    existingSystemAge,
    address,
    contactEmail: email,
    homeType,
    customerPriorities,
  }
}

export { transformSurveyQuestions }
