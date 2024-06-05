import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import icons from "../../ultils/icons";

import {
  Button,
  Drawer,
  InputField,
  SelectOption,
  Table,
  Tag,
  InputForm,
  SelectLib,
} from "../../components";

const { FaChartColumn, FaChartPie, IoManSharp, AiOutlineControl } = icons;

import {
  apiAllKey,
  apiAllFacultieGetName,
  apiSelectInfoClass,
  apiSelectInfoSemester,
  apiReportFaculty,
  apiReportClass,
} from "../../apis";

const DashBoash = () => {
  // chọn năm học, học kỳ, khoa, lớp, môn học
  const [selectedSchoolYear, setSelectedSchoolYear] = useState();
  const [selectedSchoolYearId, setSelectedSchoolYearId] = useState();

  const [selectedFaculty, setSelectedFaculty] = useState();
  const [selectedFacultyValue, setSelectedFacultyValue] = useState();
  const [selectedFacultyId, setSelectedFacultyId] = useState();

  const [selectedSemester, setSelectedSemester] = useState();
  const [selectedSemesterValue, setSelectedSemesterValue] = useState();

  const [selectedClass, setSelectedClass] = useState();
  const [selectedClassValue, setSelectedClassValue] = useState();
  const [selectedClassId, setSelectedClassId] = useState();

  const [reportFaculty, setReportFaculty] = useState();
  const [reportClass, setReportClass] = useState();

  // api select option khóa
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/common/select-years-by-faculty";
      const schoolYear = await apiAllKey(url);
      setSelectedSchoolYear(schoolYear?.data);
    };
    fetchData();
  }, []);

  // api select option khoa
  useEffect(() => {
    const fetchData = async () => {
      const facultie = await apiAllFacultieGetName();
      setSelectedFaculty(facultie?.data);
    };
    fetchData();
  }, [selectedSchoolYearId]);

  // api select option lớp
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/common/select-class-by-faculty-and-key";
      const classScore = await apiSelectInfoClass(
        url,
        selectedSchoolYearId,
        selectedFacultyId
      );
      setSelectedClass(classScore?.data);
    };
    fetchData();
  }, [selectedFacultyId, selectedSchoolYearId]);

  // api select option kỳ
  useEffect(() => {
    const fetchData = async () => {
      const semester = await apiSelectInfoSemester(selectedSchoolYearId);
      setSelectedSemester(semester?.data.listKy);
    };
    fetchData();
  }, [selectedSchoolYearId]);

  // api thống kê khóa
  useEffect(() => {
    const fetchData = async () => {
      const report = await apiReportFaculty(
        selectedSchoolYearId,
        selectedFacultyId,
        selectedSemesterValue
      );
      setReportFaculty(report?.data);
    };
    fetchData();
  }, [selectedSchoolYearId, selectedFacultyId, selectedSemesterValue]);

  // api thống kê lớp
  useEffect(() => {
    const fetchData = async () => {
      const report = await apiReportClass(
        selectedSchoolYearId,
        selectedFacultyId,
        selectedSemesterValue,
        selectedClassId
      );
      setReportClass(report?.data);
    };
    fetchData();
  }, [
    selectedSchoolYearId,
    selectedFacultyId,
    selectedSemesterValue,
    selectedClassId,
  ]);

  const ref = useRef();
  const legendRef = useRef();

  // biểu đồ tròn
  useEffect(() => {
    const totalStudents = reportFaculty?.total_student_in_faculty || 600;
    const studentsAtRiskOfNotQualifyingForExam = (
      (reportFaculty?.khong_du_dk_thi / totalStudents) *
      100
    ).toFixed(2);

    const studentsAtRiskOfRepeatingTheYear = (
      (reportFaculty?.co_nguy_co_hoc_lai / totalStudents) *
      100
    ).toFixed(2);

    const studentsAtRiskOfNotGraduating = (
      (reportFaculty?.co_nguy_co_khong_tot_nghiep / totalStudents) *
      100
    ).toFixed(2);

    const studentTuitionDebt = (
      (reportFaculty?.sv_no_hoc_phi / totalStudents) *
      100
    ).toFixed(2);

    const studentsNotAtRisk =
      100 -
      studentsAtRiskOfNotQualifyingForExam -
      studentsAtRiskOfRepeatingTheYear -
      studentsAtRiskOfNotGraduating -
      studentTuitionDebt;

    const data = [
      {
        value: studentsAtRiskOfNotQualifyingForExam,
        label: "Sinh viên không đủ điều kiện dự thi",
      },

      {
        value: studentsAtRiskOfRepeatingTheYear,
        label: "Sinh viên có nguy cơ học lại",
      },
      {
        value: studentsAtRiskOfNotGraduating,
        label: "Sinh viên có nguy cơ không tốt nghiệp",
      },

      { value: studentTuitionDebt, label: "Sinh viên Nợ học phí" },

      { value: studentsNotAtRisk, label: "Sinh viên trong nhóm an toàn" },
    ];

    const color = d3.scaleOrdinal([
      "#ff6484",
      "#ff9f3f",
      "#4bc0c0",
      "#36a2eb",
      "#ffcd56",
    ]);

    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(130);

    const svg = d3
      .select(ref.current)
      .attr("width", 310)
      .attr("height", 300)
      .append("g")
      .attr("transform", "translate(150,150)");

    const g = svg
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", (d, i) => color(i));

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");

    g.on("mouseover", function (event, d) {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html("Tỉ lệ sinh viên: " + d.data.value + "%")
        .style(
          "left",
          d3.pointer(event, ref.current)[0] +
            ref.current.getBoundingClientRect().left +
            "px"
        )
        .style(
          "top",
          d3.pointer(event, ref.current)[1] +
            ref.current.getBoundingClientRect().top +
            "px"
        );
    }).on("mouseout", function (d) {
      tooltip.transition().duration(500).style("opacity", 0);
    });

    const legendSvg = d3
      .select(legendRef.current)
      .attr("width", 300)
      .attr("height", 300);

    const legend = legendSvg
      .selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", function (d, i) {
        return "translate(0," + (i * 20 + 150) + ")";
      });

    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", -20)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d, i) => color(i));

    legend
      .append("text")
      .attr("x", 30)
      .attr("y", -12)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(function (d) {
        return d.label;
      });

    const rectWidth = 260;
    const rectHeight = 74;
    const rectX = 0;
    const rectY = 45;
    const borderRadius = 8;

    legendSvg
      .append("rect")
      .attr("x", rectX)
      .attr("y", rectY)
      .attr("width", rectWidth)
      .attr("height", rectHeight || 0)
      .attr("rx", borderRadius)
      .attr("ry", borderRadius)
      .style("fill", "#3d377e");

    legendSvg
      .append("text")
      .attr("x", rectX + rectWidth / 2)
      .attr("y", rectY + rectHeight / 2)
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text("Tổng số sinh viên toàn khoa " + totalStudents)
      .style("font-size", "16px")
      .style("font-weight", "200")
      .style("fill", "white");
  }, [reportFaculty]);

  // biểu đồ cột
  const barChartRef = useRef();
  useEffect(() => {
    const totalStudents = reportClass?.total_student_in_class || 60;
    const studentsAtRiskOfNotQualifyingForExam = (
      (reportClass?.khong_du_dk_thi / totalStudents) *
      100
    ).toFixed(2);
    const studentsAtRiskOfRepeatingTheYear = (
      (reportClass?.co_nguy_co_hoc_lai / totalStudents) *
      100
    ).toFixed(2);
    const studentsAtRiskOfNotGraduating = (
      (reportClass?.co_nguy_co_khong_tot_nghiep / totalStudents) *
      100
    ).toFixed(2);
    const studentTuitionDebt = (
      (reportClass?.sv_no_hoc_phi / totalStudents) *
      100
    ).toFixed(2);

    const svAnToan =
      100 -
      (+studentsAtRiskOfNotQualifyingForExam +
        +studentsAtRiskOfRepeatingTheYear +
        +studentsAtRiskOfNotGraduating +
        +studentTuitionDebt);

    console.log("studentsNotAtRisk, ", svAnToan);

    const data = [
      {
        value: studentsAtRiskOfNotQualifyingForExam,
        label: "Không đủ điều kiện dự thi",
      },
      {
        value: studentsAtRiskOfNotGraduating,
        label: "Nguy cơ không tốt nghiệp",
      },
      { value: studentTuitionDebt, label: "Sinh viên Nợ học phí" },
      {
        value: studentsAtRiskOfRepeatingTheYear,
        label: "Nguy cơ học lại",
      },
      { value: svAnToan, label: "Trong nhóm an toàn" },
    ];

    const svg = d3
      .select(barChartRef.current)
      .attr("width", 550)
      .attr("height", 570);

    const xScale = d3
      .scaleBand()
      .range([0, 500])
      .domain(data.map((d) => d.label))
      .padding(0.4);

    const yScale = d3.scaleLinear().range([450, 0]).domain([0, 100]);

    const g = svg
      .append("g")
      .attr("transform", "translate(" + 50 + "," + 50 + ")");
    g.append("g").call(d3.axisLeft(yScale));

    console.log("data, ", data);
    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.label))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(0) - yScale(d.value))
      .attr("fill", (d, i) => d3.schemeCategory10[i]);

    // g.selectAll(".bar")
    //   .on("mouseover", function (event, d) {
    //     tooltip.transition().duration(200).style("opacity", 0.9);
    //     tooltip
    //       .html(
    //         "Số lượng sinh viên: " +
    //           d.value +
    //           "<br/>" +
    //           "Tỉ lệ sinh viên: " +
    //           ((d.value / totalStudents) * 100).toFixed(1) +
    //           "%"
    //       )
    //       .style("left", event.pageX + "px")
    //       .style("top", event.pageY - 28 + "px");
    //   })
    //   .on("mouseout", function (d) {
    //     tooltip.transition().duration(500).style("opacity", 0);
    //   });

    g.append("g")
      .attr("transform", "translate(0," + 450 + ")")
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-25)")
      .style("text-anchor", "end");
  }, [reportClass]);

  return (
    <div className="flex">
      <div className="bg-[#ffff] ml-4 rounded-[12px] p-3">
        <div className="flex items-center">
          <div className="font-bold text-[20px] ml-[26px]">
            Thống kê sinh viên theo từng khoa
          </div>
          <div className="ml-3">
            <FaChartPie />
          </div>
        </div>

        <div className="flex relative">
          <div className="absolute top-[30px] right-[260px] bg-[#4a4397] p-2 rounded-[8px]">
            <IoManSharp color="#ffff" />
          </div>
          <svg ref={ref}></svg>
          <svg ref={legendRef}></svg>
        </div>

        <div className=" w-full space-y-4 bg-[#f7f7fc] px-5 rounded-xl relative py-3">
          <div className="absolute bg-[#ff6483] p-2 rounded-[8px] top-[-12px] left-4">
            <AiOutlineControl color="#fff" />
          </div>
          <div className="flex gap-3 justify-between">
            <div className="flex gap-3 flex-col bg-[#ffff] p-5 rounded-[8px] w-[50%] relative">
              <div className="absolute top-[-7px] bg-slate-50 left-[80px]">
                Theo dõi khoa
              </div>
              <SelectOption
                name={"Chọn khóa"}
                data={
                  selectedSchoolYear
                    ? selectedSchoolYear.map((item) => {
                        return { name: item };
                      })
                    : []
                }
                onChange={(event) => {
                  setSelectedSchoolYearId(event.target.value);
                }}
              />

              <SelectOption
                style={`w-full`}
                name={"Chọn khoa"}
                data={
                  selectedFaculty
                    ? selectedFaculty.map((item) => {
                        return { id: item.ID, name: item.FacultyName };
                      })
                    : []
                }
                onChange={(event) => {
                  setSelectedFacultyId(event.target.value);
                  const selectedId = Number(event.target.value);
                  const selectedItem = selectedFaculty.find(
                    (item) => item.ID === selectedId
                  );
                  if (selectedItem) {
                    setSelectedFacultyValue(selectedItem.FacultyName);
                  }
                }}
              />

              <SelectOption
                style={`w-full`}
                name={"Chọn kỳ học"}
                data={
                  selectedSemester
                    ? selectedSemester.map((item) => {
                        return { id: item.ID, name: item };
                      })
                    : []
                }
                onChange={(event) => {
                  setSelectedSemesterValue(event.target.value);
                }}
              />
            </div>
            <div className="flex gap-3 flex-col bg-[#ffff] p-5 rounded-[8px] w-[50%] relative">
              <div className="absolute top-[-7px] bg-slate-50 left-[80px]">
                Theo dõi lớp
              </div>
              <SelectOption
                name={"Chọn khóa"}
                data={
                  selectedSchoolYear
                    ? selectedSchoolYear.map((item) => {
                        return { name: item };
                      })
                    : []
                }
                onChange={(event) => {
                  setSelectedSchoolYearId(event.target.value);
                }}
              />

              <SelectOption
                style={`w-full`}
                name={"Chọn khoa"}
                data={
                  selectedFaculty
                    ? selectedFaculty.map((item) => {
                        return { id: item.ID, name: item.FacultyName };
                      })
                    : []
                }
                onChange={(event) => {
                  setSelectedFacultyId(event.target.value);
                  const selectedId = Number(event.target.value);
                  const selectedItem = selectedFaculty.find(
                    (item) => item.ID === selectedId
                  );
                  if (selectedItem) {
                    setSelectedFacultyValue(selectedItem.FacultyName);
                  }
                }}
              />

              <SelectOption
                style={`w-full`}
                name={"Chọn lớp"}
                data={
                  selectedClass
                    ? selectedClass.map((item) => {
                        return { id: item.ID, name: item.NameClass };
                      })
                    : []
                }
                onChange={(event) => {
                  setSelectedClassId(event.target.value);
                  const selectedId = Number(event.target.value);
                  const selectedItem = selectedClass.find(
                    (item) => item.ID === selectedId
                  );
                  if (selectedItem) {
                    setSelectedClassValue(selectedItem.NameClass);
                  }
                }}
              />

              <SelectOption
                style={`w-full`}
                name={"Chọn kỳ học"}
                data={
                  selectedSemester
                    ? selectedSemester.map((item) => {
                        return { id: item.ID, name: item };
                      })
                    : []
                }
                onChange={(event) => {
                  setSelectedSemesterValue(event.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#fff] ml-2 rounded-[12px] p-3">
        <div className="flex items-center">
          <div className="font-bold text-[20px] ml-[26px]">
            Thống kê sinh viên theo từng lớp
          </div>
          <div className="ml-3">
            <FaChartColumn />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <svg ref={barChartRef}></svg>
        </div>
      </div>
    </div>
  );
};

export default DashBoash;
