/** @format */

const ScoreOther = ({ teacherName, className, facultyName }) => {
  return (
    <>
      {teacherName && (
        <div className="bg-[#ffffff] px-4 leading-10 py-3">
          <ul className="flex flex-wrap gap-2 justify-between">
            <li>
              <div className="inline font-bold bg-[#FAFAFA] py-1 rounded">
                Giáo viên giảng dạy:{" "}
              </div>
              <span className="">{teacherName}</span>
            </li>
            <li className="ml-16">
              <div className="inline font-bold bg-[#FAFAFA] py-1 rounded">
                Lớp:{" "}
              </div>
              <span className="">{className}</span>
            </li>
            <li className="ml-16">
              <div className="inline font-bold bg-[#FAFAFA] p-1 rounded">
                Khoa:
              </div>
              <span className="">{facultyName}</span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ScoreOther;
