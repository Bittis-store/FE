import { ICategory, ICategoryFormData } from './Category';

export interface ITag extends ICategory {}

export type ITagResponse = {
    tags: ITag[];
    page: number;
    totalDocs: number;
    totalPages: number;
};

export interface ITagFormData extends ICategoryFormData {}
