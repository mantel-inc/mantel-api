const ELECTRICITY_PROVIDERS = [
  {
    id: '0429dd34-bde6-11ed-9a5f-3aebb006c675',
    name: 'Austin Energy',
    type: 'electricity',
  }, {
    id: '67405038-bde6-11ed-9a5f-3aebb006c675',
    name: 'Center Point',
    type: 'electricity',
  }]

const GAS_PROVIDERS = [
  {
    id: '0429dda2-bde6-11ed-9a5f-3aebb006c675',
    name: 'Texas Gas',
    type: 'natural_gas',
  }, {
    id: '67405114-bde6-11ed-9a5f-3aebb006c675',
    name: 'Other Gas Utility',
    type: 'gas',
  }]

const INCOME_LEVEL_OPTIONS = [
  {
    incomeLevel: 1,
    incomeLevelRange: '$0 (or less)',
    income_eligibility_flag: 'none',
    rebate_eligible: false,
  },
  {
    incomeLevel: 2,
    incomeLevelRange: '$0 - $30,000',
    rebate_eligible: false,
    show_free_form: true,
    income_eligibility_flag: 'partial',
  },
  {
    incomeLevel: 3,
    incomeLevelRange: '$30,000 - $80,000',
    income_eligibility_flag: 'full',
  },
  {
    incomeLevel: 4,
    incomeLevelRange: '$80,000 - $150,000',
    income_eligibility_flag: 'full',
  },
  {
    incomeLevel: 5,
    incomeLevelRange: '$150,000+',
    income_eligibility_flag: 'full',
  }]

export {
  ELECTRICITY_PROVIDERS,
  GAS_PROVIDERS,
  INCOME_LEVEL_OPTIONS
}
