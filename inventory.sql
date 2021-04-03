DROP DATABASE IF EXISTS inventory;

CREATE DATABASE IF NOT EXISTS inventory;

USE inventory;

CREATE TABLE usuarios(
	codigo VARCHAR(50),
	email VARCHAR(25) NOT NULL,
	pass CHAR(60) NOT NULL,
	role ENUM('Admin', 'User') NOT NULL DEFAULT 'User',
	fecha_creacion DATETIME DEFAULT current_timestamp,
	CONSTRAINT unique_combinacion UNIQUE (email),
 	PRIMARY KEY (codigo)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE personas(
	id INT(10) UNSIGNED,
	nombres VARCHAR(50) NOT NULL,
	apellidos VARCHAR(50) NOT NULL,
	dir VARCHAR(50) NOT NULL,
	ciudad VARCHAR(50) NOT NULL,
	cel BIGINT(10) NOT NULL,
	cod_usu VARCHAR(50) NOT NULL,
	CONSTRAINT unique_combinacion UNIQUE (cod_usu),
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

-- proveedores
CREATE TABLE suppliers(
	id INT(10) UNSIGNED,
	nombre VARCHAR(50) NOT NULL,
	cel BIGINT(10) NOT NULL,
	email VARCHAR(25) NOT NULL,
	dir VARCHAR(50) NOT NULL,
	ciudad VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE categories (
	codigo VARCHAR(50),
	nombre VARCHAR(50) NOT NULL,
	fecha_creacion DATETIME DEFAULT current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE productos (
	codigo VARCHAR(10),
	-- imagen VARCHAR(50) NOT NULL,
	nombre VARCHAR(50) NOT NULL,
	descripcion TEXT,
	categoria VARCHAR(50) NOT NULL,
	stock INT(10) DEFAULT 0,
	stock_minimo INT(10) NOT NULL,
	-- precio_compra INT(50)  NOT NULL,
	precio_venta INT(10) NOT NULL,
	creado_por INT(10) UNSIGNED NOT NULL,
	fecha_creacion DATETIME DEFAULT current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE ventas(
	codigo VARCHAR(10),
	id_cliente INT(10) UNSIGNED NOT NULL,
	id_vendedor INT(10) UNSIGNED NOT NULL,
	productos TEXT NOT NULL,
	-- producto VARCHAR(10) NOT NULL,
	-- cantidad INT(10) NOT NULL,
	-- precio_unidad INT(10) NOT NULL,
	precio_total INT(10) NOT NULL,
	fecha_venta DATETIME DEFAULT current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE compras(
	codigo VARCHAR(50),
	id_proveedor INT(10) UNSIGNED NOT NULL,
	id_comprador INT(10) UNSIGNED NOT NULL,
	productos TEXT NOT NULL,
	-- producto VARCHAR(10) NOT NULL,
	-- cantidad INT(10) NOT NULL,
	-- precio_unidad INT(10) NOT NULL,
	precio_total INT(10) NOT NULL,
	fecha_compra DATETIME DEFAULT current_timestamp
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- INDICES 


ALTER TABLE personas 
	ADD FOREIGN KEY (cod_usu) REFERENCES usuarios(codigo) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE clientes 
	ADD PRIMARY KEY (id);

ALTER TABLE suppliers 
	ADD PRIMARY KEY (id);

ALTER TABLE categories 
	ADD PRIMARY KEY (codigo),
	ADD UNIQUE KEY (nombre);

ALTER TABLE productos 
	ADD PRIMARY KEY (codigo),
	-- ADD UNIQUE KEY (nombre),
	ADD FOREIGN KEY (categoria) REFERENCES categories(codigo) ON DELETE RESTRICT ON UPDATE CASCADE,
	ADD FOREIGN KEY (creado_por) REFERENCES personas(id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE ventas
	ADD PRIMARY KEY (codigo),
	ADD FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	ADD FOREIGN KEY (id_vendedor) REFERENCES personas(id) ON DELETE RESTRICT ON UPDATE CASCADE;
	

ALTER TABLE compras
	ADD PRIMARY KEY (codigo),
	ADD FOREIGN KEY (id_proveedor) REFERENCES suppliers(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	ADD FOREIGN KEY (id_comprador) REFERENCES personas(id) ON DELETE RESTRICT ON UPDATE CASCADE;
	


--
-- Creavion de Trigger `Compras - Productos`
--

-- DELIMITER //
-- CREATE TRIGGER after_insert_compras_update_stock_productos AFTER INSERT ON compras FOR EACH ROW 
-- BEGIN
-- 	UPDATE productos SET stock= stock + NEW.cantidad WHERE codigo = NEW.producto;
-- END
-- //
-- DELIMITER ;


--
-- Creavion de Trigger `Ventas - Productos`
--

-- DELIMITER //
-- CREATE TRIGGER after_insert_ventas_update_stock_productos AFTER INSERT ON ventas FOR EACH ROW 
-- BEGIN
-- 	UPDATE productos SET stock= stock - NEW.cantidad WHERE codigo = NEW.producto;
-- END
-- //
-- DELIMITER ;



--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`codigo`, `email`, `pass`, `role`) VALUES
('iQGrOOywvA', 'hduran0210@gmail.com', '$2b$10$l608VFYCtaEPM2LA34GZCOreEFoAY1EOlVbvzEFc4iKFMKpwouiaO', 'Admin');


--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `personas` (`id`, `nombres`, `apellidos`, `dir`, `ciudad`, `cel`, `cod_usu`) VALUES
(1046814387, 'Hamed', 'Duran Mendoza', 'Calle 5 # 3-45', 'Polonuevo', 3007725093, 'iQGrOOywvA');

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `email`, `cel`, `dir`, `ciudad`) VALUES
(2147483647, 'Juan Villegas', 'juan@hotmail.com', 3412345, 'Calle 23 # 45 - 56', 'Barranquilla'),
(2147483648, 'Pedro Pérez', 'pedro@gmail.com', 8765432, 'Calle 34 N33 -56', 'Barranquilla'),
(325235235, 'Miguel Murillo', 'miguel@hotmail.com', 5453446, 'calle 34 # 34 - 23', 'Barranquilla');

--
-- Volcado de datos para la tabla `suppliers`
--

INSERT INTO `suppliers` (`id`, `nombre`, `email`, `cel`, `dir`, `ciudad`) VALUES
(2147483647, 'Juan Villegas', 'juan@hotmail.com', 3412345, 'Calle 23 # 45 - 56', 'Barranquilla'),
(2147483648, 'Pedro Pérez', 'pedro@gmail.com', 8765432, 'Calle 34 N33 -56', 'Barranquilla'),
(325235235, 'Miguel Murillo', 'miguel@hotmail.com', 5453446, 'calle 34 # 34 - 23', 'Barranquilla');

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categories` (`codigo`, `nombre`) VALUES
('mmsGZe-NV', 'Gaseosas'), ('0Wm8GUa4W', 'Alcohol') ;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`codigo`, `nombre`, `descripcion`, `categoria`, `stock`, `stock_minimo`, `precio_venta` ,`creado_por`) VALUES
('101', 'Coca-Cola', 'Normal', 'mmsGZe-NV', 50, 10, 1500, 1046814387), ('102', 'Coca-Cola', 'Zero', 'mmsGZe-NV', 50, 10, 1500, 1046814387);