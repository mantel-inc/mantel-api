import 'dotenv-flow/config.js'

import DB from './src/lib/db/db.js'
import { PRODUCTS_DB } from './src/data/products.js'
import { CONTRACTOR_OPTIONS } from './src/data/contractor-options.js'
import { CONTRACTOR_DB } from './src/data/contractor.js'

const seed = async (db) => {

  const { Product, Contractor, ContractorOptions } = db.models

  // entities

  //contractor
  const contractor = await Contractor.create({ ...CONTRACTOR_DB[0] })
  const cooling = PRODUCTS_DB.find(p => p.product_type === 'central_ac')
  const heating = PRODUCTS_DB.find(p => p.product_type === 'ashp')

  const options = CONTRACTOR_OPTIONS.find(p => p.homeowner_selection === 'cooling_heating')

  const coolingProduct = await Product.create({ ...cooling })
  const heatingProduct = await Product.create({ ...heating })

  const cOp = await ContractorOptions.create(
    {
      ...options,
      contractor_id:contractor.id,
      cooling_product_id: coolingProduct.id,
      heating_product_id: heatingProduct.id,
    })
  // let survey = await Survey.create({ name: 'test' })

  console.log(cOp.toJSON())
  console.log((await cOp.getCoolingProduct()).toJSON())
  console.log((await cOp.getHeatingProduct()).toJSON())
  console.log((await cOp.getContractor()).toJSON())
}

const run = async () => {
  const _db = await DB()
  await seed(_db)
}

run()
