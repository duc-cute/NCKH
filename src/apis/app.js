import axios from "../axios";

const fetchData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getAllFaculties = async () => {
    const url = 'http://localhost:2008/api/v1/point/select-all-faculty';
    return fetchData(url);
};

export const getClassById = async (id) => {
    const url = `http://localhost:2008/api/v1/point/select-class-by-id/${id}`;
    return fetchData(url);
};

export const getcoursesById = async (id) => {
    const url = `http://localhost:2008/api/v1/point/select-courses-by-id-class/${id}`;
    return fetchData(url);
};

export const getDataPoint = async (IdFaculty, idClass, idCourse) => {
    const url = `http://localhost:2008/api/v1/point/select-point-by-id-class-id-faculty-id-course?IdFaculty=${IdFaculty}&idClass=${idClass}&idCourse=${idCourse}`;
    return fetchData(url);
};