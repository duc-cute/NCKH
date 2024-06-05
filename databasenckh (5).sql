-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2024 at 09:43 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `databasenckh`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `ID` int(11) NOT NULL,
  `ActivityName` varchar(255) DEFAULT NULL,
  `Location` varchar(255) DEFAULT NULL,
  `Time` datetime DEFAULT NULL,
  `Describe` text DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `categoryId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `articlecategory`
--

CREATE TABLE `articlecategory` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `order` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `ID` int(11) NOT NULL,
  `AttendanceStatus` varchar(255) DEFAULT NULL,
  `Day` date DEFAULT NULL,
  `Semester` int(255) DEFAULT NULL,
  `SchoolYear` varchar(255) DEFAULT NULL,
  `IDStudent` int(11) DEFAULT NULL,
  `IDTeacher` int(11) DEFAULT NULL,
  `IDCourse` int(11) DEFAULT NULL,
  `Comment` varchar(255) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`ID`, `AttendanceStatus`, `Day`, `Semester`, `SchoolYear`, `IDStudent`, `IDTeacher`, `IDCourse`, `Comment`, `CreateAt`, `UpdateAt`) VALUES
(41, '32', '2021-10-01', 2, '2021-2022', 87, NULL, 27, NULL, '2024-03-13 15:51:33', '2024-03-14 06:24:20'),
(43, '', '2022-10-01', 2, '2021-2022', 87, NULL, 27, NULL, '2024-03-13 15:51:33', '2024-03-14 06:17:13'),
(44, '32', '2021-10-01', 2, '2021-2022', 140, NULL, 31, NULL, '2024-03-14 06:31:48', '2024-03-14 06:31:48'),
(45, '', '2022-10-01', 2, '2021-2022', 140, NULL, 31, NULL, '2024-03-14 06:31:48', '2024-03-14 06:31:48'),
(46, '3', '2021-10-01', 2, '2021-2022', 141, NULL, 31, NULL, '2024-03-14 07:08:45', '2024-03-14 07:08:45'),
(47, '', '2022-10-01', 2, '2021-2022', 141, NULL, 31, NULL, '2024-03-14 07:08:45', '2024-03-14 07:08:45'),
(48, '', '2021-10-01', 2, '2021-2022', 142, NULL, 31, NULL, '2024-03-14 07:11:46', '2024-03-14 07:11:46');

-- --------------------------------------------------------

--
-- Table structure for table `blockknowledge`
--

CREATE TABLE `blockknowledge` (
  `ID` int(11) NOT NULL,
  `NameBlockKnowledge` varchar(255) DEFAULT NULL,
  `Credits` int(11) DEFAULT NULL,
  `IDStudyProgram` int(11) DEFAULT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blockknowledge`
--

INSERT INTO `blockknowledge` (`ID`, `NameBlockKnowledge`, `Credits`, `IDStudyProgram`, `CreatedAt`, `UpdatedAt`) VALUES
(63, 'Kiến thức đại cương', 37, 1, '2024-06-01 00:39:04', '2024-06-01 00:39:04'),
(64, 'Kiến thức cơ sở ngành', 27, 1, '2024-06-01 00:39:04', '2024-06-01 00:39:04');

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `ID` int(11) NOT NULL,
  `NameClass` varchar(255) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `IDFaculty` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`ID`, `NameClass`, `CreateAt`, `UpdateAt`, `IDFaculty`) VALUES
(5, 'DCCNTT12.10.3', '2024-03-06 07:03:23', '2024-03-14 06:38:41', 53),
(6, 'KNMFE_DCCNTT11.10.1.1_LT', '2024-03-10 16:47:13', '2024-03-10 16:47:13', 53),
(8, 'DCCNTT12.10.2', '2024-05-25 01:29:22', '2024-05-25 01:29:22', 53),
(11, 'DCCNTT12.10.4', '2024-05-27 04:08:01', '2024-05-27 04:08:01', 63),
(12, 'DCCNTT12.10.5', '2024-05-27 04:08:01', '2024-05-27 04:08:01', 63),
(14, 'DCCNTT12.10.7', '2024-05-27 04:08:01', '2024-05-27 04:08:01', 63),
(15, 'DCCNTT12.10.8', '2024-05-27 04:08:01', '2024-05-27 04:08:01', 63),
(16, 'DCCNTT12.10.9', '2024-05-27 04:08:01', '2024-05-27 04:08:01', 63),
(17, 'DQTKD12.10.3', '2024-05-27 04:08:01', '2024-05-27 04:08:01', 64),
(18, 'DQTKD12.10.4', '2024-05-27 04:08:01', '2024-05-27 04:08:01', 64),
(19, 'DQTKD12.10.5', '2024-05-27 04:08:01', '2024-05-27 04:08:01', 64),
(20, 'DQTKD12.10.6', '2024-05-27 04:08:01', '2024-05-27 04:08:01', 64),
(21, 'DQTKD12.10.7', '2024-05-27 04:08:01', '2024-05-27 04:08:01', 64),
(22, 'DQTKD12.10.8', '2024-05-27 04:08:01', '2024-05-27 04:08:01', 64),
(23, 'DQTKD12.10.9', '2024-05-27 04:08:01', '2024-05-27 04:08:01', 64),
(39, 'DCCNTT12.10.6', '2024-05-27 04:15:11', '2024-05-27 04:15:11', 63),
(50, 'DCCNTT12.10.50', '2024-05-28 16:31:11', '2024-05-28 16:31:11', 63);

-- --------------------------------------------------------

--
-- Table structure for table `class_course`
--

