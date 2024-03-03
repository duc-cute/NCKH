const ScoreOther = () => {
    return (<>
        <div className="bg-[#ffffff] px-4 leading-10 py-6">
            <ul className="flex flex-wrap">
                <li>
                    <div className="inline font-bold bg-[#FAFAFA] py-1 rounded">Giáo viên giảng dạy:   </div>
                    <span className="ml-5 ">Nguyễn Đức Thiện</span>
                </li>
                <li className="ml-16">
                    <div className="inline font-bold bg-[#FAFAFA] py-1 rounded">Lớp: </div>
                    <span className="ml-5 ">KNMFE_DCCNTT11.10.1.1_LT</span>

                </li>
                <li className="ml-16">
                    <div className="inline font-bold bg-[#FAFAFA] p-1 rounded">Khoa:</div>
                    <span className="ml-2 ">Công nghệ thông tin</span>
                </li>

            </ul>

        </div>
    </>);
}

export default ScoreOther;