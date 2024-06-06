import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  InputForm,
  InputFormRange,
  SelectLib,
  TinyEditor,
} from "../../../components";
import {
  apiCreateWarning,
  apiGetWarningById,
  apiUpdateWarning,
} from "../../../apis/warning";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import path from "../../../ultils/path";
import { TTHP, htmlWarning } from "../../../ultils/constant";

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
  const [selectedWarning, setSelectedWarning] = useState({
    ContentWarning: htmlWarning,
  });
  const [valueDisplay, setValueDisplay] = useState(0);

  const navigate = useNavigate();

  const handleCreateOrUpdate = async (data) => {
    if (data?.ID) {
      const res = await apiUpdateWarning({ ...data, IDWarning: data?.ID });
      if (res?.status === 200) {
        toast.success(res?.message);
        navigate(`/${path.ADMIN}/${path.STUDENT_WARNING}`);
      }
    } else {
      let res;
      if (!data?.ContentWarning) {
        res = await apiCreateWarning({
          ...data,
          ContentWarning: selectedWarning?.ContentWarning,
        });
      } else {
        res = await apiCreateWarning(data);
      }
      if (res?.status === 200) {
        toast.success(res?.message);
        navigate(`/${path.ADMIN}/${path.STUDENT_WARNING}`);
      }
    }
  };
  const [params] = useSearchParams();
  const id = params.get("id");
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const res = await apiGetWarningById(id);
        if (res?.status === 200) {
          setSelectedWarning({ ...res?.data[0] });
          setValueDisplay(res?.data[0]?.LevelWarning);
          reset({
            ...res?.data[0],
          });
        }
      }
    };
    fetchData();
  }, [params]);
  // useEffect(() => {

  // },[''])
  return (
    <div className="mx-6 my-2 h-full">
      <form
        className="bg-[#fff] px-5 py-4 rounded-xl pb-4"
        onSubmit={handleSubmit(handleCreateOrUpdate)}
      >
        <div className=" flex justify-end">
          <Button
            style={"bg-[#FFB700]"}
            type="button"
            handleOnclick={() =>
              navigate(`/${path.ADMIN}/${path.STUDENT_WARNING}`)
            }
          >
            Quay lại
          </Button>
        </div>
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
            options={TTHP}
            defaultValue={TTHP?.find(
              (item) => item.id === selectedWarning?.TTHP
            )}
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
            label={"Điểm theo thang điểm 10 thấp dưới"}
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
            valueDisplay={valueDisplay}
            setValueDisplay={setValueDisplay}
          />
        </div>
        <TinyEditor
          id={"ContentWarning"}
          label={"Nội dung cảnh báo"}
          validate={{ required: "Need Fill This Field" }}
          register={register}
          errors={errors}
          setValue={setValue}
          value={selectedWarning?.ContentWarning}
        />
        <div className="mt-5 flex justify-end">
          <Button
            style={"bg-[#1677ff]"}
            type="submit"
            handleOnClick={handleSubmit(handleCreateOrUpdate)}
          >
            {id ? "Cập nhật cảnh báo" : "Tạo cảnh báo"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StudentWarningForm;
