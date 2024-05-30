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
  CategoryDepartment,
  CategorySubject,
} from "../../components";

import {
  apiAllFaculties,
  apiClassById,
  apiDataPoint,
  apiImportScore,
} from "../../apis";

const {
  AiOutlineCloudUpload,
  AiOutlineSend,
  CgImport,
  TiPlus,
  FiTrash2,
  LuPencilLine,
  MdOutlineSend,
  GrUpdate,
  SiGoogleclassroom,
  FaRegCalendarAlt,
  SlCalender,
  MdSubject,
  FaChartColumn,
  FaChartPie,
  IoManSharp,
  AiOutlineControl,
} = icons;

const DashBoash = () => {
  const [faculties, setFaculties] = useState([]);

  // api select option khoa
  useEffect(() => {
    const fetchData = async () => {
      const url = "v1/point/select-all-faculty";
      const facultie = await apiAllFaculties(url);
      setFaculties(facultie?.data);
    };
    fetchData();
  }, []);

  const ref = useRef();
  const legendRef = useRef();

  useEffect(() => {
    const totalStudents = 600;
    const studentsAtRiskOfNotQualifyingForExam = Math.floor(
      Math.random() * totalStudents
    );
    const studentsAtRiskOfRepeatingTheYear = Math.floor(
      Math.random() * (totalStudents - studentsAtRiskOfNotQualifyingForExam)
    );
    const studentsAtRiskOfNotGraduating = Math.floor(
      Math.random() *
        (totalStudents -
          studentsAtRiskOfNotQualifyingForExam -
          studentsAtRiskOfRepeatingTheYear)
    );
    const studentTuitionDebt = Math.floor(
      Math.random() *
        (totalStudents -
          studentsAtRiskOfNotQualifyingForExam -
          studentsAtRiskOfRepeatingTheYear -
          studentsAtRiskOfNotGraduating)
    );
    const studentsNotAtRisk =
      totalStudents -
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
        .html(
          "Số lượng sinh viên: " +
            d.data.value +
            "<br/>" +
            "Tỉ lệ sinh viên: " +
            ((d.data.value / totalStudents) * 100).toFixed(1) +
            "%"
        )
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
      .attr("height", rectHeight)
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
  }, []);

  const barChartRef = useRef();
  useEffect(() => {
    const totalStudents = 100;
    const studentsAtRiskOfNotQualifyingForExam = Math.floor(
      Math.random() * totalStudents
    );
    const studentsAtRiskOfRepeatingTheYear = Math.floor(
      Math.random() * (totalStudents - studentsAtRiskOfNotQualifyingForExam)
    );
    const studentsAtRiskOfNotGraduating = Math.floor(
      Math.random() *
        (totalStudents -
          studentsAtRiskOfNotQualifyingForExam -
          studentsAtRiskOfRepeatingTheYear)
    );
    const studentTuitionDebt = Math.floor(
      Math.random() *
        (totalStudents -
          studentsAtRiskOfNotQualifyingForExam -
          studentsAtRiskOfRepeatingTheYear -
          studentsAtRiskOfNotGraduating)
    );
    const studentsNotAtRisk =
      totalStudents -
      studentsAtRiskOfNotQualifyingForExam -
      studentsAtRiskOfRepeatingTheYear -
      studentsAtRiskOfNotGraduating -
      studentTuitionDebt;

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
      { value: studentsNotAtRisk, label: "Trong nhóm an toàn" },
      {
        value: studentsAtRiskOfRepeatingTheYear,
        label: "Nguy cơ học lại",
      },
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

    const yScale = d3.scaleLinear().range([450, 0]).domain([0, totalStudents]);

    const g = svg
      .append("g")
      .attr("transform", "translate(" + 50 + "," + 50 + ")");
    g.append("g").call(d3.axisLeft(yScale));

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

    const tooltip = d3
      .select("body")
      .append("div")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");

    g.selectAll(".bar")
      .on("mouseover", function (event, d) {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            "Số lượng sinh viên: " +
              d.value +
              "<br/>" +
              "Tỉ lệ sinh viên: " +
              ((d.value / totalStudents) * 100).toFixed(1) +
              "%"
          )
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function (d) {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    g.append("g")
      .attr("transform", "translate(0," + 450 + ")")
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-25)")
      .style("text-anchor", "end");
  }, []);

  return (
    <div className="">
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
                  style={`w-[300px]`}
                  name={"Chọn khóa"}
                  data={faculties}
                  displayField={"FacultyName"}
                  onChange={(event) => {
                    setFacultyId(event.target.value);
                    setClassScores([]);
                    setCourses([]);
                  }}
                />
                <SelectOption
                  style={`w-[300px]`}
                  name={"Chọn khoa"}
                  data={faculties}
                  displayField={"FacultyName"}
                  onChange={(event) => {
                    setFacultyId(event.target.value);
                    setClassScores([]);
                    setCourses([]);
                  }}
                />

                <SelectOption
                  style={`w-[300px]`}
                  name={"Chọn năm học"}
                  data={faculties}
                  displayField={"FacultyName"}
                  onChange={(event) => {
                    setFacultyId(event.target.value);
                    setClassScores([]);
                    setCourses([]);
                  }}
                />

                <SelectOption
                  style={`w-[300px]`}
                  name={"Chọn học kỳ"}
                  data={faculties}
                  displayField={"FacultyName"}
                  onChange={(event) => {
                    setFacultyId(event.target.value);
                    setClassScores([]);
                    setCourses([]);
                  }}
                />
              </div>
              <div className="flex gap-3 flex-col bg-[#ffff] p-5 rounded-[8px] w-[50%] relative">
                <div className="absolute top-[-7px] bg-slate-50 left-[80px]">
                  Theo dõi lớp
                </div>
                <SelectOption
                  style={`w-[300px]`}
                  name={"Chọn khóa"}
                  data={faculties}
                  displayField={"FacultyName"}
                  onChange={(event) => {
                    setFacultyId(event.target.value);
                    setClassScores([]);
                    setCourses([]);
                  }}
                />
                <SelectOption
                  style={`w-[300px]`}
                  name={"Chọn khoa"}
                  data={faculties}
                  displayField={"FacultyName"}
                  onChange={(event) => {
                    setFacultyId(event.target.value);
                    setClassScores([]);
                    setCourses([]);
                  }}
                />
                <SelectOption
                  style={`w-[300px]`}
                  name={"Chọn lớp"}
                  data={faculties}
                  displayField={"FacultyName"}
                  onChange={(event) => {
                    setFacultyId(event.target.value);
                    setClassScores([]);
                    setCourses([]);
                  }}
                />

                <SelectOption
                  style={`w-[300px]`}
                  name={"Chọn năm học"}
                  data={faculties}
                  displayField={"FacultyName"}
                  onChange={(event) => {
                    setFacultyId(event.target.value);
                    setClassScores([]);
                    setCourses([]);
                  }}
                />

                <SelectOption
                  style={`w-[300px]`}
                  name={"Chọn học kỳ"}
                  data={faculties}
                  displayField={"FacultyName"}
                  onChange={(event) => {
                    setFacultyId(event.target.value);
                    setClassScores([]);
                    setCourses([]);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#fff] ml-2 rounded-[12px] p-3">
          <div className="flex items-center">
            <div className="font-bold text-[20px] ml-[26px]">
              Thống kê sinh viên theo từng lớp (sĩ số: 100 sv)
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
    </div>
  );
};

export default DashBoash;
