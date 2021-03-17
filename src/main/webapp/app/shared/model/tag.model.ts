import { IPost } from 'app/shared/model/post.model';

export interface ITag {
  id?: number;
  name?: string;
  entries?: IPost[];
}

export const defaultValue: Readonly<ITag> = {};
