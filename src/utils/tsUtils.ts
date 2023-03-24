export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export const isNumber = (value: string | number): boolean => value != null && value !== "" && !isNaN(Number(value.toString()));
