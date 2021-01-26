DROP DATABASE IF EXISTS inventory;

CREATE DATABASE IF NOT EXISTS inventory;

USE inventory;

CREATE TABLE usuarios(
	id VARCHAR(50),
	email VARCHAR(25) NOT NULL,
	pass CHAR(60) NOT NULL,
	role ENUM('Admin', 'User') NOT NULL DEFAULT 'User',
	fecha_creacion DATETIME DEFAULT current_timestamp,
	CONSTRAINT unique_combinacion UNIQUE (email),
 	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE personas(
	id INT(10) UNSIGNED,
	nombres VARCHAR(50) NOT NULL,
	apellidos VARCHAR(50) NOT NULL,
	dir VARCHAR(50) NOT NULL,
	ciudad VARCHAR(50) NOT NULL,
	cel BIGINT(10) NOT NULL,
	id_usu VARCHAR(50) NOT NULL,
	CONSTRAINT unique_combinacion UNIQUE (id_usu),
 	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE clientes(
	id INT(10) UNSIGNED,
	nombre VARCHAR(50) NOT NULL,
	cel BIGINT(10) NOT NULL,
	email VARCHAR(25) NOT NULL,
	dir VARCHAR(50) NOT NULL,
	ciudad VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE categorias (
	codigo VARCHAR(50),
	nombre VARCHAR(50) NOT NULL,
	fecha_creacion DATETIME DEFAULT current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE productos (
	codigo VARCHAR(10),
	nombre VARCHAR(50) NOT NULL,
	descripcion TEXT,
	categoria VARCHAR(50) NOT NULL,
	stock INT(10) NOT NULL,
	precio_compra INT(50) UNSIGNED NOT NULL,
	precio_venta INT(50) UNSIGNED NOT NULL,
	imagen VARCHAR(50) NOT NULL,
	creado_por INT(10) UNSIGNED NOT NULL,
	fecha_creacion DATETIME DEFAULT current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE ventas(
	codigo INT(20) UNSIGNED,
	id_cliente INT(10) UNSIGNED,
	id_vendedor INT(10) UNSIGNED,
	productos TEXT,
	neto INT(50) NOT NULL,
	total INT(50) NOT NULL,
	fecha_compra DATETIME DEFAULT current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- INDICES 


ALTER TABLE personas 
	ADD FOREIGN KEY (id_usu) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE clientes 
	ADD PRIMARY KEY (id);

ALTER TABLE categorias 
	ADD PRIMARY KEY (codigo);

ALTER TABLE productos 
	ADD PRIMARY KEY (codigo),
	ADD FOREIGN KEY (categoria) REFERENCES categorias(codigo) ON DELETE RESTRICT ON UPDATE CASCADE,
	ADD FOREIGN KEY (creado_por) REFERENCES personas(id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE ventas
	ADD PRIMARY KEY (codigo),
	ADD FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	ADD FOREIGN KEY (id_vendedor) REFERENCES personas(id) ON DELETE RESTRICT ON UPDATE CASCADE;


--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `pass`, `role`) VALUES
(1, 'hduran0210@gmail.com', '$2b$10$l608VFYCtaEPM2LA34GZCOreEFoAY1EOlVbvzEFc4iKFMKpwouiaO', 'Admin');


--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `personas` (`id`, `nombres`, `apellidos`, `dir`, `ciudad`, `cel`, `id_usu`) VALUES
(1046814387, 'Hamed', 'Duran Mendoza', 'Calle 5 # 3-45', 'Polonuevo', 3007725093, 1);


--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`codigo`, `nombre`) VALUES
('1', 'Bebidas');

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `email`, `cel`, `dir`, `ciudad`) VALUES
(2147483647, 'Juan Villegas', 'juan@hotmail.com', 3412345, 'Calle 23 # 45 - 56', 'Barranquilla'),
(2147483648, 'Pedro Pérez', 'pedro@gmail.com', 8765432, 'Calle 34 N33 -56', 'Barranquilla'),
(325235235, 'Miguel Murillo', 'miguel@hotmail.com', 5453446, 'calle 34 # 34 - 23', 'Barranquilla');

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`codigo`, `nombre`, `descripcion`, `categoria`, `imagen`, `stock`, `precio_compra`, `precio_venta`, `creado_por`) VALUES
('101', 'Coca-Cola', 'Zero', '1', '105.png', 50, 1000, 1500, 1046814387);