import axios from '@/utils/axios';
import { Paging } from '@/types/query.interface';
import { User } from '@/types/api/user.interface';

/**
 * 获取用户信息接口
 * @param {Object} query
 */
export async function getUserList(query?: Paging): Promise<User[]> {
  return axios({
    method: 'get',
    url: '/user/list',
    params: query,
  });
}
