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
  `qunatity` int(11) NOT NULL,
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
  `adddress` varchar(255) DEFAULT NULL,
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