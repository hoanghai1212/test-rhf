import React from "react";
import { useFieldArray } from "react-hook-form";
import NestedArray from "./nestedFieldArray";

let renderCount = 0;

export default function Fields({ control, register, setValue, getValues }) {
  const { fields, append, remove, insert, prepend } = useFieldArray({
    control,
    name: "test"
  });

  renderCount++;

  return (
    <>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input
                {...register(`test.${index}.name`)}
                defaultValue={item.name}
              />

              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
              <NestedArray nestIndex={index} {...{ control, register }} />
            </li>
          );
        })}
      </ul>

      <section>
        <button
          type="button"
          onClick={() => {
            append({
              name: "useFieldArray2",
              nestedArray: [{ field1: "field1", field2: "field2" }]
            });
          }}
        >
          append
        </button>

        <button
          type="button"
          onClick={() => {
            setValue("test", [
              ...getValues().test,
              {
                name: "append",
                nestedArray: [{ field1: "append", field2: "append" }]
              }
            ]);
          }}
        >
          Append Nested
        </button>

        <button
          type="button"
          onClick={() => {
            prepend({
              name: "prepend",
              nestedArray: [{ field1: "field1", field2: "field2" }]
            });
          }}
        >
          prepend
        </button>

        <button
          type="button"
          onClick={() => {
            prepend({
              name: "prepend",
              nestedArray: [{ field1: "field1", field2: "field2" }]
            });
          }}
        >
          prepend
        </button>

        <button
          type="button"
          onClick={() => {
            insert(1, {
              name: "insert",
              nestedArray: [{ field1: "insert", field2: "insert" }]
            });
          }}
        >
          insert
        </button>

        <button
          type="button"
          onClick={() => {
            setValue("test", [
              {
                name: "append",
                nestedArray: [{ field1: "Prepend", field2: "Prepend" }]
              },
              ...getValues().test
            ]);
          }}
        >
          prepend Nested
        </button>
      </section>

      <span className="counter">Render Count: {renderCount}</span>
    </>
  );
}
