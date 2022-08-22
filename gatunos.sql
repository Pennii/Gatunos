-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 22-08-2022 a las 16:42:32
-- Versión del servidor: 5.7.36
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gatunos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

DROP TABLE IF EXISTS `novedades`;
CREATE TABLE IF NOT EXISTS `novedades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `subtitulo` text COLLATE utf8_unicode_ci NOT NULL,
  `cuerpo` text COLLATE utf8_unicode_ci NOT NULL,
  `img_id` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`id`, `titulo`, `subtitulo`, `cuerpo`, `img_id`) VALUES
(1, 'La comida para gato mas sana', 'La mas cara podria no ser precisamente la mejor para un felino', 'Desde hace años 8 de cada 10 veterinarios recomiendan alimentos mas economicos, esto debido a que si bien no son de una marca conocida, si son mas saludables para los gatos, ayudandolos con problemas del estomago, dandoles mejor color en el pelo, etc.', '1'),
(2, 'Nueva enfermedad descubierta', 'La enfermedad que causa que los animales no deseen salir o hacer ninguna actividad', 'Tras varios meses de investigacion, cientificos descubrieron que muchos gatos y perros se ven afectados por una enfermedad de origen desconocido, dandoles pereza y disminuyendo sus sentidos. Se espera que se pueda crear una vacuna en las proximas semanas.', NULL),
(3, 'El evento para mascotas mas grande', 'Septiembre empieza con todo', 'El proximo mes se realizara el evento para perros, gatos, y demas mascotas mas grande del pais, durara desde el primer lunes hasta el segundo viernes del mes y contara con juegos, venta de comida y accesorios, entre otras muchas actividades', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'usuario', '202cb962ac59075b964b07152d234b70');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
