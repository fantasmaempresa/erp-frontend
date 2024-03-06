import { EntityDto } from 'o2c_core';
import { NationalConsumerPriceIndexDto } from './NationalConsumerPriceIndex.dto';
import { GrantorDto } from './Grantor.dto';
import { RateDto } from './Rate.dto';
import { TypeDisposalOperationDto } from './TypeDisposalOperation.dto';

export interface DisposalRealEstateDto extends EntityDto {
  disposal_value: number;
  disposal_date: Date;
  acquisition_value: number;
  acquisition_date: Date;
  real_estate_appraisal: number;
  fiscal_appraisal: number;
  land_proportion: number;
  construction_proportion: number;
  acquisition_value_transferor: number;
  value_land_proportion: number;
  value_construction_proportion: number;
  depreciation_rate: number;
  annual_depreciation: number;
  years_passed: number;
  depreciation_value: number;
  construction_value: number;
  annex_factor: number;
  updated_construction_cost: number;
  updated_land_cost: number;
  disposal_value_transferor: number;
  updated_total_cost_acquisition: number;
  improvements: number;
  appraisal: number;
  commissions: number;
  isabi: number;
  preventive_notices: number;
  tax_base: number;
  cumulative_profit: number;
  not_cumulative_profit: number;
  surplus: number;
  marginal_tax: number;
  isr_charge: number;
  isr_pay: number;
  isr_federal_entity_pay: number;
  taxable_gain: number;
  rate: number;
  isr_federal_entity: number;
  isr_federation: number;

  ncpi_disposal_id: number;
  ncpi_acquisition_id: number;
  alienating_id: number;
  type_disposal_operation_id: number;
  rate_id: number;

  nationalConsumerPriceIndexDisposal?: NationalConsumerPriceIndexDto;
  nationalConsumerPriceIndexAcquisition?: NationalConsumerPriceIndexDto;
  alienating?: GrantorDto;
  typeDisposalOperation?: TypeDisposalOperationDto;
  rates?: RateDto;
  acquirers?: GrantorDto;
}
