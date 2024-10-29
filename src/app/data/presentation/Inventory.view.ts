import { ViewActions, viewCrud, viewLabel, viewMapTo } from "o2c_core";
import { InventoryService } from "../services/inventory.service";
import { DEFAULT_ROUTE_CONFIGURATION } from "src/app/core/constants/routes.constants";
import { ArticleDto } from "../dto/Article.dto";
import { InventoryDto } from "../dto/Inventory.dto";
import { ActivatedRoute, Router } from "@angular/router";

const goToPurchase = new ViewActions<InventoryDto>(
    async ({ row, injector}) => {
        const router = injector.get(Router);
        const route = injector.get(ActivatedRoute);
        await router.navigate(
            [
                '../',
                'purchase',
                (row as InventoryDto).article_id,
            ],{
                relativeTo: route,
            }
        );
    },
    'shop',
    {
        tooltip: 'Comprar Artículo',
        isVisible: (row) => row.id !== null,
        color: 'accent',
    },
);

const goToSale = new ViewActions<InventoryDto>(
    async ({ row, injector}) => {
        const router = injector.get(Router);
        const route = injector.get(ActivatedRoute);
        await router.navigate(
            [
                '../',
                'sale',
                (row as InventoryDto).article_id,
            ],{
                relativeTo: route,
            }
        );
    },
    'point_of_sale',
    {
        tooltip: 'Vender Artículo',
        isVisible: (row) => row.id !== null,
        color: 'accent',
    },
);

@viewCrud({
    classProvider: InventoryService,
    registerName: 'Inventario',
    route: DEFAULT_ROUTE_CONFIGURATION,
    actions: [
        goToPurchase,
        goToSale,
    ]
})
export class InventoryView {
    @viewLabel('Identificador de Artículo')
    article_id: number;

    @viewLabel('Artículo')
    @viewMapTo(
        (article: any) =>
            article.name
    )
    article: ArticleDto;

    @viewLabel('Cantidad')
    amount: number;
    constructor (
        article: ArticleDto,
        article_id: number,
        amount: number,
    ){
        this.article_id = article_id;
        this.article = article;
        this.amount = amount;
    }
}