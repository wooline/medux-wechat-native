import {ListItem as Article} from './article';
import {ListItem as Contest} from './contest';
import {ListItem as Grade} from './grade';
import {ListItem as Post} from './post';

export interface DataSource {
  recommend: Post[];
  articles: Article[];
  contests: Contest[];
  grades: Grade[];
}
