import {
  FormFieldType,
  ViewsModule,
  formField,
  formTable,
  viewCrud,
  viewLabel,
  viewMapTo,
} from 'o2c_core';
import { DisposalRealEstateService } from '../services/disposal-real-estate.service';
import { DEFAULT_ROUTE_CONFIGURATION } from 'src/app/core/constants/routes.constants';
import { NationalConsumerPriceIndexDto } from '../dto';
import { GrantorDto } from '../dto/Grantor.dto';
import { TypeDisposalOperationDto } from '../dto/TypeDisposalOperation.dto';
import { RateDto } from '../dto/Rate.dto';

@viewCrud({
  classProvider: DisposalRealEstateService,
  registerName: 'Enajenación de Bienes',
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class DisposalRealEstateView {
  @viewLabel('Valor de enajenación')
  disposal_value: number;
  @viewLabel('Fecha de enajenación')
  disposal_date: Date;
  @viewLabel('Valor de adquisición')
  acquisition_value: number;
  @viewLabel('Fecha de adquisición')
  acquisition_date: Date;
  @viewLabel('Valoración de inmuebles')
  real_estate_appraisal: number;
  // @viewLabel('Tasación fiscal')
  fiscal_appraisal: number;
  // @viewLabel('Proporción de tierra')
  land_proportion: number;
  // @viewLabel('Proporción de construcción')
  construction_proportion: number;
  // @viewLabel('Cedente del valor de adquisición')
  acquisition_value_transferor: number;
  // @viewLabel('Valor de la proporción de la tierra')
  value_land_proportion: number;
  // @viewLabel('Proporción de construcción de valor')
  value_construction_proportion: number;
  // @viewLabel('Tasa de depreciación')
  depreciation_rate: number;
  // @viewLabel('Depreciación anual')
  annual_depreciation: number;
  // @viewLabel('Años pasados')
  years_passed: number;
  // @viewLabel('Valor de depreciación')
  depreciation_value: number;
  @viewLabel('Valor de construcción')
  construction_value: number;
  // @viewLabel('Factor anexo')
  annex_factor: number;
  // @viewLabel('Costo de construcción actualizado')
  updated_construction_cost: number;
  // @viewLabel('Costo de la tierra actualizado')
  updated_land_cost: number;
  // @viewLabel('Cedente del valor de enajenación')
  disposal_value_transferor: number;
  // @viewLabel('Adquisición de costo total actualizado')
  updated_total_cost_acquisition: number;
  // @viewLabel('Mejoras')
  improvements: number;
  @viewLabel('Valoración')
  appraisal: number;
  // @viewLabel('Comisiones')
  commissions: number;
  // @viewLabel('ISABI')
  isabi: number;
  // @viewLabel('Avisos preventivos')
  preventive_notices: number;
  // @viewLabel('Impuesto base')
  tax_base: number;
  // @viewLabel('Beneficio acumulativo')
  cumulative_profit: number;
  // @viewLabel('Beneficio no acumulativo')
  not_cumulative_profit: number;
  // @viewLabel('Excedentes')
  surplus: number;
  // @viewLabel('Impuesto marginal')
  marginal_tax: number;
  // @viewLabel('Cargo ISR')
  isr_charge: number;
  // @viewLabel('Pago ISR')
  isr_pay: number;
  // @viewLabel('Pago de la entidad federal ISR')
  isr_federal_entity_pay: number;
  // @viewLabel('Tasa')
  rate: number;
  // @viewLabel('ISR a entidad federativa')
  isr_federal_entity: number;
  // @viewLabel('ISR Federación')
  isr_federation: number;
  // @viewLabel('Id de enajenación de beneficio no acumulativo')
  ncpi_disposal_id: number;
  // @viewLabel('Id de adquisición de beneficio no acumulativo')
  ncpi_acquisition_id: number;
  // @viewLabel('Id alienante')
  alienating_id: number;
  // @viewLabel('Id tipo de operación de eliminación')
  type_disposal_operation_id: number;
  // @viewLabel('Id tasa')
  rate_id: number;
  // @viewLabel('Enajenación del índice nacional de precios al consumidor')
  @viewMapTo((value: any) => value?.name)
  nationalConsumerPriceIndexDisposal?: NationalConsumerPriceIndexDto;
  // @viewLabel('Adquisición del índice nacional de precios al consumidor')
  @viewMapTo((value: any) => value?.name)
  nationalConsumerPriceIndexAcquisition?: NationalConsumerPriceIndexDto;
  // @viewLabel('Alienante')
  @viewMapTo((value: any) => value?.name)
  alienating?: GrantorDto;
  // @viewLabel('Tipos de operación de eliminación')
  @viewMapTo((value: any) => value?.name)
  typeDisposalOperation?: TypeDisposalOperationDto;
  // @viewLabel('Tasas')
  @viewMapTo((value: any) => value?.name)
  rates?: RateDto;
  // @viewLabel('Compradores')
  @viewMapTo((value: any) => value?.name)
  acquirers?: GrantorDto;

  constructor(
    disposal_value: number,
    disposal_date: Date,
    acquisition_value: number,
    acquisition_date: Date,
    real_estate_appraisal: number,
    fiscal_appraisal: number,
    land_proportion: number,
    construction_proportion: number,
    acquisition_value_transferor: number,
    value_land_proportion: number,
    value_construction_proportion: number,
    depreciation_rate: number,
    annual_depreciation: number,
    years_passed: number,
    depreciation_value: number,
    construction_value: number,
    annex_factor: number,
    updated_construction_cost: number,
    updated_land_cost: number,
    disposal_value_transferor: number,
    updated_total_cost_acquisition: number,
    improvements: number,
    appraisal: number,
    commissions: number,
    isabi: number,
    preventive_notices: number,
    tax_base: number,
    cumulative_profit: number,
    not_cumulative_profit: number,
    surplus: number,
    marginal_tax: number,
    isr_charge: number,
    isr_pay: number,
    isr_federal_entity_pay: number,
    rate: number,
    isr_federal_entity: number,
    isr_federation: number,
    ncpi_disposal_id: number,
    ncpi_acquisition_id: number,
    alienating_id: number,
    type_disposal_operation_id: number,
    rate_id: number,
    nationalConsumerPriceIndexDisposal: NationalConsumerPriceIndexDto,
    nationalConsumerPriceIndexAcquisition: NationalConsumerPriceIndexDto,
    typeDisposalOperation: TypeDisposalOperationDto,
    rates: RateDto,
    acquirers: GrantorDto,
  ) {
    this.disposal_value = disposal_value;
    this.disposal_date = disposal_date;
    this.acquisition_value = acquisition_value;
    this.acquisition_date = acquisition_date;
    this.real_estate_appraisal = real_estate_appraisal;
    this.fiscal_appraisal = fiscal_appraisal;
    this.land_proportion = land_proportion;
    this.construction_proportion = construction_proportion;
    this.acquisition_value_transferor = acquisition_value_transferor;
    this.value_land_proportion = value_land_proportion;
    this.value_construction_proportion = value_construction_proportion;
    this.depreciation_rate = depreciation_rate;
    this.annual_depreciation = annual_depreciation;
    this.years_passed = years_passed;
    this.depreciation_value = depreciation_value;
    this.construction_value = construction_value;
    this.annex_factor = annex_factor;
    this.updated_construction_cost = updated_construction_cost;
    this.updated_land_cost = updated_land_cost;
    this.disposal_value_transferor = disposal_value_transferor;
    this.updated_total_cost_acquisition = updated_total_cost_acquisition;
    this.improvements = improvements;
    this.appraisal = appraisal;
    this.commissions = commissions;
    this.isabi = isabi;
    this.preventive_notices = preventive_notices;
    this.tax_base = tax_base;
    this.cumulative_profit = cumulative_profit;
    this.not_cumulative_profit = not_cumulative_profit;
    this.surplus = surplus;
    this.marginal_tax = marginal_tax;
    this.isr_charge = isr_charge;
    this.isr_pay = isr_pay;
    this.isr_federal_entity_pay = isr_federal_entity_pay;
    this.rate = rate;
    this.isr_federal_entity = isr_federal_entity;
    this.isr_federation = isr_federation;
    this.ncpi_disposal_id = ncpi_disposal_id;
    this.ncpi_acquisition_id = ncpi_acquisition_id;
    this.alienating_id = alienating_id;
    this.type_disposal_operation_id = type_disposal_operation_id;
    this.rate_id = rate_id;
    this.nationalConsumerPriceIndexDisposal =
      nationalConsumerPriceIndexDisposal;
    this.nationalConsumerPriceIndexAcquisition =
      nationalConsumerPriceIndexAcquisition;
    this.typeDisposalOperation = typeDisposalOperation;
    this.rates = rates;
    this.acquirers = acquirers;
  }
}

export class landProportionAcquiriersTable {
  @formField({
    label: 'Comprador',
    formFieldType: FormFieldType.NUMBER,
  })
  @viewLabel('Comprador')
  grantor_id: number;
  @formField({
    label: 'Porcentaje de copropiedad',
    formFieldType: FormFieldType.NUMBER,
  })
  @viewLabel('Porcentaje de copropiedad')
  proportion: number;

  @formField({
    label: 'Tasa',
    formFieldType: FormFieldType.NUMBER,
  })
  @viewLabel('Tasa')
  rate: number;

  constructor(grantor_id: number, proportion: number, rate: number) {
    this.grantor_id = grantor_id;
    this.proportion = proportion;
    this.rate = rate;
  }
}

export class landProportionAcquiriersForm {
    @formTable({
        tableProvider: landProportionAcquiriersTable,
      })
      @formField({
        label: 'Compradores',
        formFieldType: FormFieldType.TABLE,
      })
      @viewLabel('Compradores')
      acquirers: string;

      constructor(acquirers: string) {
        this.acquirers = acquirers;
      }
}
