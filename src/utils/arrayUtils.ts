/**
 * 数组工具函数
 * 提供通用的数组操作方法
 */

/**
 * 从数组中随机选择一个元素
 * @param array 要选择的数组
 * @returns 随机选中的元素
 */
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * 随机打乱数组顺序
 * @param array 要打乱的数组
 * @returns 打乱后的新数组
 */
export function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => 0.5 - Math.random());
} 