import { CONTRACTOR_OPTIONS } from './lib/constants/contractor-options.js'
import { PRODUCTS_DB } from './lib/constants/products-db-v2.js'
import { transformSurveyQuestions } from './lib/constants/customer-inputs.js'
import { INCENTIVES_DB } from './lib/constants/incentives-db-v2.js'
import { ENTITIES } from './lib/constants/entities.js'
import { CONTRACTOR_DB } from './lib/constants/contractor-products.js'
import _ from 'lodash'


const findContractorById = (contractorId) => CONTRACTOR_DB.find(
  c => c.contractorId === contractorId)

const loadContractorOptions = ({ contractorId, newSystemTypes }) => {
  console.log('loadContractorOptions', { contractorId, newSystemTypes })
  return CONTRACTOR_OPTIONS.filter(({
    contractor_id: cid, homeowner_selection: hs,
  }) => cid === contractorId && hs === newSystemTypes)
}

const findEntityByName = (entityName) => ENTITIES.find(e => e.entity_name === entityName) || {}
const findIncentives = (customerInputs, contractor) => {
  const electricProvider = findEntityByName(
    customerInputs.utility.electricityProvider.name)
  const gasProvider = findEntityByName(customerInputs.utility.gasProvider.name)
  const fedProvider = findEntityByName('IRS')
  const { entity_id: electricEntityId } = electricProvider
  const { entity_id: gasEntityId } = gasProvider
  return INCENTIVES_DB.filter((i) => {
    return (i.energy_source === 'electricity' &&
        i.entity_id === electricEntityId)
      ||
      (i.energy_source === 'natural_gas' &&
        i.entity_id === gasEntityId)
      ||
      (i.entity_id === fedProvider.entity_id)
    // (i.entity_id === fedProvider.entity_id && i.region === contractor.region)
    // (i.entity_name === 'IRS' && i.region === contractor.region)
  })
}
const productIncentiveCompare = (incentive, product, existingSystemAge,existingSystemType) => {

  if(incentive.existing_system_required === true && existingSystemType === 'nothing'){
    console.warn('incentive: existing_system_required',incentive.existing_system_required)
    console.warn('ci: existingSystemType',existingSystemType)
    return false
  }

  const typeMatch = incentive.product_type === product.product_type
  // console.log('product_type',incentive.product_type,product.product_type, typeMatch)

  const seer2Match = incentive.SEER2 <= product.SEER2
  // console.log('seer2',incentive.SEER2,product.SEER2, seer2Match)

  const eer2Match = incentive.EER2 <= product.EER2
  // console.log('eer2',incentive.EER2,product.EER2, eer2Match)

  const afueMatch = incentive.AFUE <= product.AFUE
  // console.log('afue',incentive.AFUE,product.AFUE, afueMatch)

  const systemAgeMatch = Number(incentive.existing_system_age) <=
    Number(existingSystemAge)
  // console.log('system_age',incentive.existing_system_age,existingSystemAge, systemAgeMatch)

  // const compressorTypeMatch = incentive.compressor_type ===
  //   product.compressor_type
  // console.log('compressor_type',incentive.compressor_type,product.compressor_type, compressorTypeMatch)
  // console.log('compressor_type', compressorTypeMatch)

  return (typeMatch && seer2Match && eer2Match && afueMatch && systemAgeMatch)

}
const filterIncentives = (incentives) => {

  let results = []
  const groups = _.groupBy(incentives, (i) => i.entity_id)

  for (let [key, value] of Object.entries(groups)) {
    console.log('key', key)
    // value.sort()
    value.sort((i) => Number(i.amount))
    // console.log('value', value)
    results.push(_.last(value))
  }
  console.log(results)
  return results
}
const matchProductIncentives = (product, incentives, customerInputs) => {
  const matches = []
  const { existingSystemAge,existingSystemTypes } = customerInputs
  const allIncentives = incentives.filter(
    incentive => productIncentiveCompare(incentive, product, existingSystemAge,existingSystemTypes))
  return filterIncentives(allIncentives)
}
const findProductIncentives = (session, questionMap) => {

  const customerInputs = transformSurveyQuestions(session, questionMap)
  console.log(customerInputs)
  const { newSystemTypes, contractorId } = customerInputs
  const contractor = findContractorById(contractorId)
  const contractorOptions = loadContractorOptions(customerInputs)
  const incentives = findIncentives(customerInputs, contractor, INCENTIVES_DB)
  for (let option of contractorOptions) {
    const { heating_product_id, cooling_product_id } = option

    console.log(heating_product_id, cooling_product_id)

    const heatingProduct = PRODUCTS_DB.find(
      ({ products_id }) => products_id === heating_product_id)
    if (heatingProduct) {
      const productIncentives = matchProductIncentives(heatingProduct,
        incentives, customerInputs)

      option.heatingProduct = {
        product: heatingProduct,
        incentives: [...productIncentives],
      }
    }

    const coolingProduct = PRODUCTS_DB.find(
      ({ products_id }) => products_id === cooling_product_id)

    if (coolingProduct) {
      const productIncentives = matchProductIncentives(coolingProduct,
        incentives, customerInputs)
      option.coolingProduct = {
        product: coolingProduct,
        incentives: [...productIncentives],
      }
    }
  }
  console.log(contractorOptions)
  return contractorOptions
}

export { findProductIncentives }
