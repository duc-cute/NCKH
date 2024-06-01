import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  InputForm,
  InputFormRange,
  TinyEditor,
} from "../../../components";

const StudentWarningForm = () => {
  const {
    register,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm();
  const handleCreateOrUpdate = (data) => {
    console.log("da", data);
  };
  return (
    <div className="mx-6 my-2 h-full">
      <form
        className="bg-[#fff] px-2 py-4 rounded-xl pb-4"
        onSubmit={handleSubmit(handleCreateOrUpdate)}
      >
        <div className="flex w-full gap-3 mb-3">
          <InputForm
            id={"msv"}
            label={"Số buổi nghỉ /tín"}
            register={register}
            errors={errors}
            validate={{ required: "Need Fill This Field" }}
          />
          <InputForm
            id={"name"}
            label={"Tình trạng học phí"}
            register={register}
            errors={errors}
            validate={{ required: "Need Fill This Field" }}
          />
        </div>

        <div className="flex w-full gap-3 mb-3">
          <InputForm
            id={"email"}
            label={"Số tín chỉ tối đa nợ"}
            register={register}
            errors={errors}
            validate={{ required: "Need Fill This Field" }}
          />
          <InputForm
            id={"class"}
            label={"Điểm GPA thấp dưới"}
            register={register}
            errors={errors}
            validate={{ required: "Need Fill This Field" }}
          />
        </div>
        <div className="flex w-full gap-3 mb-3">
          <InputFormRange
            id={"ff"}
            label={"Đặt mức quy định"}
            register={register}
            errors={errors}
            validate={{ required: "Need Fill This Field" }}
            setValue={setValue}
          />
        </div>
        <TinyEditor
          id={"description"}
          label={"Description"}
          validate={{ required: "Need Fill This Field" }}
          register={register}
          errors={errors}
          setValue={setValue}
        />
        <div className="mt-5 flex justify-end">
          <Button
            style={"bg-[#1677ff]"}
            type="submit"
            // handleOnClick={handleSubmit(handleCreateOrUpdate)}
          >
            Tạo cảnh báo
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StudentWarningForm;
