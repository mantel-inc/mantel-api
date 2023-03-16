import { PRODUCTS_DB } from './products-db.js'

const Contractor = {
  contractorId: 'dd4e55e4-bdd3-11ed-9a5f-3aebb006c675',
  shortName: 'McCullough',
  longName: 'McCullough Heating & Air Conditioning',
  region: 'south',
}

export const CONTRACTOR_DB = [Contractor]
export const ContractorProductsMap = new Map([
  [
    Contractor.contractorId,
    {
      contractor: Contractor,
      products: [...PRODUCTS_DB],
    },
  ],
])



