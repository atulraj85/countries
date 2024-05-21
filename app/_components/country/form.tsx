"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

interface formProps {
  formData: any;
  form: any[];
}

export default function Form({ formData, form }: formProps) {
  const { register, handleSubmit } = useForm({ defaultValues: formData });

  function onSubmit(data: any) {
    console.log("Form submitted:", data);
  }

  return (
    <div>
      <div>
        {form ? (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-x-4 gap-y-8 grid-cols-3">
                {form.map((field, id) => {
                  const { label, name } = field;

                  console.log("name", name);
                  //  console.log("input", input);
                  console.log("value", formData[name]);

                  if (name === "_id") {
                    return;
                  } else {
                    return (
                      <div key={id}>
                        <label
                          htmlFor={name}
                          className="block text-sm font-medium text-black"
                        >
                          {label}
                        </label>
                        <textarea
                          rows={5}
                          id={name}
                          defaultValue={formData[name]}
                          {...register(name, {
                            required: `${label} is required`,
                          })}
                          className="block w-full px-4 py-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 focus:z-10 sm:text-sm"
                        />
                      </div>
                    );
                  }
                })}
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </div>
        ) : (
          <div>Rest</div>
        )}
      </div>
    </div>
  );
}
