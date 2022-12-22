import React from "react";
import { useFieldArray } from "react-hook-form";
import NestNestArray from "./nestNestArray";
let renderCount = 0;
export default ({ nestIndex, control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `test.${nestIndex}.nestedArray`
  });
  renderCount++;
  return (
    <div>
      {renderCount}
      {fields.map((item, k) => {
        return (
          <div key={item.id} style={{ marginLeft: 20 }}>
            <label>Nested Array:</label>
            <input
              {...register(`test.${nestIndex}.nestedArray.${k}.field1`, {
                required: true
              })}
              defaultValue={item.field1}
              style={{ marginRight: "25px" }}
            />

            <input
              {...register(`test.${nestIndex}.nestedArray.${k}.field2`)}
              defaultValue={item.field2}
            />
            <button type="button" onClick={() => remove(k)}>
              Delete Nested
            </button>
            <NestNestArray
              nestIndex={nestIndex}
              nestNestIndex={k}
              {...{ control, register }}
            />
          </div>
        );
      })}

      <button
        type="button"
        onClick={() =>
          append({
            field1: "field1",
            field2: "field2"
          })
        }
      >
        Append Nested
      </button>

      <hr />
    </div>
  );
};
