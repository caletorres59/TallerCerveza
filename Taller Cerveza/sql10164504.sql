-- phpMyAdmin SQL Dump
-- version 3.5.5
-- http://www.phpmyadmin.net
--
-- Host: sql10.freesqldatabase.com
-- Generation Time: Mar 19, 2017 at 08:17 PM
-- Server version: 5.5.53-0ubuntu0.14.04.1
-- PHP Version: 5.3.28

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sql10164504`
--

-- --------------------------------------------------------

--
-- Table structure for table `presentaciones`
--

CREATE TABLE IF NOT EXISTS `presentaciones` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ML` varchar(10) NOT NULL,
  `VALOR` varchar(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `presentaciones`
--

INSERT INTO `presentaciones` (`ID`, `ML`, `VALOR`) VALUES
(1, '300', '10000');

-- --------------------------------------------------------

--
-- Table structure for table `producciones`
--

CREATE TABLE IF NOT EXISTS `producciones` (
  `CODIGO` varchar(20) NOT NULL DEFAULT '',
  `FECHA` varchar(20) NOT NULL,
  `TIPOCERVEZA` int(11) NOT NULL,
  `PRESENTACION` int(11) NOT NULL,
  `COMENTARIOS` varchar(200) NOT NULL,
  PRIMARY KEY (`CODIGO`),
  KEY `TIPOCERVEZA` (`TIPOCERVEZA`),
  KEY `PRESENTACION` (`PRESENTACION`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tiposcerveza`
--

CREATE TABLE IF NOT EXISTS `tiposcerveza` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(20) NOT NULL,
  `DESCRIPCION` varchar(50) NOT NULL,
  `GRADOALCOHOL` varchar(10) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `tiposcerveza`
--

INSERT INTO `tiposcerveza` (`ID`, `NOMBRE`, `DESCRIPCION`, `GRADOALCOHOL`) VALUES
(1, 'PALE ALE', 'Cerveza rubia', '5');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `producciones`
--
ALTER TABLE `producciones`
  ADD CONSTRAINT `producciones_ibfk_2` FOREIGN KEY (`PRESENTACION`) REFERENCES `presentaciones` (`ID`),
  ADD CONSTRAINT `producciones_ibfk_1` FOREIGN KEY (`TIPOCERVEZA`) REFERENCES `tiposcerveza` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
