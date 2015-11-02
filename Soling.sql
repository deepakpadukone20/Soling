DROP database if exists `soling`;
 
create database `soling`;
use soling;

CREATE TABLE IF NOT EXISTS `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contactPersonName` varchar(100) NOT NULL,
  `phone` decimal(10,0) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isActive` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `driver` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` decimal(10,0) NOT NULL,
  `isOwnEmployee` tinyint(1) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isActive` tinyint(1) NOT NULL,
  `salary` decimal(10,2) NOT NULL  
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `expense` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `typeId` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `comment` varchar(500) NOT NULL,
  KEY `typeId` (`typeId`)  
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `expenseType` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `isSellable` tinyint(1) DEFAULT '1',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `orders` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `custId` int(11) NOT NULL,
 `itemId` int(11) NOT NULL,
 `driverId` int(11) NOT NULL,
 `vehicleId` int(11) NOT NULL,
 `quantity` int(11) NOT NULL,
 `date` datetime NOT NULL,
 `amount` decimal(10,2) NOT NULL,
 `paid` decimal(10,2) NOT NULL,
 `discount` decimal(2,2) NOT NULL,
 PRIMARY KEY (`id`),
 KEY `custId` (`custId`),
 KEY `itemId` (`itemId`),
 KEY `vehicleId` (`vehicleId`),
 KEY `driverId` (`driverId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `purchases` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `orderId` int(11) DEFAULT NULL COMMENT 'only filled when purchase is done to fullfill a specific order',
  `suppId` int(11) NOT NULL,
  `itemId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `paid` decimal(10,2) NOT NULL,
  `discount` decimal(2,2) NOT NULL,
  KEY `orderId` (orderId), 
  KEY `suppId` (suppId), 
  KEY `itemId` (itemId) 
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `supplier` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contactPersonName` varchar(100) NOT NULL,
  `phone` decimal(10,0) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isActive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `vehicle` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `make` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isOwnVehicle` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `expense`
  ADD CONSTRAINT `fk_typeId` FOREIGN KEY (`typeId`) REFERENCES `expensetype` (`id`);

ALTER TABLE `orders`
  ADD CONSTRAINT `fk_cust_id` FOREIGN KEY (`custId`) REFERENCES `customer` (`id`),
  ADD CONSTRAINT `fk_driver_cust_id` FOREIGN KEY (`driverId`) REFERENCES `driver` (`id`),
  ADD CONSTRAINT `fk_vehicle_id` FOREIGN KEY (`vehicleId`) REFERENCES `vehicle` (`id`),
  ADD CONSTRAINT `fk_item_id` FOREIGN KEY (`itemId`) REFERENCES `inventory` (`id`);
  
ALTER TABLE `purchases`
  ADD CONSTRAINT `fk_purchase_item_id` FOREIGN KEY (`itemId`) REFERENCES `inventory` (`id`),
  ADD CONSTRAINT `fk_purchase_order_id` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `fk_purchase_supp_id` FOREIGN KEY (`suppId`) REFERENCES `supplier` (`id`); 
  

INSERT INTO `customer` (`id`, `name`, `address`, `contactPersonName`, `phone`, `date`, `isActive`) VALUES
(1, 'Tata Consultancy Services', 'Bangalore', 'Rama Jain', '7867676767', '2015-11-02 05:24:47', 1),
(2, 'HT Media', 'Mumbai', 'Gourav Jhengade', '5676657', '2015-11-02 06:10:24', 1),
(3, 'Aagami Software Technology.,', '# 443, Sathya Sai, 12th Cross, 2nd Stage, West Of Chord Road Banglore - 560 086', '', '803492290', '2015-11-02 06:11:03', 1),
(4, 'Acusis Software India Pvt Ltd', 'No. 17/2, Dollars Chambers, Lalbagh Road, Banglore - 560027', '', '2222962', '2015-11-02 06:13:57', 1),
(5, 'Adityaa CallCentre Pvt. Ltd.,', 'No. 34, Sirur Park Road, Seshadripuram, Banglore - 560 020', '', '803460023', '2015-11-02 06:14:34', 1),
(6, 'Analog Devices India Pvt Ltd.,', 'Corporate Towers C& D, 7th Floor Off. Victoria Road, Diamond District, Airport Road, Banglore - 560 008', '', '805208090', '2015-11-02 06:15:04', 1);

  

INSERT INTO `driver` (`id`, `name`, `address`, `phone`, `isOwnEmployee`, `date`, `isActive`, `salary`) VALUES
(1, 'Yusaf', 'No44 ,Kalthod Kundapur', '8833474444', 1, '2015-11-02 05:26:57', 1, '10000.00'),
(2, 'Ramachandra P', 'Trasi', '8895559900', 0, '2015-11-02 06:01:15', 1, '12000.00'),
(3, 'Govinda Naik', '2, Marvante', '324355655', 0, '2015-11-02 06:02:04', 1, '0.00');

INSERT INTO `inventory` (`id`, `name`, `price`, `quantity`, `isSellable`, `date`, `updateDate`, `isActive`) VALUES
(1, 'Lan Cable', '231.00', 32, 1, '2015-11-02 11:34:01', '2015-11-02 11:34:01', 0),
(2, 'Monitor', '23.00', 2, 1, '2015-11-02 11:33:50', '2015-11-02 11:33:50', 0),
(3, 'Keyboard', '230.00', 132, 1, '2015-11-02 11:33:17', '2015-11-02 11:33:17', 0),
(4, 'Mouse', '230.00', 12, 1, '2015-11-02 11:34:16', '2015-11-02 11:34:16', 0),
(5, 'Speakers', '124.00', 2, 1, '2015-11-02 11:34:29', '2015-11-02 11:34:29', 0),
(6, 'Printer Ink', '213.00', 3, 0, '2015-11-02 11:35:00', '2015-11-02 11:35:00', 0),
(7, 'Papers', '3230.00', 324, 0, '2015-11-02 11:35:21', '2015-11-02 11:35:21', 0);







INSERT INTO `supplier` (`id`, `name`, `address`, `contactPersonName`, `phone`, `isActive`) VALUES
(1, 'Adishwar Marketing', 'Mangalore', 'Ramesh', '857325525', 1),
(2, 'Indane Gas Agency', 'Chruch Road,Kundapur', 'Anjaneya Kamath', '868643855', 1),
(3, 'R L Logistics', 'Bangalore', 'Gagan Sahu', '688686833', 1);

-- --------------------------------------------------------
INSERT INTO `user` (`id`, `name`, `password`, `email`, `date`, `isActive`) VALUES
(1, 'deepak', '$2a$10$4e32beb0ba25a5c24e25auy6Fx3xu4Ck9ROmPoRGKSZsC.5IeoGfW', 'admin', '2015-10-29 23:58:51', 1),
(2, 'jai', '$2a$10$eecc6dd87dccec7c95da4u0WKHHFIhkX2r8XaCGqxP0POhqlNRMoO', 'admin1', '2015-10-30 00:00:36', 1),
(3, 'Gowtham', '$2a$10$69b086244f980df120a43uBohNZUzFHFVSDLEBmJsTLrg/bPwI/le', 'gowth', '2015-11-02 11:30:10', 1);

INSERT INTO `vehicle` (`id`, `make`, `model`, `date`, `isOwnVehicle`) VALUES
(1, 'Toyata', 'KA -3434', '2015-11-02 15:47:59', 1);
INSERT INTO `orders` (`id`, `custId`, `itemId`, `driverId`, `vehicleId`, `quantity`, `date`, `amount`, `paid`, `discount`) VALUES
(2, 1, 1, 1, 1, 23, '2015-11-01 00:00:00', '3223.00', '23.00', '0.01'),
(3, 1, 1, 1, 1, 23, '2015-11-02 00:00:00', '323.00', '203.00', '0.02'),
(4, 1, 1, 2, 1, 23, '2015-10-21 00:00:00', '323.00', '203.00', '0.02'),
(5, 1, 1, 2, 1, 23, '2015-05-21 00:00:00', '323.00', '203.00', '0.02');

