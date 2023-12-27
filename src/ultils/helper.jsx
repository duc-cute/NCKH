/** @format */
import icons from "./icons";
const { AiFillStar, AiOutlineStar } = icons;

export const validate = (payload, setInvalidFields) => {
  let invalid = 0;
  // console.log("payload", payload);
  const formatPayload = Object.entries(payload);
  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalid++;
      setInvalidFields((prev) => [
        ...prev,
        { name: arr[0], mes: "Require this field" },
      ]);
    }
  }
  for (let arr of formatPayload) {
    switch (arr[0]) {
      case "email":
        const regex = new RegExp("^[^@]+@eaut.edu.vn$");

        if (!arr[1].match(regex)) {
          invalid++;
          setInvalidFields((prev) => [
            ...prev,
            {
              name: arr[0],
              mes: "You must enter the email provided by the school.",
            },
          ]);
        }
        break;
      case "password":
        const regexPasswordHard = new RegExp("^(?=.*[0-9])(?=.*[A-Z]).+$");
        if (arr[1].length < 8) {
          invalid++;
          setInvalidFields((prev) => [
            ...prev,
            {
              name: arr[0],
              mes: "Password 8 characters or more",
            },
          ]);
        }

        if (!arr[1].match(regexPasswordHard)) {
          invalid++;
          setInvalidFields((prev) => [
            ...prev,
            {
              name: arr[0],
              mes: "Password  including numbers and capital letters",
            },
          ]);
        }

        break;

      case "confirmPassword":
        if (arr[1].length < 8) {
          invalid++;
          setInvalidFields((prev) => [
            ...prev,
            {
              name: arr[0],
              mes: "Confirm Password 8 characters or more",
            },
          ]);
        }
        if (arr[1] !== payload["password"]) {
          invalid++;
          setInvalidFields((prev) => [
            ...prev,
            {
              name: arr[0],
              mes: "Passwords do not match",
            },
          ]);
        }

        break;
      default:
        break;
    }
  }

  return invalid;
};
