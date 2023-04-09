IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'Library_System_DB')
BEGIN
    CREATE DATABASE Library_System_DB;
END;
GO

use Library_System_DB;
GO

DROP TABLE IF EXISTS Lending;
DROP TABLE IF EXISTS Contact;
DROP TABLE IF EXISTS Book;
DROP TABLE IF EXISTS Member;
GO

CREATE TABLE Member (
Member_id INT PRIMARY KEY,
Member_name VARCHAR(24) NOT NULL,
Member_gender VARCHAR(6) NOT NULL,
Member_age INT NOT NULL
);

INSERT INTO Member (Member_id, Member_name, Member_gender, Member_age)
VALUES
(1, 'Somchai', 'Male', 28),
(2, 'Siriporn', 'Female', 35),
(3, 'Natthapong', 'Male', 42),
(4, 'Thanyalak', 'Female', 22),
(5, 'Nattawut', 'Male', 31),
(6, 'Ratchanee', 'Female', 27),
(7, 'Supaporn', 'Male', 19),
(8, 'Sirirat', 'Female', 40),
(9, 'Thawatchai', 'Male', 26),
(10, 'Chanita', 'Female', 38),
(11, 'Kittisak', 'Male', 23),
(12, 'Orathai', 'Female', 29),
(13, 'Chakrit', 'Male', 34),
(14, 'Natthida', 'Female', 20),
(15, 'Chaiwat', 'Male', 25),
(16, 'Siriwan', 'Female', 33),
(17, 'Santi', 'Male', 30),
(18, 'Kanyarat', 'Female', 36),
(19, 'Chawalit', 'Male', 41),
(20, 'Nopparat', 'Female', 19);
GO

CREATE TABLE Contact (
  Member_id INT,
  Phone_number VARCHAR(10),
  PRIMARY KEY (Member_id, Phone_number),
  FOREIGN KEY (Member_id) REFERENCES Member ON UPDATE CASCADE ON DELETE CASCADE,
  UNIQUE (Phone_number)
);

INSERT INTO Contact (Member_id, Phone_number)
VALUES
(1, '0611582059'),
(2, '0916334481'),
(3, '0817103766'),
(4, '0884827694'),
(5, '0929812016'),
(6, '0995508143'),
(7, '0893466457'),
(8, '0627819202'),
(9, '0824315960'),
(10, '0928143915'),
(11, '0829915268'),
(12, '0822634963'),
(13, '0626552807'),
(14, '0828467479'),
(15, '0615726786'),
(16, '0819621534'),
(17, '0843097398'),
(18, '0644492857'),
(19, '0947431690'),
(20, '0851237981');
GO

CREATE TABLE Book (
Book_id INT PRIMARY KEY,
Title VARCHAR(40) NOT NULL,
Author VARCHAR(50) NOT NULL,
Genre VARCHAR(50) NOT NULL,
Publisher VARCHAR(50) NOT NULL,
Publication_date DATE NOT NULL
);

INSERT INTO Book (Book_id, Title, Author, Genre, Publisher, Publication_date) VALUES
(1, 'To Kill a Mockingbird', 'Harper Lee', 'Classic Fiction', 'HarperCollins Publishers', '1960-07-11'),
(2, 'The Great Gatsby', 'F. Scott Fitzgerald', 'Literary Fiction', 'Charles Scribner''s Sons', '1925-04-10'),
(3, '1984', 'George Orwell', 'Dystopian Fiction', 'Secker & Warburg', '1949-06-08'),
(4, 'Animal Farm', 'George Orwell', 'Political Fiction', 'Secker & Warburg', '1945-08-17'),
(5, 'Brave New World', 'Aldous Huxley', 'Dystopian Fiction', 'Chatto & Windus', '1932-06-01'),
(6, 'Pride and Prejudice', 'Jane Austen', 'Romance', 'T. Egerton, Whitehall', '1813-01-28'),
(7, 'The Lord of the Rings', 'J.R.R. Tolkien', 'High Fantasy', 'George Allen & Unwin', '1954-07-29'),
(8, 'The Catcher in the Rye', 'J.D. Salinger', 'Coming-of-age Fiction', 'Little, Brown and Company', '1951-07-16'),
(9, 'To the Lighthouse', 'Virginia Woolf', 'Modernist Literature', 'Hogarth Press', '1927-05-05'),
(10, 'The Color Purple', 'Alice Walker', 'Epistolary Novel', 'Harcourt Brace Jovanovich', '1982-06-01'),
(11, 'The Hobbit', 'J.R.R. Tolkien', 'Fantasy', 'George Allen & Unwin', '1937-09-21'),
(12, 'The Adventures of Huckleberry Finn', 'Mark Twain', 'Adventure', 'Chatto & Windus', '1884-12-10'),
(13, 'Moby-Dick', 'Herman Melville', 'Adventure Fiction', 'Harper & Brothers', '1851-10-18'),
(14, 'Frankenstein', 'Mary Shelley', 'Gothic Fiction', 'Lackington, Hughes, Harding, Mavor & Jones', '1818-01-01'),
(15, 'Dracula', 'Bram Stoker', 'Gothic Fiction', 'Archibald Constable and Company', '1897-05-26'),
(16, 'Jane Eyre', 'Charlotte Bronte', 'Gothic Fiction', 'Smith, Elder & Co.', '1847-10-16'),
(17, 'The Picture of Dorian Gray', 'Oscar Wilde', 'Philosophical Fiction', 'Lippincott''s Monthly Magazine', '1890-06-20'),
(18, 'Gone with the Wind', 'Margaret Mitchell', 'Historical Fiction', 'Macmillan Publishers', '1936-06-30'),
(19, 'The Alchemist', 'Paulo Coelho', 'Fiction', 'HarperCollins', '1988-01-01'),
(20, 'The Chronicles of Narnia', 'C.S. Lewis', 'Fantasy', 'Geoffrey Bles', '1950-10-16');
GO