CREATE TABLE `class_course` (
  `IDCourse` int(11) DEFAULT NULL,
  `IDClass` int(11) DEFAULT NULL,
  `semester` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_course`
--

INSERT INTO `class_course` (`IDCourse`, `IDClass`, `semester`) VALUES
(26, 5, NULL),
(27, 6, NULL),
(31, 5, NULL),
(26, 5, NULL),
(27, 6, NULL),
(31, 5, NULL),
(30, 5, NULL),
(146, 5, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `codecourseprerequisite`
--

CREATE TABLE `codecourseprerequisite` (
  `IDCourse` int(11) DEFAULT NULL,
  `CodeName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `codecourseprerequisite`
--

INSERT INTO `codecourseprerequisite` (`IDCourse`, `CodeName`) VALUES
(145, 'IT1208'),
(147, 'IT1208');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `ID` int(11) NOT NULL,
  `NameCourse` varchar(255) DEFAULT NULL,
  `NumberOfCredits` int(11) DEFAULT NULL,
  `Describe` text DEFAULT NULL,
  `Schedule` text DEFAULT NULL,
  `TotalHours` int(11) NOT NULL,
  `FinalExamDate` date NOT NULL,
  `Semester` varchar(255) DEFAULT NULL,
  `IDBlockKnowledge` int(11) DEFAULT NULL,
  `STT` int(11) DEFAULT NULL,
  `CourseCode` varchar(255) DEFAULT NULL,
  `ExerciseTheory` int(11) DEFAULT NULL,
  `Practice` int(11) DEFAULT NULL,
  `BigExercise` int(11) DEFAULT NULL,
  `SpecializedProjects` int(11) DEFAULT NULL,
  `SelfLearning` int(11) DEFAULT NULL,
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`ID`, `NameCourse`, `NumberOfCredits`, `Describe`, `Schedule`, `TotalHours`, `FinalExamDate`, `Semester`, `IDBlockKnowledge`, `STT`, `CourseCode`, `ExerciseTheory`, `Practice`, `BigExercise`, `SpecializedProjects`, `SelfLearning`, `UpdateAt`, `CreateAt`) VALUES
(26, 'Lập trình C', 3, NULL, NULL, 30, '2024-03-06', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-06 07:03:23', '2024-03-06 07:03:23'),
(27, 'Kỹ năng mềm (Luyện ôn FE)', 3, NULL, NULL, 123, '2024-02-24', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-02 02:39:32', '2024-03-10 16:47:13'),
(30, 'Lập trình C++', NULL, NULL, NULL, 0, '0000-00-00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-13 14:27:33', '2024-03-13 14:27:33'),
(31, 'Kiểm thử phần mềm', NULL, NULL, NULL, 0, '0000-00-00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-14 06:31:48', '2024-03-14 06:31:48'),
(144, 'Tư tưởng Hồ Chí Minh', 2, NULL, NULL, 0, '0000-00-00', '4', 63, 1, 'SSH1205', 2, 0, 0, 0, 30, '2024-06-01 00:39:04', '2024-06-01 00:39:04'),
(145, 'Triết học Mác - Lênin', 3, NULL, NULL, 0, '0000-00-00', '4', 63, 1, 'SSH1201', 3, 0, 0, 0, 45, '2024-06-01 00:39:04', '2024-06-01 00:39:04'),
(146, 'Cơ sở lập trình với C', 3, NULL, NULL, 0, '0000-00-00', '2', 64, 18, 'IT2201', 2, 1, 0, 0, 75, '2024-06-01 00:39:04', '2024-06-01 00:39:04'),
(147, 'Hệ thống thông tin quản lý', 3, NULL, NULL, 0, '0000-00-00', '4', 64, 2, 'IT2204', 2, 1, 0, 0, 75, '2024-06-01 00:39:04', '2024-06-01 00:39:04');

-- --------------------------------------------------------

--
-- Table structure for table `course_documentlibrary`
--

CREATE TABLE `course_documentlibrary` (
  `IDCourse` int(11) NOT NULL,
  `IDDocumentLibrary` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_studyprogram`
--

CREATE TABLE `course_studyprogram` (
  `IDCourse` int(11) NOT NULL,
  `IDStudyProgram` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_studyprogram`
--

INSERT INTO `course_studyprogram` (`IDCourse`, `IDStudyProgram`) VALUES
(144, 1),
(145, 1),
(146, 1),
(147, 1);

-- --------------------------------------------------------

--
-- Table structure for table `documentlibrary`
--

CREATE TABLE `documentlibrary` (
  `ID` int(11) NOT NULL,
  `NameDOC` varchar(255) DEFAULT NULL,
  `Status` varchar(255) DEFAULT NULL,
  `Source` varchar(255) DEFAULT NULL,
  `Url` varchar(255) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `equivalent`
--

CREATE TABLE `equivalent` (
  `StudyProgramEquivaletName` varchar(255) DEFAULT NULL,
  `IDStudyProgram` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `ID` int(11) NOT NULL,
  `FacultyName` varchar(255) DEFAULT NULL,
  `Founding` date DEFAULT NULL,
  `Describe` text DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `PhoneNumber` varchar(255) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`ID`, `FacultyName`, `Founding`, `Describe`, `Email`, `PhoneNumber`, `CreateAt`, `UpdateAt`) VALUES
(52, 'QTKD', NULL, NULL, NULL, NULL, '2024-03-06 07:03:23', '2024-05-20 16:32:40'),
(53, 'Công nghệ thông tin', NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(63, 'Khoa Công Nghệ Thông Tin', NULL, NULL, NULL, NULL, '2024-05-27 04:08:01', '2024-05-27 04:08:01'),
(64, 'Khoa Quản Trị Kinh Doanh', NULL, NULL, NULL, NULL, '2024-05-27 04:08:01', '2024-05-27 04:08:01'),
(71, 'Khoa Công Cơ Khí', '2022-07-01', 'Khoa Công nghệ thông tin là nơi đào tạo các chuyên ngành về công nghệ thông tin.', 'khoacntt@eaut.edu.vn', '0123456789', '2024-05-27 04:39:11', '2024-05-27 04:39:26'),
(72, 'Khoa Điện Lạnh', '2021-07-01', 'Khoa Quản trị kinh doanh là nơi đào tạo các chuyên ngành về quản trị kinh doanh.', 'khoaqtkd@eaut.edu.vn', '0123456789', '2024-05-27 04:39:11', '2024-05-27 04:39:11');

-- --------------------------------------------------------

--
-- Table structure for table `function`
--

CREATE TABLE `function` (
  `ID` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `ModuleID` int(11) DEFAULT NULL,
  `Order` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `functioninrole`
--

CREATE TABLE `functioninrole` (
  `ID` int(11) NOT NULL,
  `FunctionID` int(11) DEFAULT NULL,
  `RoleID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobposition`
--

CREATE TABLE `jobposition` (
  `StudyProgramJobPosition` varchar(255) DEFAULT NULL,
  `IDStudyProgram` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `module`
--

CREATE TABLE `module` (
  `ID` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Order` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `point`
--

CREATE TABLE `point` (
  `ID` int(11) NOT NULL,
  `Frequent` varchar(255) DEFAULT NULL,
  `MidtermScore` float DEFAULT NULL,
  `FinalExamScore` float DEFAULT NULL,
  `AverageScore` float DEFAULT NULL,
  `Scores` float DEFAULT NULL,
  `LetterGrades` varchar(255) DEFAULT NULL,
  `ScoreScale10` float DEFAULT NULL,
  `ScoreScale4` float DEFAULT NULL,
  `ExcludingTBC` tinyint(1) DEFAULT NULL,
  `Semester` int(11) DEFAULT NULL,
  `Note` text DEFAULT NULL,
  `IDUser` int(11) DEFAULT NULL,
  `IDCourse` int(11) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `point`
--

INSERT INTO `point` (`ID`, `Frequent`, `MidtermScore`, `FinalExamScore`, `AverageScore`, `Scores`, `LetterGrades`, `ScoreScale10`, `ScoreScale4`, `ExcludingTBC`, `Semester`, `Note`, `IDUser`, `IDCourse`, `CreateAt`, `UpdateAt`) VALUES
(63, '10', 3, 3, 3, 3, 'F', NULL, NULL, NULL, NULL, 'ABC', 86, 26, '2024-03-06 07:03:23', '2024-06-02 02:37:15'),
(65, '8', 2, 2, 2, 2, 'F', NULL, NULL, NULL, NULL, 'k', 86, 27, '2024-03-10 16:47:13', '2024-06-02 02:37:54'),
(66, '6', 6, 4, 6, 0, '1', NULL, NULL, NULL, NULL, 'k', 88, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(67, '8', 9, 7.2, 8.7, 0, '3', NULL, NULL, NULL, NULL, 'k', 89, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(68, '6', 6, 8, 6, 0, '3', NULL, NULL, NULL, NULL, 'k', 90, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(69, '7', 8, 7.2, 7.7, 0, '3', NULL, NULL, NULL, NULL, 'k', 91, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(70, '10', 9, 8.4, 9.3, 0, '3.6', NULL, NULL, NULL, NULL, 'k', 92, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(71, '7', 7, 4.8, 7, 0, '2', NULL, NULL, NULL, NULL, 'k', 93, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(72, '8', 8, 6.8, 8, 0, '3', NULL, NULL, NULL, NULL, 'k', 94, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(73, '8', 7, 7.2, 7.3, 0, '3', NULL, NULL, NULL, NULL, 'k', 95, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(74, '6', 6, 6.4, 6, 0, '2', NULL, NULL, NULL, NULL, 'k', 96, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(75, '8', 9, 6.4, 8.7, 0, '3', NULL, NULL, NULL, NULL, 'k', 97, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(76, '7', 7, 6.8, 7, 0, '2.5', NULL, NULL, NULL, NULL, 'k', 98, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(77, '7', 9, 6, 8.3, 0, '2.5', NULL, NULL, NULL, NULL, 'k', 99, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(78, '7', 6, 6.8, 6.3, 0, '2.5', NULL, NULL, NULL, NULL, 'k', 100, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(79, '9', 9, 8.2, 9, 0, '3.2', NULL, NULL, NULL, NULL, 'k', 101, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(80, '7', 6, 8, 6.3, 0, '3', NULL, NULL, NULL, NULL, 'k', 102, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(81, '0', 0, 0, 0, 0, '0', NULL, NULL, NULL, NULL, 'K', 103, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(82, '7', 6, 8, 6.3, 0, '3', NULL, NULL, NULL, NULL, 'K', 104, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(83, '7', 6, 6.8, 6.3, 0, '2.5', NULL, NULL, NULL, NULL, 'K', 105, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(84, '8', 6, 6.4, 6.7, 0, '2.5', NULL, NULL, NULL, NULL, 'K', 106, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(85, '7', 7, 7.6, 7, 0, '3', NULL, NULL, NULL, NULL, 'K', 107, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(86, '8', 7, 6.8, 7.3, 0, '3', NULL, NULL, NULL, NULL, 'K', 108, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(87, '8', 9, 6.4, 8.7, 0, '3', NULL, NULL, NULL, NULL, 'K', 109, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(89, '7', 6, 6.4, 6.3, 0, '2', NULL, NULL, NULL, NULL, 'K', 111, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(90, '7', 7, 5.6, 7, 0, '2', NULL, NULL, NULL, NULL, 'K', 112, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(91, '7', 6, 5.2, 6.3, 0, '2', NULL, NULL, NULL, NULL, 'K', 113, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(92, '8', 6, 6.8, 6.7, 0, '2.5', NULL, NULL, NULL, NULL, 'K', 114, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(93, '7', 8, 6, 7.7, 0, '2.5', NULL, NULL, NULL, NULL, 'K', 115, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(94, '6', 6, 7.2, 6, 0, '2.5', NULL, NULL, NULL, NULL, 'K', 116, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(95, '0', 0, 0, 0, 0, '0', NULL, NULL, NULL, NULL, 'K', 117, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(96, '8', 7, 7.2, 7.3, 0, '3', NULL, NULL, NULL, NULL, 'K', 118, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(97, '7', 7, 6.8, 7, 0, '2.5', NULL, NULL, NULL, NULL, 'K', 119, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(98, '6', 6, 6.4, 6, 0, '2', NULL, NULL, NULL, NULL, 'K', 120, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(99, '6', 6, 8, 6, 0, '3', NULL, NULL, NULL, NULL, 'K', 121, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(100, '7', 9, 7.8, 8.3, 0, '3.2', NULL, NULL, NULL, NULL, 'K', 122, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(101, '6', 9, 7.6, 8, 0, '3', NULL, NULL, NULL, NULL, 'K', 123, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(102, '8', 7, 5.6, 7.3, 0, '2', NULL, NULL, NULL, NULL, 'K', 124, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(103, '7', 8, 8.6, 7.7, 0, '3.2', NULL, NULL, NULL, NULL, 'K', 125, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(104, '8', 9, 8.4, 8.7, 0, '3.6', NULL, NULL, NULL, NULL, 'K', 126, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(105, '7', 9, 7.6, 8.3, 0, '3', NULL, NULL, NULL, NULL, 'K', 127, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(106, '8', 9, 7.8, 8.7, 0, '3.2', NULL, NULL, NULL, NULL, 'K', 128, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(107, '7', 7, 6.4, 7, 0, '2.5', NULL, NULL, NULL, NULL, 'K', 129, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(108, '8', 6, 6, 6.7, 0, '2', NULL, NULL, NULL, NULL, 'K', 130, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(109, '8', 6, 7.3, 6.7, 0, '3', NULL, NULL, NULL, NULL, 'K', 131, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(110, '7', 6, 7.6, 6.3, 0, '3', NULL, NULL, NULL, NULL, 'K', 132, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(111, '6', 7, 8.6, 6.7, 0, '3.2', NULL, NULL, NULL, NULL, 'K', 133, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(112, '7', 6, 6.5, 6.3, 0, '2.5', NULL, NULL, NULL, NULL, 'K', 134, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(113, '6', 7, 4.9, 6.7, 0, '1.5', NULL, NULL, NULL, NULL, 'K', 135, 27, '2024-03-10 16:47:13', '2024-03-11 05:45:47'),
(118, '10', 10, 10, 0, 4, 'A+', NULL, NULL, NULL, NULL, 'ABC', 166, 26, '2024-05-30 15:36:07', '2024-05-30 15:36:07'),
(122, '-1', -1, -1, 0, 4, 'A+', NULL, NULL, NULL, NULL, 'ABC', 166, 146, '2024-06-01 03:18:57', '2024-06-01 03:27:30');

-- --------------------------------------------------------

--
-- Table structure for table `relatives`
--

CREATE TABLE `relatives` (
  `id` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `permanentResidence` varchar(255) DEFAULT NULL,
  `ethnicity` varchar(255) DEFAULT NULL,
  `religion` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Role` varchar(255) DEFAULT NULL,
  `PhoneNumber` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `relatives`
--

INSERT INTO `relatives` (`id`, `studentId`, `Name`, `dateOfBirth`, `occupation`, `nationality`, `permanentResidence`, `ethnicity`, `religion`, `createdAt`, `updatedAt`, `Role`, `PhoneNumber`) VALUES
(1, 86, 'Nguyễn Viết Quân', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-28 16:31:11', '2024-05-31 15:54:57', 'Cha', '0123456789'),
(2, 86, 'Đinh Thị Bích Xoan', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-28 16:31:11', '2024-05-31 15:55:01', 'Mẹ', '0123456789'),
(3, 151, 'Nguyễn Viết Quân', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-28 16:31:13', '2024-05-28 16:31:13', 'Cha', '0123456789'),
(4, 151, 'Đinh Thị Bích Xoan', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-28 16:31:13', '2024-05-28 16:31:13', 'Mẹ', '0123456789'),
(5, 152, 'Nguyễn Viết Quân', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-28 16:31:14', '2024-05-28 16:31:14', 'Cha', '0123456789'),
(6, 152, 'Đinh Thị Bích Xoan', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-28 16:31:14', '2024-05-28 16:31:14', 'Mẹ', '0123456789'),
(7, 153, 'Nguyễn Viết Quân', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-28 16:31:14', '2024-05-28 16:31:14', 'Cha', '0123456789'),
(8, 153, 'Đinh Thị Bích Xoan', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-28 16:31:14', '2024-05-28 16:31:14', 'Mẹ', '0123456789'),
(9, 154, 'Nguyễn Viết Quân', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-28 16:31:15', '2024-05-28 16:31:15', 'Cha', '0123456789'),
(10, 154, 'Đinh Thị Bích Xoan', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-28 16:31:15', '2024-05-28 16:31:15', 'Mẹ', '0123456789'),
(11, 155, 'Nguyễn Viết Quân', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-29 02:00:41', '2024-05-29 02:00:41', 'Cha', '0123456789'),
(12, 155, 'Đinh Thị Bích Xoan', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-29 02:00:41', '2024-05-29 02:00:41', 'Mẹ', '0123456789'),
(13, 156, 'Nguyễn Viết Quân', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-29 02:02:19', '2024-05-29 02:02:19', 'Cha', '0123456789'),
(14, 156, 'Đinh Thị Bích Xoan', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-29 02:02:19', '2024-05-29 02:02:19', 'Mẹ', '0123456789'),
(15, 157, 'Nguyễn Viết Quân', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-29 02:02:53', '2024-05-29 02:02:53', 'Cha', '0123456789'),
(16, 157, 'Đinh Thị Bích Xoan', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-29 02:02:53', '2024-05-29 02:02:53', 'Mẹ', '0123456789'),
(17, 158, 'Nguyễn Viết Quân', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-29 02:03:17', '2024-05-29 02:03:17', 'Cha', '0123456789'),
(18, 158, 'Đinh Thị Bích Xoan', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-29 02:03:17', '2024-05-29 02:03:17', 'Mẹ', '0123456789'),
(19, 159, 'Đinh Thị Bích Xoan', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-29 02:09:31', '2024-05-31 15:07:02', 'Mẹ', '0123456789'),
(20, 159, 'Đinh Thị Bích Xoan', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-29 02:09:31', '2024-05-31 15:07:02', 'Mẹ', '0123456789');

-- --------------------------------------------------------

--
-- Table structure for table `reward`
--

CREATE TABLE `reward` (
  `ID` int(11) NOT NULL,
  `RewardName` varchar(255) DEFAULT NULL,
  `ReceivedDate` date DEFAULT NULL,
  `Achievements` text DEFAULT NULL,
  `Describe` text DEFAULT NULL,
  `Contact` varchar(255) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `ID` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Order` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`ID`, `Name`, `Order`) VALUES
(1, 'Admin', 1),
(2, 'Lecturers', 2),
(3, 'User', 3);

-- --------------------------------------------------------

--
-- Table structure for table `studyprogram`
--

CREATE TABLE `studyprogram` (
  `ID` int(11) NOT NULL,
  `ProgramName` varchar(255) DEFAULT NULL,
  `Key` varchar(255) DEFAULT NULL,
  `CreditNumber` varchar(255) DEFAULT NULL,
  `CompletionTime` varchar(255) DEFAULT NULL,
  `Describe` text DEFAULT NULL,
  `IdFaculty` int(11) DEFAULT NULL,
  `CodeStudyProgram` varchar(255) DEFAULT NULL,
  `EducationalLevel` varchar(255) DEFAULT NULL,
  `TypeOfEducation` varchar(255) DEFAULT NULL,
  `Diploma` varchar(255) DEFAULT NULL,
  `LanguageOfInstruction` varchar(255) DEFAULT NULL,
  `GradingScale` int(11) DEFAULT NULL,
  `GraduationRequirements` text DEFAULT NULL,
  `Extend` varchar(255) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `studyprogram`
--

INSERT INTO `studyprogram` (`ID`, `ProgramName`, `Key`, `CreditNumber`, `CompletionTime`, `Describe`, `IdFaculty`, `CodeStudyProgram`, `EducationalLevel`, `TypeOfEducation`, `Diploma`, `LanguageOfInstruction`, `GradingScale`, `GraduationRequirements`, `Extend`, `CreateAt`, `UpdateAt`) VALUES
(1, 'NGÀNH CÔNG NGHỆ THÔNG TIN', '12', '', '', NULL, 53, '', '', '', '', '', 0, '', '', '2024-05-26 03:58:02', '2024-05-31 14:58:45');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `Msv` varchar(255) DEFAULT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `FullName` varchar(255) DEFAULT NULL,
  `UserName` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Gender` varchar(255) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Avatar` varchar(255) DEFAULT NULL,
  `RefreshToken` varchar(255) DEFAULT NULL,
  `Locked` tinyint(1) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `IDClass` int(11) DEFAULT NULL,
  `Key` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `EthnicGroup` varchar(255) DEFAULT NULL,
  `Hometown` text DEFAULT NULL,
  `PermanentResidence` text DEFAULT NULL,
  `PhoneNumber` varchar(255) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Msv`, `FirstName`, `LastName`, `FullName`, `UserName`, `Password`, `Gender`, `Email`, `Avatar`, `RefreshToken`, `Locked`, `DateOfBirth`, `IDClass`, `Key`, `status`, `EthnicGroup`, `Hometown`, `PermanentResidence`, `PhoneNumber`, `CreateAt`, `UpdateAt`) VALUES
(85, NULL, NULL, NULL, 'Nguyễn Đức Thiện', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-06 07:03:23', '2024-03-06 07:03:23'),
(86, '20210796', NULL, NULL, 'demo', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 5, '12', NULL, NULL, NULL, NULL, NULL, '2024-03-06 07:03:23', '2024-05-31 15:33:23'),
(87, '20222316', NULL, NULL, 'Hoàng Thị Thùy', NULL, NULL, 'Nữ', NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-05-29 09:06:59'),
(88, '20210113', NULL, NULL, 'Lê Đức Việt', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-05-29 09:11:13'),
(89, '20200115', NULL, NULL, 'Trần Thị Ngọc Anh', NULL, NULL, 'Nữ', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(90, '20200117', NULL, NULL, 'Nguyễn Đức Hòa', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(91, '20200122', NULL, NULL, 'Nguyễn Anh Vinh', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-05-29 07:27:34'),
(92, '202107296', NULL, NULL, 'Hoàng Minh Tâm', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 5, '12', NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-06-02 02:45:28'),
(93, '20201260', NULL, NULL, 'Đào Văn Hải', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(94, '20201700', NULL, NULL, 'Nguyễn Đức Hoàng', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(95, '20200892', NULL, NULL, 'Nguyễn Mạnh Tiến', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(96, '20201070', NULL, NULL, 'Ninh Quang Hạ', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(97, '20201078', NULL, NULL, 'Nguyễn Văn Hào', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(98, '20201188', NULL, NULL, 'Nguyễn Tiến Huy', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(99, '20201218', NULL, NULL, 'Nhàn Đức Toàn', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(100, '20201237', NULL, NULL, 'Nguyễn Trung Hiếu', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(101, '20200372', NULL, NULL, 'Nguyễn Quốc Trung', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(102, '20200453', NULL, NULL, 'Bùi Thị Huyền', NULL, NULL, 'Nữ', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(103, '20200545', NULL, NULL, 'Nguyễn Thái Hùng', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(104, '20200464', NULL, NULL, 'Vũ Thị Ngọc Mai', NULL, NULL, 'Nữ', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(105, '20200230', NULL, NULL, 'Nguyễn Ngọc Lan', NULL, NULL, 'Nữ', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(106, '20200875', NULL, NULL, 'Nguyễn Duy Vương', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(107, '20200355', NULL, NULL, 'Lại Văn Hưng', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(108, '20200357', NULL, NULL, 'Vũ Duy Hiếu', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(109, '20200360', NULL, NULL, 'Dương Thị Thái Hà', NULL, NULL, 'Nữ', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(110, '20200365', NULL, NULL, 'Thang Quang Lợi', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(111, '20200368', NULL, NULL, 'Vũ Huy Anh', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(112, '20200369', NULL, NULL, 'Phạm Vũ Duy Thái', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(113, '20200146', NULL, NULL, 'Quản Thế Thành', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(114, '20200147', NULL, NULL, 'Lò An Bình', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(115, '20200150', NULL, NULL, 'Nguyễn Xuân Đức', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(116, '20200155', NULL, NULL, 'Nguyễn Mạnh Tùng', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(117, '20200158', NULL, NULL, 'Lê Quang Trường', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(118, '20200354', NULL, NULL, 'Nguyễn Thanh Tùng', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(119, '20200133', NULL, NULL, 'Cà Văn Tiên', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(120, '20200134', NULL, NULL, 'Phan Ngọc Nam', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(121, '20200135', NULL, NULL, 'Nguyễn Văn Thuận', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(122, '20200136', NULL, NULL, 'Nguyễn Đức Tài', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(123, '20200140', NULL, NULL, 'Trần Đình Quân', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(124, '20200145', NULL, NULL, 'Đỗ Văn Nhật', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(125, '20200125', NULL, NULL, 'Nguyễn Hồng Quân', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(126, '20200126', NULL, NULL, 'Phạm Anh Tuấn', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(127, '20200128', NULL, NULL, 'Hoàng Công Dụng', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(128, '20200129', NULL, NULL, 'Hoàng Đức Vinh', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(129, '20200131', NULL, NULL, 'Lê Hải Long', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(130, '20200132', NULL, NULL, 'Cà Văn Nguyên', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(131, '197480201157', NULL, NULL, 'Lê Thị Ngọc Bích', NULL, NULL, 'Nữ', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(132, '197480201181', NULL, NULL, 'Đoàn Đình Kiều', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(133, '197480201248', NULL, NULL, 'Trần Quốc Huy', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(134, '197480201289', NULL, NULL, 'Bùi Anh Thư', NULL, NULL, 'Nữ', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(135, '197480201294', NULL, NULL, 'Chu Văn Vinh', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-10 16:47:13', '2024-03-10 16:47:13'),
(139, '20210794342', NULL, NULL, 'Nguyễn Xuân Mạnh', NULL, NULL, '', NULL, NULL, NULL, NULL, '2002-07-01', 5, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-13 14:56:49', '2024-05-30 15:36:05'),
(140, '2000', NULL, NULL, 'Nguyễn Văn A', NULL, NULL, '', NULL, NULL, NULL, NULL, '2002-07-01', 5, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-14 06:31:48', '2024-03-14 06:31:48'),
(141, '2001', NULL, NULL, 'Nguyễn Văn B', NULL, NULL, '', NULL, NULL, NULL, NULL, '2002-07-01', 5, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-14 07:08:45', '2024-03-14 07:08:45'),
(142, '20210666', NULL, NULL, 'Nguyen Quoc Khanh', NULL, NULL, '', NULL, NULL, NULL, NULL, '2002-07-01', 50, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-14 07:11:46', '2024-05-29 03:26:58'),
(143, '20210858', NULL, NULL, 'Nguyễn Xuân Mạnh', 'Manh', '$2b$10$bRtgyRO/o2MtiawPrbev9O.kv7o/SHFvPbC9f1lg1ZYdLaaDBXLza', '', '20210794@eaut.edu.vn', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQzLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTczMDQwNjIsImV4cCI6MTc0ODg0MDA2Mn0.2zf6v5UoMcKT-M4g-oRQASjlL8AcaNpq6Xc99Ihef6U', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-15 15:27:18', '2024-06-02 04:54:22'),
(144, NULL, NULL, NULL, 'Mạnh Nguyên', 'ManhNguyen', '$2b$10$/PrcGRAe8NHSw9jReFtSWOHc04eeyzHSW5lQ7udJq/HHRv1guXBrS', '', '20210864@eaut.edu.vn', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ0LCJyb2xlIjoiVXNlciIsImlhdCI6MTcxNTk2Mzk0NywiZXhwIjoxNzQ3NDk5OTQ3fQ.uRywd5VCWEtLu_6dV9mah-ZPRH6qclA9zK-O7XJmsVQ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-17 16:38:56', '2024-05-17 16:39:07'),
(150, NULL, NULL, NULL, 'Nguyễn Thị A', '20210999@eaut.edu.vn', '$2b$10$7hUVSO1QxeHFM0tcJRCwJO7nAqvq.jDjF339wlB8nfp4TOE37ffku', 'Nữ', '20210794@eaut.edu.vn', NULL, NULL, NULL, '2024-05-28', 50, '3', 'active', 'Kinh', 'Hà Nội', 'Ba Vì Hà Nội', '0123456789', '2024-05-28 16:31:11', '2024-05-28 16:31:11'),
(151, NULL, NULL, NULL, 'Nguyễn Thị A', '20210999@eaut.edu.vn', '$2b$10$kHswdUEzZXsFz28ypL13PuNuczjW.Tpmu92pQQmG0uufxFsS9T6Lm', 'Nữ', '20210794@eaut.edu.vn', NULL, NULL, NULL, '2024-05-28', 50, '3', 'active', 'Kinh', 'Hà Nội', 'Ba Vì Hà Nội', '0123456789', '2024-05-28 16:31:13', '2024-05-28 16:31:13'),
(152, NULL, NULL, NULL, 'Nguyễn Thị A', '20210999@eaut.edu.vn', '$2b$10$CQjuIntaslnjpmvrtDheZecw/064r15oCWwgDF7itTE1yb5i4Mp3m', 'Nữ', '20210794@eaut.edu.vn', NULL, NULL, NULL, '2024-05-28', 50, '3', 'active', 'Kinh', 'Hà Nội', 'Ba Vì Hà Nội', '0123456789', '2024-05-28 16:31:14', '2024-05-28 16:31:14'),
(153, NULL, NULL, NULL, 'Nguyễn Thị A', '20210999@eaut.edu.vn', '$2b$10$n3eNElIVvRS6UDp3gNILSe9BE021oDx8wOuUQXkTCVlLN0t1J1yqi', 'Nữ', '20210794@eaut.edu.vn', NULL, NULL, NULL, '2024-05-28', 50, '3', 'active', 'Kinh', 'Hà Nội', 'Ba Vì Hà Nội', '0123456789', '2024-05-28 16:31:14', '2024-05-28 16:31:14'),
(154, NULL, NULL, NULL, 'Nguyễn Thị A', '20210999@eaut.edu.vn', '$2b$10$KkKQit278Qoo03XwJlPpO.d1lrhS/JVXtTUI0htL65/ra7qnNqpPe', 'Nữ', '20210794@eaut.edu.vn', NULL, NULL, NULL, '2024-05-28', 50, '3', 'active', 'Kinh', 'Hà Nội', 'Ba Vì Hà Nội', '0123456789', '2024-05-28 16:31:15', '2024-05-28 16:31:15'),
(155, NULL, NULL, NULL, 'Nguyễn Thị A', '20210999@eaut.edu.vn', '$2b$10$iM/IOFZLQql./9V4V2naHOiw.OrUB4KnWVNgVrZSe/pTUnNBKZtDm', 'Nữ', '20210794@eaut.edu.vn', NULL, NULL, NULL, '2024-05-28', 50, '3', 'active', 'Kinh', 'Hà Nội', 'Ba Vì Hà Nội', '0123456789', '2024-05-29 02:00:41', '2024-05-29 02:00:41'),
(156, NULL, NULL, NULL, 'Nguyễn Thị A', '20210999@eaut.edu.vn', '$2b$10$FHUHTWuR0.8dRw9htGx3Ru8OENl1d8AgurYt4IxKm8UPCstfbL3HG', 'Nữ', '20210794@eaut.edu.vn', NULL, NULL, NULL, '2024-05-28', 50, '3', 'active', 'Kinh', 'Hà Nội', 'Ba Vì Hà Nội', '0123456789', '2024-05-29 02:02:19', '2024-05-29 02:02:19'),
(157, NULL, NULL, NULL, 'Nguyễn Thị A', '20210999@eaut.edu.vn', '$2b$10$wZ00E1K6hKjh01B8B7RYWODvqylyacmr./IiT/FaAJEJVMcoQYHpq', 'Nữ', '20210794@eaut.edu.vn', NULL, NULL, NULL, '2024-05-28', 50, '3', 'active', 'Kinh', 'Hà Nội', 'Ba Vì Hà Nội', '0123456789', '2024-05-29 02:02:53', '2024-05-29 02:02:53'),
(158, NULL, NULL, NULL, 'Nguyễn Thị A', '20210999@eaut.edu.vn', '$2b$10$OoKNVepAbARPSyqSXMd1culUlZBpmDJWSYrQ0z.uxd/fWbhxxoiz6', 'Nữ', '20210794@eaut.edu.vn', NULL, NULL, NULL, '2024-05-28', 50, '3', 'active', 'Kinh', 'Hà Nội', 'Ba Vì Hà Nội', '0123456789', '2024-05-29 02:03:17', '2024-05-29 02:03:17'),
(159, '20210999', NULL, NULL, 'Nguyễn Thị A', '20210999@eaut.edu.vn', '$2b$10$K37kn/jq.VjO5bomK5jGeeWuckzIpYTkzol5yfPMdV/3maxMJP15W', 'Nữ', '20210794@eaut.edu.vn', NULL, NULL, NULL, '2024-05-28', 50, '3', 'active', 'Kinh', 'Hà Nội', 'Ba Vì Hà Nội', '0123456789', '2024-05-29 02:09:31', '2024-05-31 15:07:02'),
(160, '20214444', NULL, NULL, 'Nguyen Thi Test', NULL, NULL, 'Nu', NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-29 04:08:28', '2024-05-29 04:08:28'),
(161, '202155447', NULL, NULL, 'Nguyễn Nhật LInh', NULL, NULL, 'Nu', NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-29 04:22:29', '2024-05-29 04:22:29'),
(162, '20210554', NULL, NULL, 'Hoa A', NULL, NULL, 'Nu', NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-29 04:40:05', '2024-05-29 04:40:05'),
(164, '20210843', NULL, NULL, 'Hoa Check', NULL, NULL, 'Nu', NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-29 05:01:06', '2024-05-29 05:01:06'),
(166, '20210794', NULL, NULL, 'Nguyễn Xuân Mạnh', NULL, NULL, 'Nam', NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-30 15:36:07', '2024-05-30 15:36:07');

-- --------------------------------------------------------

--
-- Table structure for table `userinrole`
--

CREATE TABLE `userinrole` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `RoleID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userinrole`
--

INSERT INTO `userinrole` (`ID`, `UserID`, `RoleID`) VALUES
(85, 85, 2),
(86, 86, 3),
(87, 87, 3),
(88, 88, 3),
(89, 89, 3),
(90, 90, 3),
(91, 91, 3),
(92, 92, 3),
(93, 93, 3),
(94, 94, 3),
(95, 95, 3),
(96, 96, 3),
(97, 97, 3),
(98, 98, 3),
(99, 99, 3),
(100, 100, 3),
(101, 101, 3),
(102, 102, 3),
(103, 103, 3),
(104, 104, 3),
(105, 105, 3),
(106, 106, 3),
(107, 107, 3),
(108, 108, 3),
(109, 109, 3),
(110, 110, 3),
(111, 111, 3),
(112, 112, 3),
(113, 113, 3),
(114, 114, 3),
(115, 115, 3),
(116, 116, 3),
(117, 117, 3),
(118, 118, 3),
(119, 119, 3),
(120, 120, 3),
(121, 121, 3),
(122, 122, 3),
(123, 123, 3),
(124, 124, 3),
(125, 125, 3),
(126, 126, 3),
(127, 127, 3),
(128, 128, 3),
(129, 129, 3),
(130, 130, 3),
(131, 131, 3),
(132, 132, 3),
(133, 133, 3),
(134, 134, 3),
(135, 135, 3),
(140, 140, 3),
(141, 141, 3),
(142, 142, 3),
(143, 143, 1),
(144, 144, 3),
(159, 159, 3),
(160, 159, 3),
(161, 159, 3),
(162, 159, 3),
(163, 160, 3),
(164, 161, 3),
(165, 162, 3),
(166, 164, 3),
(167, 166, 3),
(168, 159, 3);

-- --------------------------------------------------------

--
-- Table structure for table `user_activity`
--

CREATE TABLE `user_activity` (
  `ID` int(11) NOT NULL,
  `IDUser` int(11) DEFAULT NULL,
  `IDActive` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_course`
--

CREATE TABLE `user_course` (
  `ID` int(11) NOT NULL,
  `IDUser` int(11) DEFAULT NULL,
  `IDCourse` int(11) DEFAULT NULL,
  `semester` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_course`
--

INSERT INTO `user_course` (`ID`, `IDUser`, `IDCourse`, `semester`) VALUES
(103, 85, 26, NULL),
(104, 86, 26, NULL),
(106, 85, 27, NULL),
(107, 87, 27, NULL),
(108, 88, 27, NULL),
(109, 89, 27, NULL),
(110, 90, 27, NULL),
(113, 93, 27, NULL),
(114, 94, 27, NULL),
(115, 95, 27, NULL),
(116, 96, 27, NULL),
(117, 97, 27, NULL),
(118, 98, 27, NULL),
(119, 99, 27, NULL),
(120, 100, 27, NULL),
(121, 101, 27, NULL),
(122, 102, 27, NULL),
(123, 103, 27, NULL),
(124, 104, 27, NULL),
(125, 105, 27, NULL),
(126, 106, 27, NULL),
(127, 107, 27, NULL),
(128, 108, 27, NULL),
(129, 109, 27, NULL),
(130, 110, 27, NULL),
(131, 111, 27, NULL),
(132, 112, 27, NULL),
(133, 113, 27, NULL),
(134, 114, 27, NULL),
(135, 115, 27, NULL),
(136, 116, 27, NULL),
(137, 117, 27, NULL),
(138, 118, 27, NULL),
(139, 119, 27, NULL),
(140, 120, 27, NULL),
(141, 121, 27, NULL),
(142, 122, 27, NULL),
(143, 123, 27, NULL),
(144, 124, 27, NULL),
(145, 125, 27, NULL),
(146, 126, 27, NULL),
(147, 127, 27, NULL),
(148, 128, 27, NULL),
(149, 129, 27, NULL),
(150, 130, 27, NULL),
(151, 131, 27, NULL),
(152, 132, 27, NULL),
(153, 133, 27, NULL),
(154, 134, 27, NULL),
(155, 135, 27, NULL),
(159, 139, 30, NULL),
(160, 87, 27, NULL),
(161, 88, 27, NULL),
(162, 140, 31, NULL),
(163, 141, 31, NULL),
(174, 166, 26, NULL),
(183, 85, 146, NULL),
(184, 166, 146, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_faculty`
--

CREATE TABLE `user_faculty` (
  `ID` int(11) NOT NULL,
  `IDUser` int(11) DEFAULT NULL,
  `IDFaculty` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_faculty`
--

INSERT INTO `user_faculty` (`ID`, `IDUser`, `IDFaculty`) VALUES
(31, 86, 53),
(32, 87, 53),
(33, 88, 53),
(34, 89, 53),
(35, 90, 53),
(36, 91, 53),
(37, 92, 53),
(38, 93, 53),
(39, 94, 53),
(40, 95, 53),
(41, 96, 53),
(42, 97, 53),
(43, 98, 53),
(44, 99, 53),
(45, 100, 52),
(46, 101, 53),
(47, 102, 53),
(48, 103, 53),
(49, 104, 53),
(50, 105, 53),
(51, 106, 53),
(52, 107, 53),
(53, 108, 53),
(54, 109, 53),
(55, 110, 53),
(56, 111, 53),
(57, 112, 53),
(58, 113, 53),
(59, 114, 53),
(60, 115, 53),
(61, 116, 53),
(62, 117, 53),
(63, 118, 53),
(64, 119, 53),
(65, 120, 53),
(66, 121, 53),
(67, 122, 53),
(68, 123, 53),
(69, 124, 53),
(70, 125, 53),
(71, 126, 53),
(72, 127, 53),
(73, 128, 53),
(74, 129, 53),
(75, 130, 53),
(76, 131, 53),
(77, 132, 53),
(78, 133, 53),
(79, 134, 53),
(80, 135, 53),
(83, 150, 63),
(84, 151, 63),
(85, 152, 63),
(86, 153, 63),
(87, 154, 63),
(88, 155, 63),
(89, 156, 63),
(90, 157, 63),
(91, 158, 63),
(92, 159, 63),
(93, 159, 63),
(94, 159, 63),
(95, 159, 63),
(96, 160, 63),
(97, 161, 63),
(98, 162, 63),
(99, 164, 63),
(100, 166, 63),
(101, 159, 63);

-- --------------------------------------------------------

--
-- Table structure for table `user_reward`
--

CREATE TABLE `user_reward` (
  `ID` int(11) NOT NULL,
  `IDUser` int(11) DEFAULT NULL,
  `IDReward` int(11) DEFAULT NULL,
  `semester` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_studyprogram`
--

CREATE TABLE `user_studyprogram` (
  `ID` int(11) NOT NULL,
  `IDUser` int(11) DEFAULT NULL,
  `IDStudyProgram` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_warning`
--

CREATE TABLE `user_warning` (
  `IDUser` int(11) NOT NULL,
  `IDWarning` int(11) NOT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `warnings`
--

CREATE TABLE `warnings` (
  `ID` int(11) NOT NULL,
  `NameWarning` varchar(255) DEFAULT NULL,
  `SBN` int(11) DEFAULT NULL,
  `TTHP` varchar(255) DEFAULT NULL,
  `STC_NO` int(11) DEFAULT NULL,
  `GPA` float DEFAULT NULL,
  `LevelWarning` int(11) DEFAULT NULL,
  `ContentWarning` text DEFAULT NULL,
  `Author` int(11) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `warnings`
--

INSERT INTO `warnings` (`ID`, `NameWarning`, `SBN`, `TTHP`, `STC_NO`, `GPA`, `LevelWarning`, `ContentWarning`, `Author`, `CreateAt`, `UpdateAt`) VALUES
(5, 'Cảnh báo sinh viên mức độ 1', 2, 'Nợ học phí', 3, 2.5, 10, '<h1>Em đã bị cảnh báo mức một</h1>', 12, '2024-06-02 07:36:09', '2024-06-02 07:36:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `articlecategory`
--
ALTER TABLE `articlecategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDStudent` (`IDStudent`),
  ADD KEY `IDTeacher` (`IDTeacher`),
  ADD KEY `IDCourse` (`IDCourse`);

--
-- Indexes for table `blockknowledge`
--
ALTER TABLE `blockknowledge`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDStudyProgram` (`IDStudyProgram`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `NameClass` (`NameClass`),
  ADD KEY `fk_IDFaculty` (`IDFaculty`);

--
-- Indexes for table `class_course`
--
ALTER TABLE `class_course`
  ADD KEY `IDCourse` (`IDCourse`),
  ADD KEY `IDClass` (`IDClass`);

--
-- Indexes for table `codecourseprerequisite`
--
ALTER TABLE `codecourseprerequisite`
  ADD KEY `IDCourse` (`IDCourse`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `NameCourse` (`NameCourse`),
  ADD KEY `IDBlockKnowledge` (`IDBlockKnowledge`);

--
-- Indexes for table `course_documentlibrary`
--
ALTER TABLE `course_documentlibrary`
  ADD PRIMARY KEY (`IDCourse`,`IDDocumentLibrary`),
  ADD KEY `IDDocumentLibrary` (`IDDocumentLibrary`);

--
-- Indexes for table `course_studyprogram`
--
ALTER TABLE `course_studyprogram`
  ADD PRIMARY KEY (`IDCourse`,`IDStudyProgram`),
  ADD KEY `IDStudyProgram` (`IDStudyProgram`);

--
-- Indexes for table `documentlibrary`
--
ALTER TABLE `documentlibrary`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `equivalent`
--
ALTER TABLE `equivalent`
  ADD KEY `IDStudyProgram` (`IDStudyProgram`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `function`
--
ALTER TABLE `function`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ModuleID` (`ModuleID`);

--
-- Indexes for table `functioninrole`
--
ALTER TABLE `functioninrole`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FunctionID` (`FunctionID`),
  ADD KEY `RoleID` (`RoleID`);

--
-- Indexes for table `jobposition`
--
ALTER TABLE `jobposition`
  ADD KEY `IDStudyProgram` (`IDStudyProgram`);

--
-- Indexes for table `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `point`
--
ALTER TABLE `point`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDUser` (`IDUser`),
  ADD KEY `IDCourse` (`IDCourse`);

--
-- Indexes for table `relatives`
--
ALTER TABLE `relatives`
  ADD PRIMARY KEY (`id`,`studentId`),
  ADD KEY `studentId` (`studentId`);

--
-- Indexes for table `reward`
--
ALTER TABLE `reward`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `studyprogram`
--
ALTER TABLE `studyprogram`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IdFaculty` (`IdFaculty`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Msv` (`Msv`),
  ADD KEY `FK_user_class` (`IDClass`);

--
-- Indexes for table `userinrole`
--
ALTER TABLE `userinrole`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `RoleID` (`RoleID`);

--
-- Indexes for table `user_activity`
--
ALTER TABLE `user_activity`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDUser` (`IDUser`),
  ADD KEY `IDActive` (`IDActive`);

--
-- Indexes for table `user_course`
--
ALTER TABLE `user_course`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDUser` (`IDUser`),
  ADD KEY `IDCourse` (`IDCourse`);

--
-- Indexes for table `user_faculty`
--
ALTER TABLE `user_faculty`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDUser` (`IDUser`),
  ADD KEY `IDFaculty` (`IDFaculty`);

--
-- Indexes for table `user_reward`
--
ALTER TABLE `user_reward`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDUser` (`IDUser`),
  ADD KEY `IDReward` (`IDReward`);

--
-- Indexes for table `user_studyprogram`
--
ALTER TABLE `user_studyprogram`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDUser` (`IDUser`),
  ADD KEY `IDStudyProgram` (`IDStudyProgram`);

--
-- Indexes for table `user_warning`
--
ALTER TABLE `user_warning`
  ADD PRIMARY KEY (`IDUser`,`IDWarning`),
  ADD KEY `IDWarning` (`IDWarning`);

--
-- Indexes for table `warnings`
--
ALTER TABLE `warnings`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `article`
--
ALTER TABLE `article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `articlecategory`
--
ALTER TABLE `articlecategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `blockknowledge`
--
ALTER TABLE `blockknowledge`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- AUTO_INCREMENT for table `documentlibrary`
--
ALTER TABLE `documentlibrary`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `function`
--
ALTER TABLE `function`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `functioninrole`
--
ALTER TABLE `functioninrole`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `module`
--
ALTER TABLE `module`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `point`
--
ALTER TABLE `point`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `relatives`
--
ALTER TABLE `relatives`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `reward`
--
ALTER TABLE `reward`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `studyprogram`
--
ALTER TABLE `studyprogram`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=167;

--
-- AUTO_INCREMENT for table `userinrole`
--
ALTER TABLE `userinrole`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;

--
-- AUTO_INCREMENT for table `user_activity`
--
ALTER TABLE `user_activity`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_course`
--
ALTER TABLE `user_course`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=185;

--
-- AUTO_INCREMENT for table `user_faculty`
--
ALTER TABLE `user_faculty`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `user_reward`
--
ALTER TABLE `user_reward`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_studyprogram`
--
ALTER TABLE `user_studyprogram`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `warnings`
--
ALTER TABLE `warnings`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `article_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `articlecategory` (`id`),
  ADD CONSTRAINT `article_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`ID`);

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`IDStudent`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`IDTeacher`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `attendance_ibfk_3` FOREIGN KEY (`IDCourse`) REFERENCES `course` (`ID`);

--
-- Constraints for table `blockknowledge`
--
ALTER TABLE `blockknowledge`
  ADD CONSTRAINT `blockknowledge_ibfk_1` FOREIGN KEY (`IDStudyProgram`) REFERENCES `studyprogram` (`ID`);

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `fk_IDFaculty` FOREIGN KEY (`IDFaculty`) REFERENCES `faculty` (`ID`);

--
-- Constraints for table `class_course`
--
ALTER TABLE `class_course`
  ADD CONSTRAINT `class_course_ibfk_1` FOREIGN KEY (`IDCourse`) REFERENCES `course` (`ID`),
  ADD CONSTRAINT `class_course_ibfk_2` FOREIGN KEY (`IDClass`) REFERENCES `class` (`ID`);

--
-- Constraints for table `codecourseprerequisite`
--
ALTER TABLE `codecourseprerequisite`
  ADD CONSTRAINT `codecourseprerequisite_ibfk_1` FOREIGN KEY (`IDCourse`) REFERENCES `course` (`ID`);

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`IDBlockKnowledge`) REFERENCES `blockknowledge` (`ID`);

--
-- Constraints for table `course_documentlibrary`
--
ALTER TABLE `course_documentlibrary`
  ADD CONSTRAINT `course_documentlibrary_ibfk_1` FOREIGN KEY (`IDCourse`) REFERENCES `course` (`ID`),
  ADD CONSTRAINT `course_documentlibrary_ibfk_2` FOREIGN KEY (`IDDocumentLibrary`) REFERENCES `documentlibrary` (`ID`);

--
-- Constraints for table `course_studyprogram`
--
ALTER TABLE `course_studyprogram`
  ADD CONSTRAINT `course_studyprogram_ibfk_1` FOREIGN KEY (`IDCourse`) REFERENCES `course` (`ID`),
  ADD CONSTRAINT `course_studyprogram_ibfk_2` FOREIGN KEY (`IDStudyProgram`) REFERENCES `studyprogram` (`ID`);

--
-- Constraints for table `equivalent`
--
ALTER TABLE `equivalent`
  ADD CONSTRAINT `equivalent_ibfk_1` FOREIGN KEY (`IDStudyProgram`) REFERENCES `studyprogram` (`ID`);

--
-- Constraints for table `function`
--
ALTER TABLE `function`
  ADD CONSTRAINT `function_ibfk_1` FOREIGN KEY (`ModuleID`) REFERENCES `module` (`ID`);

--
-- Constraints for table `functioninrole`
--
ALTER TABLE `functioninrole`
  ADD CONSTRAINT `functioninrole_ibfk_1` FOREIGN KEY (`FunctionID`) REFERENCES `function` (`ID`),
  ADD CONSTRAINT `functioninrole_ibfk_2` FOREIGN KEY (`RoleID`) REFERENCES `role` (`ID`);

--
-- Constraints for table `jobposition`
--
ALTER TABLE `jobposition`
  ADD CONSTRAINT `jobposition_ibfk_1` FOREIGN KEY (`IDStudyProgram`) REFERENCES `studyprogram` (`ID`);

--
-- Constraints for table `point`
--
ALTER TABLE `point`
  ADD CONSTRAINT `point_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `point_ibfk_2` FOREIGN KEY (`IDCourse`) REFERENCES `course` (`ID`);

--
-- Constraints for table `relatives`
--
ALTER TABLE `relatives`
  ADD CONSTRAINT `relatives_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `user` (`ID`);

--
-- Constraints for table `studyprogram`
--
ALTER TABLE `studyprogram`
  ADD CONSTRAINT `studyprogram_ibfk_1` FOREIGN KEY (`IdFaculty`) REFERENCES `faculty` (`ID`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_user_class` FOREIGN KEY (`IDClass`) REFERENCES `class` (`ID`);

--
-- Constraints for table `userinrole`
--
ALTER TABLE `userinrole`
  ADD CONSTRAINT `userinrole_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `userinrole_ibfk_2` FOREIGN KEY (`RoleID`) REFERENCES `role` (`ID`);

--
-- Constraints for table `user_activity`
--
ALTER TABLE `user_activity`
  ADD CONSTRAINT `user_activity_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `user_activity_ibfk_2` FOREIGN KEY (`IDActive`) REFERENCES `activity` (`ID`);

--
-- Constraints for table `user_course`
--
ALTER TABLE `user_course`
  ADD CONSTRAINT `user_course_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `user_course_ibfk_2` FOREIGN KEY (`IDCourse`) REFERENCES `course` (`ID`);

--
-- Constraints for table `user_faculty`
--
ALTER TABLE `user_faculty`
  ADD CONSTRAINT `user_faculty_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `user_faculty_ibfk_2` FOREIGN KEY (`IDFaculty`) REFERENCES `faculty` (`ID`);

--
-- Constraints for table `user_reward`
--
ALTER TABLE `user_reward`
  ADD CONSTRAINT `user_reward_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `user_reward_ibfk_2` FOREIGN KEY (`IDReward`) REFERENCES `reward` (`ID`);

--
-- Constraints for table `user_studyprogram`
--
ALTER TABLE `user_studyprogram`
  ADD CONSTRAINT `user_studyprogram_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `user_studyprogram_ibfk_2` FOREIGN KEY (`IDStudyProgram`) REFERENCES `studyprogram` (`ID`);

--
-- Constraints for table `user_warning`
--
ALTER TABLE `user_warning`
  ADD CONSTRAINT `user_warning_ibfk_1` FOREIGN KEY (`IDUser`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `user_warning_ibfk_2` FOREIGN KEY (`IDWarning`) REFERENCES `warnings` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
