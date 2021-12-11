/**
 * 用户信息
 */
export interface User {
  /**
   * 用户ID
   */
  id?: number;

  /**
   * 邮件地址
   */
  email?: string;

  /**
   * 用户密码
   */
  password?: string;

  /**
   * 用户名
   */
  username?: string;

  /**
   * 用户名
   */
  avatar?: string;

  /**
   * 用户名
   */
  role?: string;

  /**
   * 创建人
   */
  createdBy: string;

  /**
   * 修改人
   */
  updatedBy: string;

  /**
   * 创建时间
   */
  createdAt: Date;

  /**
   * 修改时间
   */
  updatedAt: Date;
}

/**
 * 用户注册传参
 */
export interface RegisterOption {
  /**
   * 注册邮箱
   */
  email: string;

  /**
   * 用户密码
   */
  password: string;

  /**
   * 邮箱验证码
   */
  code: string;
}

/**
 * 用户登录传参，去除验证码字段
 */
export type LoginOption = Omit<RegisterOption, 'code'>;

/**
 * 登录接口返回接口数据类型
 */
export interface LoginUser {
  token: string;
  user: User;
  [key: string]: unknown;
}
