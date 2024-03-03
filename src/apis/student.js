/** @format */

import axios from "../axios";

export const apiImportScore = (data) =>
    axios({
        url: "http://localhost:2008/api/v1/point/import-point",
        method: "post",
        data,
    });

