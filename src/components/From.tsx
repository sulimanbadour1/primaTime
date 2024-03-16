import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ComboBox from "./ComboBox";
import TextInput from "./TextInput";
import toast from "react-hot-toast";

interface FormData {
  firstName: string;
  university?: string; //  optional since it's not required
}

const FormComponent: React.FC = () => {
  const [comboBoxKey, setComboBoxKey] = useState(0);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      university: undefined,
    },
  });

  const onSubmit = (data: FormData) => {
    if (!data.firstName) {
      setError("firstName", {
        type: "manual",
        message: "First name is required",
      });
      toast.error("First name is required");
    } else {
      clearErrors();
      // Check for university input
      const universityMessage = data.university
        ? data.university
        : "not filled out";
      alert(`Name: ${data.firstName} \nUniversity: ${universityMessage}`);
      toast.success("Form submitted successfully!");
      resetFormAndInputs();
    }
  };

  const resetFormAndInputs = () => {
    reset(); // Reset to defaultValues
    setComboBoxKey((prevKey) => prevKey + 1); // Reset the ComboBox for re-initialization
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="firstName" className="flex flex-col space-y-4 mb-2">
          First Name:
        </label>
        <Controller
          name="firstName"
          control={control}
          rules={{ required: "First Name is required" }}
          render={({ field }) => (
            <TextInput {...field} onClear={() => setValue("firstName", "")} />
          )}
        />
        {errors.firstName && (
          <p className="text-red-500 mt-1">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="university" className="flex flex-col space-y-4 mb-2">
          University:
        </label>
        <ComboBox
          key={comboBoxKey}
          onChange={(value) => setValue("university", value)}
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        Submit
      </button>
    </form>
  );
};

export default FormComponent;
