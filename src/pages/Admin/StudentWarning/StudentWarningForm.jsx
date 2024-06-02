import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  InputForm,
  InputFormRange,
  SelectLib,
  TinyEditor,
} from "../../../components";
import { apiCreateWarning } from "../../../apis/warning";
import { useSelector } from "react-redux";

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
  const { current } = useSelector((state) => state.user);
  console.log("🚀 ~ StudentWarningForm ~ current:", current);

  const handleCreateOrUpdate = async (data) => {
    if (data?.IDWarning) {
    } else {
      console.log("da", data);
      const res = await apiCreateWarning(data);
      console.log("res", res);
    }
  };
  return (
    <div className="mx-6 my-2 h-full">
      <form
        className="bg-[#fff] px-5 py-4 rounded-xl pb-4"
        onSubmit={handleSubmit(handleCreateOrUpdate)}
      >
        <div className="flex w-full gap-3 mb-3">
          <InputForm
            id={"NameWarning"}
            label={"Tiêu đề cảnh báo"}
            register={register}
            errors={errors}
            validate={{ required: "Need Fill This Field" }}
          />
          <InputForm
            id={"SBN"}
            label={"Số buổi nghỉ /tín"}
            register={register}
            errors={errors}
            validate={{ required: "Need Fill This Field" }}
          />
        </div>

        <div className="flex w-full gap-3 mb-3">
          <SelectLib
            id={"TTHP"}
            label={"Tình trạng học phí"}
            register={register}
            errors={errors}
            validate={{ required: "Need Fill This Field" }}
            setValue={setValue}
            options={[
              {
                id: "Nợ học phí",
                label: "Nợ học phí",
              },
              {
                id: "Đủ học phí",
                label: "Đủ học phí",
              },
            ]}
          />
          <InputForm
            id={"STC_NO"}
            label={"Số tín chỉ tối đa nợ"}
            register={register}
            errors={errors}
            validate={{ required: "Need Fill This Field" }}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <InputForm
            id={"GPA"}
            label={"Điểm GPA thấp dưới"}
            register={register}
            errors={errors}
            validate={{ required: "Need Fill This Field" }}
          />
          <InputFormRange
            id={"LevelWarning"}
            label={"Đặt mức quy định"}
            register={register}
            errors={errors}
            validate={{ required: "Need Fill This Field" }}
            setValue={setValue}
          />
        </div>
        <TinyEditor
          id={"ContentWarning"}
          label={"Nội dung cảnh báo"}
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
