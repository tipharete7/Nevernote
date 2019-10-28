import { Tag } from './tag.model';

export class Note {
    id: string;
    title: string;
    content: string;
    creationDate: string;
    lastModificationDate: string;
    tags: Tag[];
}
