export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export const isNumber = (value: unknown): value is number => value != null && value !== "" && !isNaN(Number(value.toString()));
