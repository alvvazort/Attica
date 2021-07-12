
INSERT INTO Categories
VALUES
	(1,'Covid19'),
	(2,'Selfie'),
	(3,'Paisajes'),
	(4,'Desayunos'),
	(5,'Fitness'),
	(6,'2021'),
	(7,'Fiesta'),
	(8,'Coches'),
	(9,'');

INSERT INTO Users
VALUES
	(1, 'Ivan', 'Garrido', 'Ivan.Garrido@gallery.com', 'Igarrido_97', 'pbkdf2:sha256:150000$KKgd0xN5$d778b27800d8b89e001843285475a0da3f6f6c664ec8e8a9590ed1c49603b194', null, '/docs/images/FotosPerfil/Igarrido.png'),
	(2, 'Maria', 'Salguero', 'jane.smith@gallery.com', 'Mariasalguero', 'pbkdf2:sha256:150000$v4wgnaXC$b87f5daf437119c21ec712462f4b193b6fada27f485e36502c5cf4553a01f640', 'Actriz y activista', '/docs/images/FotosPerfil/fotor perfil 2.png'),
	(3, 'Marta', 'Vázquez', 'martavazquez@gallery.com', 'Marta_Vázquez', 'pbkdf2:sha256:150000$v4wgnaXC$b87f5daf437119c21ec712462f4b193b6fada27f485e36502c5cf4553a01f640', 'Recetas saludables, realfooding, fitness y habitos para vivir bien','/docs/images/FotosPerfil/image.png');
-- Password = username

INSERT INTO Photos
VALUES
	(1, 'Northern Lights', 'A beautiful trip to the north!', '2021-05-18 18:25:43', '/docs/images/Fotos/cultura_paisajeiluminado_landuum5.jpg', 'Public', 10, 2, 1, 3),
	(2, 'Foto del atardecer', 'Foto del atardecer en Canarias', '2020-01-12 13:37:01', '/docs/images/Fotos/Vibes.jpg', 'Public', 9, 2, 2, null),
	(3, 'Sleepy cat', 'A drawing of a cat about to sleep', '2019-08-24 21:20:21', 'https://pbs.twimg.com/media/EZ4Z2QDUYAANA-Z?format=png', 'Public', 12, 3, 1, null),
	(4, 'Seville', 'The beautiful city of Seville, Spain', '2016-04-02 09:16:58', 'https://urbansevilla.es/wp-content/uploads/2019/03/urban-sevilla-foto-ciudad.jpg', 'Public', 6, 2, 2, 3),
	(5, 'Tortitas', 'Rico para desayunar', '2020-04-02 09:16:58', '/docs/images/Fotos/cereal-pancakes-la-nueva-locura-de-instagram-que-revoluciona-tu-desayuno.jpg', 'Public', 12, 3, 3, 5),
	(6, 'Foto privada', 'Foto privada', '2020-04-02 10:16:58', 'https://i.blogs.es/5efe2c/cap_001/450_1000.jpg', 'Private', 4, 1, 3, 5);

INSERT INTO Comments
VALUES
	(1,'Vaya paisaje más vivo','2021-05-18 19:29:43', 2, 1),
	(2,'Que frío debe de hacer allí!!', '2021-05-18 20:25:43', 3, 1),
	(3,'Bonito atardecer', '2020-01-12 14:37:01', 3, 2),
	(4,'Que adorableee!!', '2019-08-24 22:20:21', 2,3),
	(5,'Que bonito Sevilla', '2016-04-02 09:16:58', 1,4),
	(6,'Se viene desayuno mañana', '2020-04-02 10:16:58', 1,5),
	(7,'Me lo apunto como siguiente lugar de vacaciones', '2021-05-18 19:44:43', 3,1);


INSERT INTO Rates
VALUES
	(1,1,1),
	(2,2,1),
	(3,1,2),
	(4,2,2),
	(5,3,3),
	(6,1,3),
	(7,2,3),
	(8,2,4),
	(9,1,4),
	(10,2,5),
	(11,3,5),
	(12,1,5);