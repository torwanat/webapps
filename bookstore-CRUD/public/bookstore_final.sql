-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2024 at 05:47 PM
-- Wersja serwera: 11.3.2-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookstore`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `authors`
--

CREATE TABLE `authors` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `name`, `surname`) VALUES
(1, 'Jan', 'Kowalski');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `pages` int(11) DEFAULT NULL,
  `ISBN` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `available` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `author_id`, `section_id`, `title`, `pages`, `ISBN`, `amount`, `available`) VALUES
(1, 1, 1, 'Pan Tadeusz', 20, '978-3-16-148410-0', 1000, 998),
(2, 1, 1, 'Wydma cz. 2', 495, '962-1-23-245123-7', 100, 100);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `borrowed`
--

CREATE TABLE `borrowed` (
  `book_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `borrowed_date` date DEFAULT NULL,
  `return_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `borrowed`
--

INSERT INTO `borrowed` (`book_id`, `customer_id`, `id`, `borrowed_date`, `return_date`) VALUES
(1, 1, 1, '2024-03-04', '2024-03-18'),
(1, 1, 3, '2024-02-14', '2024-02-28');

--
-- Wyzwalacze `borrowed`
--
DELIMITER $$
CREATE TRIGGER `borrow_book` AFTER INSERT ON `borrowed` FOR EACH ROW UPDATE books SET available=available-1 WHERE books.id=NEW.book_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `return_book` AFTER DELETE ON `borrowed` FOR EACH ROW UPDATE books SET available=available+1 WHERE books.id=OLD.book_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `surname`, `city`, `street`, `number`, `postal_code`) VALUES
(1, 'Tadeusz', 'Soplica', 'Soplicowo', 'Mickiewicza', '1', '32-440');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `due`
--

CREATE TABLE `due` (
  `book_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `borrowed_id` int(11) DEFAULT NULL,
  `borrowed_date` date DEFAULT NULL,
  `return_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `due`
--

INSERT INTO `due` (`book_id`, `customer_id`, `id`, `borrowed_id`, `borrowed_date`, `return_date`) VALUES
(1, 3, 3, 1, '2024-02-14', '2024-02-28'),
(1, 3, 4, 1, '2024-02-14', '2024-02-28');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sections`
--

CREATE TABLE `sections` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`id`, `name`, `description`) VALUES
(1, 'Horror', 'Super straszne');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sections_authors`
--

CREATE TABLE `sections_authors` (
  `section_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `section_id` (`section_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indeksy dla tabeli `borrowed`
--
ALTER TABLE `borrowed`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indeksy dla tabeli `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `due`
--
ALTER TABLE `due`
  ADD PRIMARY KEY (`id`),
  ADD KEY `borrowed_id` (`borrowed_id`);

--
-- Indeksy dla tabeli `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `sections_authors`
--
ALTER TABLE `sections_authors`
  ADD PRIMARY KEY (`section_id`,`author_id`),
  ADD KEY `author_id` (`author_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `borrowed`
--
ALTER TABLE `borrowed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `due`
--
ALTER TABLE `due`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`),
  ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`);

--
-- Constraints for table `borrowed`
--
ALTER TABLE `borrowed`
  ADD CONSTRAINT `borrowed_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `borrowed_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);

--
-- Constraints for table `due`
--
ALTER TABLE `due`
  ADD CONSTRAINT `due_ibfk_1` FOREIGN KEY (`borrowed_id`) REFERENCES `borrowed` (`id`);

--
-- Constraints for table `sections_authors`
--
ALTER TABLE `sections_authors`
  ADD CONSTRAINT `sections_authors_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`),
  ADD CONSTRAINT `sections_authors_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`);

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `get_due` ON SCHEDULE EVERY 1 DAY STARTS '2024-03-04 13:07:34' ON COMPLETION PRESERVE ENABLE DO INSERT INTO due (borrowed_id, book_id, customer_id, borrowed_date, return_date) 
SELECT * FROM borrowed WHERE return_date<CURDATE()$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
