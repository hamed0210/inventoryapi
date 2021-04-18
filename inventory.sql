DROP DATABASE IF EXISTS inventory;

CREATE DATABASE IF NOT EXISTS inventory;

USE inventory;

-- CREATE TABLE usuarios(
-- 	codigo VARCHAR(50),
-- 	email VARCHAR(25) NOT NULL,
-- 	pass CHAR(60) NOT NULL,
-- 	role ENUM('Admin', 'User') NOT NULL DEFAULT 'User',
-- 	fecha_creacion DATETIME DEFAULT current_timestamp,
-- 	CONSTRAINT unique_combinacion UNIQUE (email),
--  	PRIMARY KEY (codigo)
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE usuarios(
	codigo VARCHAR(10),
	id INT(10) UNSIGNED,
	email VARCHAR(25) NOT NULL,
	nombres VARCHAR(50) NOT NULL,
	apellidos VARCHAR(50) NOT NULL,
	cel BIGINT(10) NOT NULL,
	dir VARCHAR(50) NOT NULL,
	ciudad VARCHAR(50) NOT NULL,
	pass CHAR(60) NOT NULL,
	role ENUM('Admin', 'User') NOT NULL DEFAULT 'User',
	fecha_creacion DATETIME DEFAULT current_timestamp,
	CONSTRAINT unique_combinacion UNIQUE (email),
	CONSTRAINT unique_combinacion2 UNIQUE (codigo),
 	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE clientes(
	id INT(10) UNSIGNED,
	nombre VARCHAR(50) NOT NULL,
	cel BIGINT(10) NOT NULL,
	email VARCHAR(25) NOT NULL,
	dir VARCHAR(50) NOT NULL,
	ciudad VARCHAR(50) NOT NULL,
	cantidad_compras INT(10) DEFAULT 0,
	total_compras INT(10) DEFAULT 0
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
	medidas VARCHAR(20),
	categoria VARCHAR(50) NOT NULL,
	stock INT(10) DEFAULT 0,
	stock_minimo INT(10) NOT NULL,
	precio_venta INT(10) NOT NULL,
	cantidad_ventas INT(10) DEFAULT 0,
	creado_por INT(10) UNSIGNED NOT NULL,
	fecha_creacion DATETIME DEFAULT current_timestamp,
	CONSTRAINT unique_combinacion UNIQUE (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE sales(
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

CREATE TABLE inventarios(
	id INT PRIMARY KEY AUTO_INCREMENT,
	codigo_compra VARCHAR(50),
	codigo_venta VARCHAR(50),
	tipo ENUM('Compra', 'Venta') NOT NULL DEFAULT 'Compra',
	id_usuario INT(10) UNSIGNED NOT NULL,
	productos TEXT NOT NULL,
	precio INT(10) NOT NULL,
	-- precio_total INT(10) NOT NULL,
	fecha_creacion DATETIME DEFAULT current_timestamp,
	CONSTRAINT unique_combinacion UNIQUE (codigo_compra),
	CONSTRAINT unique_combinacion_2 UNIQUE (codigo_venta)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- INDICES 


-- ALTER TABLE personas 
-- 	ADD FOREIGN KEY (cod_usu) REFERENCES usuarios(codigo) ON DELETE CASCADE ON UPDATE CASCADE;

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
	ADD FOREIGN KEY (creado_por) REFERENCES usuarios(id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE sales
	ADD PRIMARY KEY (codigo),
	ADD FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	ADD FOREIGN KEY (id_vendedor) REFERENCES usuarios(id) ON DELETE RESTRICT ON UPDATE CASCADE;
	

ALTER TABLE compras
	ADD PRIMARY KEY (codigo),
	ADD FOREIGN KEY (id_proveedor) REFERENCES suppliers(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	ADD FOREIGN KEY (id_comprador) REFERENCES usuarios(id) ON DELETE RESTRICT ON UPDATE CASCADE;

	ALTER TABLE inventarios
	ADD FOREIGN KEY (codigo_compra) REFERENCES compras(codigo) ON DELETE CASCADE ON UPDATE CASCADE,
	ADD FOREIGN KEY (codigo_venta) REFERENCES sales(codigo) ON DELETE CASCADE ON UPDATE CASCADE,
	ADD FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE RESTRICT ON UPDATE CASCADE;


--
-- Creacion de Trigger `Productos`
--

-- DELIMITER //
-- CREATE TRIGGER after_insert_sales_update_clientes AFTER INSERT ON sales FOR EACH ROW 
-- BEGIN
-- 	-- IF NEW.birthDate IS NULL THEN
-- 	-- BEGIN
-- UPDATE clientes SET total_compras = total_compras + NEW.precio_total, cantidad_compras = cantidad_compras + 1  WHERE id_cliente = NEW.id_cliente;
-- END
-- 	-- END IF
-- END
-- //
-- DELIMITER ;



--
-- Volcado de datos para la tabla `usuarios`
--

-- INSERT INTO `usuarios` (`codigo`, `email`, `pass`, `role`) VALUES
-- ('iQGrOOywvA', 'hduran0210@gmail.com', '$2b$10$l608VFYCtaEPM2LA34GZCOreEFoAY1EOlVbvzEFc4iKFMKpwouiaO', 'Admin');


--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`codigo`, `id`, `email`, `nombres`, `apellidos`, `dir`, `ciudad`, `cel`, `pass`, `role`) VALUES
('iQGrOOywvA',1046814387, 'hduran0210@gmail.com', 'Hamed', 'Duran Mendoza', 'Calle 5 # 3-45', 'Polonuevo', 3007725093, '$2b$10$l608VFYCtaEPM2LA34GZCOreEFoAY1EOlVbvzEFc4iKFMKpwouiaO', 'Admin');

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

INSERT INTO `productos` (`codigo`, `nombre`, `categoria`, `stock`, `stock_minimo`, `precio_venta` ,`creado_por`) VALUES
('101', 'Coca-Cola Normal', 'mmsGZe-NV', 50, 10, 1500, 1046814387), ('102', 'Coca-Cola Zero', 'mmsGZe-NV', 50, 10, 1500, 1046814387);