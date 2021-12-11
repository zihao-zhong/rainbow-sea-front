// 类型文档链接: https://github.com/yiminghe/async-validator/blob/master/src/interface.ts

/**
 * @author zihao
 * antdv 使用 async-validator 包做表单校验
 * 我们在写规则的时候会因为没有类型而报错，所以在这扩展一下他的类型配置
 * 后续本项目使用:
 * import { Rules } from '@/types/rules';
 */
import { RuleItem } from 'async-validator';

export interface IRule extends RuleItem {
  trigger?: 'blur' | 'change' | ['blur', 'change'];
}

export interface Rules {
  [key: string]: IRule | IRule[];
}

export * from 'async-validator';
