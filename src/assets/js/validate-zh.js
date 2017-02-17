/**
 * Created by PetitKero on 18/11/2016.
 */
/* eslint-disable */
export default {
  after: (field, [target]) => `必须在${target}之后`,
  alpha_dash: (field) => `能够包含字母数字字符，包括破折号、下划线`,
  alpha_num: (field) => `只能包含字母数字字符。`,
  alpha_spaces: (field) => `只能包含字母字符，包括空格。`,
  alpha: (field) => `只能包含字母字符`,
  before: (field, [target]) => ` ${field} 必须在${target} 之前.`,
  between: (field, [min, max]) => ` 必须大于 ${min} 和小于 ${max}`,
  confirmed: (field, [confirmedField]) => `两次输入不一样`,
  date_between: (field, [min, max]) => `必须在${min}和${max}之间`,
  date_format: (field, [format]) => `必须在在${format}格式中`,
  decimal: (field, [decimals] = ['*']) => `必须是数字的而且能够包含${decimals === '*' ? '' : decimals} 小数点`,
  digits: (field, [length]) => `必须是数字，且精确到 ${length}数`,
  dimensions: (field, [width, height]) => `必须是 ${width} 像素到 ${height} 像素`,
  email: (field) => `必须是有效的邮箱`,
  ext: (field) => `必须是有效的文件`,
  image: (field) => `必须是图片`,
  in: (field) => `必须是一个有效值`,
  ip: (field) => `必须是一个有效的地址`,
  max: (field, [length]) => `不能超过 ${length} 个字`,
  mimes: (field) => `必须是有效的文件类型`,
  min: (field, [length]) => `至少要有 ${length} 个字`,
  not_in: (field) => `必须是一个有效值`,
  numeric: (field) => `只能包含数字字符`,
  regex: (field) => `格式无效`,
  required: (field) => `这是必填项`,
  size: (field, [size]) => `文件需要小于 ${size} KB`,
  url: (field) => `你输入的不是一个有效的url`
}
