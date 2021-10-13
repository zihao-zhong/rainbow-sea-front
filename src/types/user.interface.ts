export interface User {
  /**
   * 用户ID
   */
  id?: number;

  /**
   * 用户名
   */
  username: string;

  /**
   * 手机号码
   */
  phone?: string;

  /**
   * 邮件地址
   */
  email?: string;

  /**
   * qq号码
   */
  qq?: string;

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
