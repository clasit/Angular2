import {Category} from './enums';

export interface Book {
    id: number;
    title: string;
    author: string;
    avaliable: boolean;
    category: Category;
    pages?: number;     // Se define la propiedad como opcional
}