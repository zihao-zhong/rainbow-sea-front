import axios from '@/utils/axios';
// import { Paging } from '@/types/query.interface';
// import { User } from '@/types/user.interface';

/**
 * 注册用户发送邮箱验证码
 * @param {Object} query
 */
export async function sendRegisterCode(email: string): Promise<string> {
  return axios({
    method: 'post',
    url: '/user/register/code',
    data: {
      email,
    },
  });
}
