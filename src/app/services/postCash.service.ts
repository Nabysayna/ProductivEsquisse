import { Injectable }    from '@angular/core';


import { PostCash } from '../models/postCash';
import { PostCashList } from '../mocks/postCash.mock';



@Injectable()
export class PostCashService {

  getPostCashList(): Promise<PostCash[]> {
    return Promise.resolve(PostCashList);
  }
  
  getPostCashListSlowly(): Promise<PostCash[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getPostCashList()), 2000);
    });
  }
 
  getPostCash(id: number): Promise<PostCash> {
    return this.getPostCashList().then(postCashList => postCashList.find(postCash => postCash.id === id));
  }
  
  

}
