import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { InventoryService } from 'src/app/data/services/inventory.service';
import { Observable } from 'rxjs';
import { MessageHelper } from 'o2c_core';
import { InventoryDto } from 'src/app/data/dto/Inventory.dto';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ArticleView } from 'src/app/data/presentation/Article.view';
import { WarehouseView } from 'src/app/data/presentation/Warehouse.view';

@AutoUnsubscribe()
@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent implements OnDestroy{
  inventoryForm = new UntypedFormGroup({
    article_id: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(20),
    ]),
    warehouse_id: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(20),
    ]),
    amount: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(5),
    ]),
  });

  isInitialInventory: boolean = false;

  isDialog: boolean = false;

  isPurchase: boolean = false;

  isSale: boolean = false;

  articleProvider = ArticleView;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
  ){
    const currentRoute = this.route.snapshot.routeConfig?.path;
    if (typeof currentRoute == 'undefined') {
      this.isDialog = true;
    }

    const idWarehouse = Number(this.route.snapshot.params.id);
    if (!isNaN(idWarehouse)) {
      this.inventoryForm.get('warehouse_id')?.setValue(idWarehouse);
      this.isInitialInventory = true;
    }

    const idArticle = Number(this.route.snapshot.params.article_id);
    const operationType = this.route.snapshot.url[0].path;
    if (!isNaN(idArticle)) {
      this.inventoryForm.get('article_id')?.setValue(idArticle);
      if (operationType === 'sale') {
        this.isSale = true;
      }else{
        this.isPurchase = true;
      }
    }

  }

  ngOnDestroy(): void {
  }

  async backToListInventory(){
    if (this.isDialog) {
      return;
    } else {
      await this.router.navigate(['../../'], {relativeTo: this.route});
    }
  }

  onSubmit() {
    if (this.inventoryForm.invalid) return;
    if (this.isInitialInventory && !this.isPurchase && !this.isSale) {
      this.inventoryService.initialInventory(this.inventoryForm.value).subscribe({
        next: async () => {
          await MessageHelper.successMessage(
            '¡Éxito!',
            `El Inventario Inicial ha sido actualizado correctamente`,
          );
          await this.backToListInventory();
        },
        error: async (error) => {
          console.log(error);
          if (error.error.code !=  null && error.error.code == 422) {
            if (typeof(error.error.error) === 'object') {
              let message = '';
  
              for (let item in error.error.error){
                message = message + '\n' + error.error.error[item];
              }
              await MessageHelper.errorMessage(message);
            } else {
              await MessageHelper.errorMessage(error.error.error);
            }
          } else if (error.error.code != null && error.error.code ==  409) {
            await MessageHelper.errorMessage(
              'Error referente a la base de datos, consulte a su administrador',
            );
          } else if (error.error.code != null && error.error.code == 500) {
            await MessageHelper.errorMessage(
              'Existe un error dentro del servidor, consulte con el administrador',
            );
          } else {
            await MessageHelper.errorMessage(
              'Hubo un error, intente más tarde por favor',
            );
          }
        },
      });
    }else if (this.isPurchase) {
      this.inventoryService.purchase(this.inventoryForm.value).subscribe({
        next: async () => {
          await MessageHelper.successMessage(
            '¡Éxito!',
            `El Inventario(Compra) ha sido actualizado correctamente`,
          );
          await this.backToListInventory();
        },
        error: async (error) => {
          console.log(error);
          if (error.error.code !=  null && error.error.code == 422) {
            if (typeof(error.error.error) === 'object') {
              let message = '';
  
              for (let item in error.error.error){
                message = message + '\n' + error.error.error[item];
              }
              await MessageHelper.errorMessage(message);
            } else {
              await MessageHelper.errorMessage(error.error.error);
            }
          } else if (error.error.code != null && error.error.code ==  409) {
            await MessageHelper.errorMessage(
              'Error referente a la base de datos, consulte a su administrador',
            );
          } else if (error.error.code != null && error.error.code == 500) {
            await MessageHelper.errorMessage(
              'Existe un error dentro del servidor, consulte con el administrador',
            );
          } else {
            await MessageHelper.errorMessage(
              'Hubo un error, intente más tarde por favor',
            );
          }
        },
      });
    } else {
      this.inventoryService.sale(this.inventoryForm.value).subscribe({
        next: async () => {
          await MessageHelper.successMessage(
            '¡Éxito!',
            `El Inventario(Venta) ha sido actualizado correctamente`,
          );
          await this.backToListInventory();
        },
        error: async (error) => {
          console.log(error);
          if (error.error.code !=  null && error.error.code == 422) {
            if (typeof(error.error.error) === 'object') {
              let message = '';
  
              for (let item in error.error.error){
                message = message + '\n' + error.error.error[item];
              }
              await MessageHelper.errorMessage(message);
            } else {
              await MessageHelper.errorMessage(error.error.error);
            }
          } else if (error.error.code != null && error.error.code ==  409) {
            await MessageHelper.errorMessage(
              'Error referente a la base de datos, consulte a su administrador',
            );
          } else if (error.error.code != null && error.error.code == 500) {
            await MessageHelper.errorMessage(
              'Existe un error dentro del servidor, consulte con el administrador',
            );
          } else {
            await MessageHelper.errorMessage(
              'Hubo un error, intente más tarde por favor',
            );
          }
        },
      });
    }
    
  }

}