CREATE TABLE Lending (
Lending_id INT PRIMARY KEY,
Member_id INT NOT NULL,
Book_id INT NOT NULL,
Borrow_date DATE NOT NULL,
Return_date DATE,
FOREIGN KEY (Member_id) REFERENCES Member(Member_id) ON UPDATE CASCADE
ON DELETE CASCADE,
FOREIGN KEY (Book_id) REFERENCES Book(Book_id) ON UPDATE CASCADE
ON DELETE CASCADE
);

INSERT INTO Lending (Lending_id, Member_id, Book_id, Borrow_date, Return_date) VALUES
(1, 1, 2, '2022-01-05', '2022-01-15'),
(2, 3, 4, '2022-02-10', '2022-02-20'),
(3, 2, 5, '2022-03-15', NULL),
(4, 5, 7, '2022-04-20', '2022-05-01'),
(5, 4, 9, '2022-05-25', '2022-06-05'),
(6, 1, 11, '2022-06-30', NULL),
(7, 6, 13, '2022-07-05', '2022-07-15'),
(8, 3, 15, '2022-08-10', '2022-08-20'),
(9, 4, 17, '2022-09-15', NULL),
(10, 2, 19, '2022-10-20', '2022-11-01'),
(11, 5, 1, '2022-11-25', '2022-12-05'),
(12, 6, 3, '2022-12-30', NULL),
(13, 1, 5, '2023-01-05', '2023-01-15'),
(14, 2, 7, '2023-02-10', '2023-02-20'),
(15, 3, 9, '2023-03-15', NULL),
(16, 4, 11, '2023-04-20', '2023-05-01'),
(17, 5, 13, '2023-05-25', '2023-06-05'),
(18, 6, 15, '2023-06-30', NULL),
(19, 1, 17, '2023-07-05', '2023-07-15'),
(20, 2, 19, '2023-08-10', '2023-08-20');
GO

DROP PROCEDURE IF EXISTS createLending
GO

Create Procedure createLending @Lending_id INT, @Member_id INT, @Book_id INT, @Borrow_date DATE
as 
begin
 begin try
  begin transaction
   IF not exists (select * from Lending where Book_id = @Book_id and Return_date is NULL)
    INSERT dbo.Lending (Lending_id, Member_id, Book_id, Borrow_date, Return_date) VALUES ( @Lending_id, @Member_id, @Book_id, @Borrow_date, NULL)
  commit Transaction
  print 'Transaction Comitted'
 end try
 begin catch
  rollback transaction
  print 'Transaction Rolled Back'
 end catch
end
GO

DROP PROCEDURE IF EXISTS returnLending
GO

Create Procedure returnLending @Lending_id INT, @Return_date DATE
as 
begin
 begin try
  begin transaction
    UPDATE Lending SET Return_date = @Return_date WHERE Lending_id = @Lending_id and @Return_date is not NULL;
  commit Transaction
  print 'Transaction Comitted'
 end try
 begin catch
  rollback transaction
  print 'Transaction Rolled Back'
 end catch
end
GO