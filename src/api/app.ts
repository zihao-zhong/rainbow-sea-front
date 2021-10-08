import axios from '@/utils/axios';
import { Paging } from '@/types/query.interface';
import { User } from '@/types/user.interface';
import { IAxioxResponse } from '@/types/common';

/**
 * 获取用户信息接口
 * @param {Object} query
 */
export async function getUserList(query: Paging): Promise<IAxioxResponse<User>> {
  return axios({
    method: 'get',
    url: '/user/list',
    params: query,
  });
}
