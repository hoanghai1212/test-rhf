import React, { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";

export default ({ nestIndex, nestNestIndex, control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `test.${nestIndex}.nestedArray.${nestNestIndex}.nested`
  });

  const [state, setState] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setState(1);
    }, 3000);
  }, []);

  return (
    <div>
      <p>{state}</p>
      {fields.map((item, k) => {
        return (
          <div key={item.id} style={{ marginLeft: 20 }}>
            <label>Nested nest Array:</label>
            <input
              {...register(
                `test.${nestIndex}.nestedArray.${nestNestIndex}.nested.${k}.test1`,
                {
                  required: true
                }
              )}
              defaultValue={item.test1}
              style={{ marginRight: "25px" }}
            />

            <input
              {...register(
                `test.${nestIndex}.nestedArray.${nestNestIndex}.nested.${k}.test2`
              )}
            />
            <button type="button" onClick={() => remove(k)}>
              Delete nest Nested
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => {
          append({
            test1: "test1 ne",
            test2: "test2 ne"
          });

          setState((prev) => prev + 1);
        }}
      >
        Append nest Nested
      </button>

      <hr />
    </div>
  );
};
